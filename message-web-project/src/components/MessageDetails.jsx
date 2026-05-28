import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import useFetch from "../custom_hooks/useFetch";

const MessageDetails = () => {
    const { id } = useParams();
    const { data: message, error, isPending } = useFetch(f`http://localhost:3000/message/${id}`);
    const history = useHistory();

    const handleClick = () => {
        fetch(`http://localhost:3000/message/${message.id}`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message)
        }).then(() => {
            history.push('/');
        });
    }

    return (
        <div className="message-details">
            {isPending && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            {message && (
                <article>
                    <h2>{message.title}</h2>
                    <p className="author">Written by {message.author}</p>
                    <div>{message.text}</div>
                    <button onClick={handleClick}>Delete</button>
                </article>
            )}
        </div>
    );
}
 
export default MessageDetails;