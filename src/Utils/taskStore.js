import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";

const TaskStore = configureStore({
    reducer: {
        task: taskReducer,
    }
})

export default TaskStore;