import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const TODOS = [
    {id: 1, label: "Petit déjeuner", done: false },
    {id: 2, label: "Présentation redux", done: false}
]

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: TODOS
    },
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.todos.push({
                label: action.payload, done: false, id: state.todos.length + 1,
            })
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
           const todo = state.todos.find(t => t.id === action.payload)
           if(todo) {
               todo.done = !todo?.done
           }
        }
    }
})


export default todoSlice.reducer

export const {addTodo} = todoSlice.actions