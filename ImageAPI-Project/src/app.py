from fastapi import FastAPI, HTTPException, File, UploadFile, Form, Depends
from .schemas import PostCreate, UserCreate, UserRead, UserUpdate
from .db import Post, create_db_and_tables, get_async_session, User
from sqlalchemy.ext.asyncio import AsyncSession
from contextlib import asynccontextmanager
from sqlalchemy import select
from .images import imagekit
import shutil
import os
import uuid
import tempfile
from .users import auth_backend, current_active_user, fastapi_users




async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)

# This is for authentication ofthe user
# The user has to got through this process before deleting or adding posts
app.include_router(fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=['auth'])
# We get UserCreate and UserRead from the schemas module to structure the request
app.include_router(fastapi_users.get_register_router(UserRead, UserCreate), prefix="/auth", tags=["auth"])
app.include_router(fastapi_users.get_reset_password_router(), prefix="/auth", tags=["auth"])
app.include_router(fastapi_users.get_verify_router(UserRead), prefix="/auth", tags=["auth"])
app.include_router(fastapi_users.get_users_router(UserRead, UserUpdate), prefix="/users", tags=["users"])

@app.post("/upload")
async def upload(
    file: UploadFile= File(...),
    caption: str = Form(""),
    user: User = Depends(current_active_user),
    session: AsyncSession = Depends(get_async_session)
):

    temp_file_path = None
    
    try:
        allowed_types = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "video/mp4",
        "video/webm",
        "video/quicktime"
        ]

        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=400,
                detail="Unsupported file type"
            )
        with tempfile.NamedTemporaryFile(delete=False, suffix=os.path.splitext(file.filename)[1]) as temp_file:
            temp_file_path = temp_file.name
            shutil.copyfileobj(file.file, temp_file)

        # Open file in context manager to ensure it's closed
        with open(temp_file_path, "rb") as file_handle:
            upload_result = imagekit.files.upload(
                file=file_handle.read(),
                file_name=file.filename,
                use_unique_file_name=True,
                tags=["backend-upload"],
                folder="/posts"
            )

        # upload_result is a FileUploadResponse object
        post = Post(
            user_id=user.id,
            caption=caption,
            url=upload_result.url,
            file_type="video" if file.content_type.startswith("video/") else "image",
            file_name=upload_result.name
        )
        session.add(post)
        await session.commit()
        await session.refresh(post)

        return {
            "id": post.id,
            "caption": post.caption,
            "url": post.url,
            "file_type": post.file_type,
            "file_name": post.file_name,
            "created_at": post.created_at.isoformat()
        }
    
    except Exception as err:
        print(f"Error type: {type(err)}")
        print(f"Error details: {err}")
        raise HTTPException(status_code=500, detail=f"Upload failed: {str(err)}")

    finally:
        if temp_file_path and os.path.exists(temp_file_path):
            try:
                os.unlink(temp_file_path)
            except OSError:
                pass  # File might be in use, will be cleaned up by OS
        file.file.close()

@app.get("/feed")
async def get_feed(session: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)):
    result = await session.execute(select(Post).order_by(Post.created_at.desc()))
    posts = [row[0] for row in result.all()]

    result = await session.execute(select(User))
    users = [row[0] for row in result.all()]
    user_dict = {u.id: u.email for u in users}

    posts_data = []
    for post in posts:
        posts_data.append(
            {
                "id": str(post.id),
                "user_id": str(post.user_id),
                "caption": post.caption,
                "url": post.url,
                "file_type": post.file_type,
                "file_name": post.file_name,
                "created_at": post.created_at.isoformat(),
                "is_owner": post.user_id == user.id,
                "email": user_dict.get(post.user_id, "Unknown")
            }
        )

    return {"posts": posts_data}

# This route is for users who want to delete a post
# Only the user who created the post can delete it
@app.delete("/posts/{post_id}")
async def delete_post(post_id: str, session: AsyncSession = Depends(get_async_session), user: User = Depends(current_active_user)):
    try:
        post_uuid = uuid.UUID(post_id)
        # Here we do a comparison to make sure it is the post id that was stored
        result = await session.execute(select(Post).where(Post.id == post_uuid))   
        post = result.scalars().first()

        if not post:
            # If the post does not exist, then we raise an exception
            raise HTTPException(status_code=404, detail="Post not Found")
        
        if post.user_id != user.id:
            raise HTTPException(status_code=403, detail="Sorry, but you are not allowed to delete this post")

        await session.delete(post)
        # This line will delete the post completly
        await session.commit()

        return {"success": True, "message": "Post deleted successfully"}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



