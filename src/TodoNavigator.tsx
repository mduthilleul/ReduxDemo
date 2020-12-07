import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import TodoList from "./TodoList"
import AddTodo from "./AddTodo"

const Stack = createStackNavigator()

export default () => (
    <Stack.Navigator>
        <Stack.Screen name="todos" options={{title: "TODOS"}} component={TodoList} />
        <Stack.Screen name="addTodo" options={{title: "Add TODO"}} component={AddTodo} />
    </Stack.Navigator>
)