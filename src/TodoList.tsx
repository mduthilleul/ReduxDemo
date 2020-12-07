import CheckBox from "@react-native-community/checkbox"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from "react"
import { ActivityIndicator, Button, FlatList, Text, View } from "react-native"
import { useDispatch } from "react-redux"

import { fetchTodos, toggleTodo, useTodos } from "./todoReducer"

export default () => {
    const {todos, loading} = useTodos()
    const dispatch = useDispatch()

    const {navigate} = useNavigation()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    return (
        <View style={{flex: 1, padding: 20}}>
            {loading && <ActivityIndicator />}
            <FlatList style={{flex: 1}} data={todos} renderItem={
                ({item: {label, done, id}}) => (
                    <View style={{paddingTop: 10, flex: 1, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{flex: 1}}>{label}</Text>
                        <CheckBox value={done} onValueChange={() => {
                            dispatch(toggleTodo(id))
                        }} />
                    </View>
                )
            } keyExtractor={({id}) => String(id)} />
            <Button title="New todo" onPress={() => navigate("addTodo")} />
        </View>
    )
}