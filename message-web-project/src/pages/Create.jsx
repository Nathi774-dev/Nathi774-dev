import {useState} from 'react';
import {useHistory} from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [author, setAuthor] = useState("");
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        const message = {title, text, author};

        setIsPending(true);

        fetch('http://localhost:3000/messages', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(message)
        }).then(() => {
            console.log("new Blog Added");
            setIsPending(false);
            history.push('/');
        });
    }

    return (
        <div className="create">
            <h2>Create a new Message</h2>
            <form onSubmit={handleSubmit}>
                <label>Message Title</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label>Message body:</label>
                <textarea 
                    required 
                    value={text} 
                    onChange={(e) => setText(e.target.value)}>
                </textarea>
                <label>What is the name of the author?</label>
                <input 
                    type="text" 
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                 />
                {isPending ? <button disabled>Adding message...</button> : <button>Add message</button>}
            </form>
        </div>
    );
}
 
export default Create;