import { createAsyncThunk, createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "./store";

type Todo = {
    id: number
    label: string
    done: boolean
}


export const fetchTodos = createAsyncThunk("todos/fetchAll", () => new Promise<Todo[]>((resolve) => {
    setTimeout(() => {
        resolve([
            {id: 1, label: "Petit déjeuner", done: false },
            {id: 2, label: "Présentation redux", done: false}
        ])
    }, 1000)
}))

export const addTodo = createAsyncThunk("todos/add", (label: string, {getState}) => new Promise<Todo>((resolve, reject) => {
    setTimeout(() => {
        if(label.length < 3) {
            reject()
        } else {
            resolve({
                id: (getState() as any).todo.todos.length + 1,
                label: "plop",
                done: false,
            })
        }
    }, 1000)
}))

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        loading: false,
        todos: [] as Todo[],
    },
    reducers: {
        toggleTodo: (state, action: PayloadAction<number>) => {
           const todo = state.todos.find(t => t.id === action.payload)
           if (todo) {
               todo.done = !todo?.done
           }
        }, 
    },
    extraReducers: builder => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.loading = true
        })
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.todos = state.todos.concat(action.payload.filter(({id}) => !state.todos.find(t => t.id === id)))
            state.loading = false
        }),
        builder.addCase(addTodo.pending, (state) => {
            state.loading = true
        }),
        builder.addCase(addTodo.fulfilled, (state, action) => {
            state.loading = false
            state.todos.push(action.payload)
        }),
        builder.addCase(addTodo.rejected, (state) => {
            state.loading = false
        })
    }
})

export default todoSlice.reducer

export const {toggleTodo} = todoSlice.actions

const selectTodos = createSelector((state: RootState) => ({
    todos: [...state.todo.todos].sort((t1, t2) => t1.id - t2.id),
    loading: state.todo.loading
}), value => value)

export const useTodos = () => useSelector(selectTodos)