import { useState, useRef, useEffect } from "react";
import { useSelector }  from "react-redux";
import {useDispatch} from "react-redux";
import { addTask } from "../Utils/taskSlice";
import { editTasks } from "../Utils/taskSlice";
import { searchTask } from "../Utils/taskSlice";
import taskSlice from "../Utils/taskSlice";
import TaskStore from "../Utils/taskStore";
import Header from "./Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrop } from "react-dnd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task";
import { columnData } from "../Utils/columnData";

function Stage() {

    const dispatch = useDispatch();
    const task = useSelector((store) => store.task.tasks);
    const searchedTask = useSelector((store) => store.task.search); 
    // console.log(searchedTask[0])    
   
    const [isTask, setIsTask] = useState(false);
    const [columns, setColumns] = useState(columnData);
    const [dragTask, setDragTask] = useState({})
    const [toggleButton, setToggleButton] = useState(false)
    
    
    
   
    function addTaskBox() {
        setIsTask(true)
    }

    function closeTaskBox(e) {
        e.preventDefault();
        setIsTask(!isTask)
    }

    // handleTitle
    let title = "";
    function handleTitle(e) {
        title = e.target.value;

    }

    // handleDescription
    let description = "";
    function handleDescription(e) {
        description = e.target.value;
        if (title == "") {
            alert("fill the title")
        }
    }

    // add task
    let count = useRef(0)
    function add(e) {
        e.preventDefault();
        if (description == "") {
            alert("fill the description")
        }
        if(title == "") {
            alert("fill the title")
        }
        if(title != "" && description != "") {
            count.current++
            dispatch(addTask({id:count.current, columnId: "todo", title:title, desc:description, status: "todo"}));
            setIsTask(!isTask)
        }
        
    }

    // function for getting search text
    let text = "";
    function searchHandle(e) {
        text = e.target.value;
    }
    const arr = []
    // function for search text
    function searchClick(e) {
        e.preventDefault();
        
        dispatch(searchTask(text))
        setToggleButton(!toggleButton)
        document.querySelector("#input").value = "";
        console.log(text)
    }

    

    // onDrag function
    function onDragTask(id, columnID) {
        
        setDragTask({task_id: id, col_id: columnID})
    }

    // onDrop function
   function onDropTask(id) {
        
        if(id && dragTask?.task_id) {
            dispatch(editTasks({dropId: id, dragId:dragTask.task_id}))
        }
        
   }
    

    return(
        <>
            
            <Header />
           
            {/* search section */}
            <section className="searchSection w-ful h-32 flex justify-center items-center gap-7 bg-zinc-500">
                <input id="input" onChange={(e) => searchHandle(e)} type="text" className={`w-3/6 lg:w-2/5 py-2 px-2 ${toggleButton && "hidden"} transition duration-200 linear rounded-lg focus:ring-4 focus:ring-teal-400" placeholder="Task Title`} />
                <button onClick={(e)=> searchClick(e)} className="p-2 w-32 bg-lime-300 hover:bg-lime-500 transition duration-150 linear rounded-lg">
                    <span className="font-bold drop-shadow-[0px_10px_10px_black]">
                        {toggleButton ? "Show All Tasks" : "Search"}
                    </span>
                </button>
            </section>


            {/* Task State names */}
            <section className="taskStates hidden xl:grid w-full mt-2 grid xl:grid-cols-4 gap-7 xl:px-24">
                <div className="todoHead flex justify-around items-center bg-red-400 rounded-lg relative">
                    <h1 className="text-center text-lg font-bold drop-shadow-[0px_10px_10px_black]">To-Do</h1>
                    <i className="fa-brands fa-stack-exchange text-blue-500 text-2xl"></i>
                    <span className="absolute xl:right-12 text-black font-bold">{task.length}</span>
                </div>

                <div className="inProgress bg-yellow-300 p-2 rounded-lg">
                    <h1 className="text-center text-lg font-bold drop-shadow-[0px_10px_10px_black]">In Progress</h1>
                </div>

                <div className="peerReview bg-blue-400 p-2 rounded-lg">
                    <h1 className="text-center text-lg font-bold drop-shadow-[0px_10px_10px_black]">Peer Review</h1>
                </div>

                <div className="Done bg-green-400 p-2 rounded-lg">
                    <h1 className="text-center text-lg font-bold drop-shadow-[0px_10px_10px_black]">Done</h1>
                </div>
            </section>
        
            
                     
            <section className="stageSection w-full h-screen mt-7 px-4 pb-24 grid grid-cols-2 xl:grid-cols-4  gap-7 xl:px-24 lg:px-24 relative">
                
                {/* floating button */}
                <span onClick={addTaskBox} className="absolute w-12 h-12 bg-teal-400 hover:bg-teal-500 rounded-full p-2 text-center text-2xl top-0 left-16 z-50"><i className="fa-solid fa-plus"></i></span>
                
                {/* Add Task popup box */}
                {
                    isTask &&
                    <div className="addTask absolute left-12 md:left-32 lg:left-44 xl:left-96 w-5/6 md:w-2/3 xl:w-1/2 bg-slate-800 z-50 h-96 flex flex-col justify-center items-center gap-2 rounded-xl">
                        <span className="text-white text-2xl mb-2">Title</span>
                        <input onChange={(e) => handleTitle(e)} type="text" className="w-1/2 p-2 rounded-lg"></input>
                        <span className="text-white text-2xl mb-2">Description</span>
                        <textarea onChange={(e) => handleDescription(e)} className="w-1/2 p-2 rounded-lg"></textarea>
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <button id="addButton" onClick={(e)=> add(e)} className="bg-lime-300 hover:bg-lime-400 transition duration-150 linear p-2 w-32 rounded-lg">
                                <span className="drop-shadow-[0px_10px_10px_black]">ADD</span>
                            </button>
                            <button onClick={(e)=>closeTaskBox(e)} className="bg-red-500 hover:bg-red-600 transition duration-150 linear p-2 w-32 rounded-lg">
                                <span className="drop-shadow-[0px_10px_10px_black]">Close</span>
                            </button>
                        </div>
                    </div>
                }
                
                
            
                {
                    columns.map((column)=> {
                        return (
                            <div key={column.id} className={`toDo 
                                ${column.id === "todo" && "bg-slate-600 border-white"}
                                ${column.id === "inprogress" && "bg-teal-300 border-white"}
                                ${column.id === "review" && "bg-yellow-200 border-white"}
                                ${column.id === "done" && "bg-green-200 border-white"}
                                overflow-y-auto h-auto pb-7 border-4  p-2 rounded-lg`}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={() => {onDropTask(column.id)}}> 
                                
                                <h1 className={`${column.id === "todo" && "text-red-400 font-bold text-lg"}
                                                ${column.id === "inprogress" && "text-yellow-300 font-bold text-lg"}
                                                ${column.id === "review" && "text-blue-600 font-bold text-lg"}
                                                ${column.id === "done" && "text-black font-bold text-lg"}
                                                drop-shadow-[0px_10px_10px_black]
                                `}>  
                                    {column.text}
                                </h1>

                            <div key={column.id} >
                                {
                                    task.map((eachTask) => {
                                        return(
                                        <>   
                                            {
                                                column.id === eachTask.columnId && 
                                                <div key={eachTask.id} className={`task ${eachTask.status === "todo" && "bg-red-400 drop-shadow-[0px_5px_5px_white]"} 
                                                        ${eachTask.status === "inprogress" && "bg-yellow-300"}
                                                        ${eachTask.status === "review" && "bg-blue-400"}
                                                        ${eachTask.status === "done" && "bg-green-400"}
                                                        w-full h-32 rounded-xl my-4 cursor-grab active:border-4 active:border-teal-400 drop-shadow-[0px_5px_5px_black]
                                                        flex flex-col justify-start items-center overflow-hidden`}
                                                        draggable
                                                        onDragStart={() => onDragTask(eachTask.id, eachTask.columnId)}>
                                                    <h1 className="text-black font-bold text-md mb-2" style={{scrollbarWidth: "none"}}>{eachTask.title}</h1>
                                                    <p className={` ${eachTask.status === "inprogress" && "text-blue-800"} w-full text-white text-lg text-balance break-words px-2`} style={{scrollbarWidth: "none"}}>{eachTask.desc}</p>
                                                </div>
                                            }
                                            
                                        </>
                                        )
                                    })
                                }
                            </div>
                            </div>
                        )
                    })
                }
               
                
                 
            </section>
           
        </>
    )
}

export default Stage;


