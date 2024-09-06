import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({

    name: "task",
    
    initialState: {
        tasks: [],
        recover: [],
    },

    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
            state.recover.push(action.payload);
        },

        editTasks: (state, action) => {
            state.tasks.map((item) => {
                if(item.id == action.payload.dragId) {
                    item.columnId = action.payload.dropId;
                    item.status = action.payload.dropId;
                }
            })

            state.recover.map((item) => {
                if(item.id == action.payload.dragId) {
                    item.columnId = action.payload.dropId;
                    item.status = action.payload.dropId;
                }
            })
        },

        searchTask: (state, action) => {
            const searched = state.tasks.filter((item) => {
                if (item.title.toLowerCase().includes(action.payload)) {
                    
                    return item;
                }

            })

            if (state.tasks.length > 1) {
                state.tasks = searched;
            }
            else if (state.tasks.length == 1) {
                state.tasks = state.recover;
            }
            

            // state.search.id = searched.id;
            // state.search.columnId = searched.columnId;
            // state.search.title = searched.title;
            // state.search.description = searched.description;
            // state.search.status = searched.status;

            // console.log(searched[0].id)
            // if (action.payload) {
            //     state.tasks = searched;
            // }
            // else {
            //     state.tasks = memory;
            // }
            // console.log(memory)
            
        }
        
    }
})

export const{addTask, editTasks, searchTask} = taskSlice.actions;

export default taskSlice.reducer;