import { useState } from "react";

function StoryGame({story, onNewStory}) {
    const [currentNodeId, setcurrentNodeId] = useState(null);
    const [currentNode, setCurrentNode] = useState(null);
    const [options, setOptions] = useState([]);
    const [isEnding, setIsEnding] = useState(false);
    const [isWinningEnding, setIsWinningEnding] = useState(false);

    useEffect(() => {
        if (story && story.root_node) {
            const rootNodeId = story.root_node.id
            setcurrentNodeId(rootNodeId)
        }
    }, [story])

    useEffect(() => {
        if (currentNodeId && story && story.all_nodes){
            const node = story.all_nodes[currentNodeId]

            setCurrentNode(node)

            setIsEnding(node.is_ending)
            setIsWinningEnding(node.is_winning_ending)

            if (!node.is_ending && node.options && node.options.length > 0) {
                setOptions(node.options)
            } else {
                setOptions([])
            }
        }
    }, [currentNodeId, story])

    const chooseOption = (optionId) => {
        setcurrentNodeId(optionId)
    }

    const restartStory = () => {
        if (story && story.root_node){
            setcurrentNodeId(story.root_node.id)
        }
    }

    return (
        <div className="story-content">
            <header className="story-header">
                <h2>{story.title}</h2>
            </header>

            <div className="story-content">
                {currentNode && 
                    <div className="story-node">
                        <p>{currentNode.content}</p>
                        {isEnding ? <div>
                            <h3>{isWinningEnding ? "Congratulations" : "The End"}</h3>
                            {isWinningEnding ? "You reached a winning ending" : "Your adventure has ended."}
                        </div> : 
                        <div className="story-options">
                            <h3>What will you do?</h3>
                            <div className="options-list">
                                {options.map((option, idx) => {
                                    return <button 
                                                key={idx}
                                                onClick={() => chooseOption(option.node_id)}
                                                className="option-btn"
                                            >{option.text}</button>
                                })}
                            </div>
                        </div>
                        }
                    </div>
                }
            </div>

            <div className="story-controls">
                <button onClick={restartStory} className="reset-btn">
                    Restart Story
                </button>
            </div>

            {onNewStory && <button onClick={onNewStory} className="new-story-btn">New Story</button>}

        </div>        
    )
}

export default StoryGame;