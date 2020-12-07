import { combineReducers, configureStore } from "@reduxjs/toolkit"
import todoReducer from "./todoReducer"
import { useDispatch } from "react-redux"
import createDebugger from "redux-flipper"
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist'
import AsyncStorage from "@react-native-community/async-storage"

const rootReducer = combineReducers({
    todo: todoReducer,
})

const persistedRecuder = persistReducer({
    key: "root",
    storage: AsyncStorage,
}, rootReducer)

const store = configureStore({
    reducer: persistedRecuder,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
    }).concat(createDebugger())
})

export default store

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()