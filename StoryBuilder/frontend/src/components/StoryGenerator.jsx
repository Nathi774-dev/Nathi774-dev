import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import ThemeInput from "./ThemeInput";
import LoadingStatus from "./LoadingStatus";
import {API_BASE_URL} from "../utils"

function StoryGenerator(){
    const navigate = useNavigate();
    const [theme, setTheme] = useState("");
    const [taskId, setTaskId] = useState(null);
    const [taskStatus, setTaskStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const generateStory = async (theme) => {
        setLoading(true)
        setError(null)
        setTheme(theme)

        try {
            const response = await axios.post(`${API_BASE_URL}/stories/create`, {theme})
            const {task_id, status} = response.data
            setTaskId(task_id)
            setTaskId(status)

            pollTaskStatus(task_id)
        } catch (err) {
            setLoading(false)
            setError(null)
            setTheme(theme)
        }
    }

    const pollTaskStatus = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/tasks/${id}`)
            const {status, story_id, error: taskError} = response.data
            setTaskStatus(status)

            if (status === "completed" && story_id){
                fetchStory(story_id)
            } else if (status === "failed" || taskError){
                setError(taskError || "Failed to generate story")
                setLoading(false)
            }
        } catch (err) {
            if (err.response?.status !== 404){
                setError(`Failed to check story status: ${err.message}`)
                setLoading(false)
            }
        }
    }

    const fetchStory = async (id) => {
        try {
            setLoading(false)
            setTaskStatus("completed")
            navigate(`/story/${id}`)
        } catch (err) {
            setError(`Failed to load story: ${err.message}`);
            setLoading(false)
        }
    }

    const reset = () => {
        setTaskId(null);
        setTaskId(null);
        setError(null);
        setTheme("");
        setLoading(false);
    }

    useEffect(() => {
        let pollInterval;

        if (taskId && taskStatus === "processing") {
            pollInterval = setInterval(() => {
                pollInterval(taskId)
            }, 5000)

            return () => {
                if (pollInterval){
                    clearInterval(pollInterval)
                }
            }
        }
    }, [taskId, taskStatus])

    return (
        <div className="story-generator">
            {error &&
                <div className="error-message">
                    <p>{error}</p>
                    <button className="">Try Again</button>
                </div>
            }

            {!taskId && !error && !loading && <ThemeInput onSubmit={generateStory}/>}

            {loading && <LoadingStatus theme={theme} />}
        </div>
    )
}

export default StoryGenerator;