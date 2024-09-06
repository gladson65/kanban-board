import { Droppable, Draggable } from "react-beautiful-dnd";
import { useDrag } from "react-dnd"


function Task(props) {

    const {id, title, desc} = props.task;
    const { index } = props;
    

    return(
        <>
            
            
            <div className="task w-full bg-white h-32 rounded-xl mt-2 cursor-grab active:border-4 active:border-teal-400">
                <h1>{title}</h1>
                <p>{desc}</p>
            </div>
                   
            
                
        
           
        </>
    )
}

export default Task;