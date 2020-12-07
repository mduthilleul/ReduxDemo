import CheckBox from "@react-native-community/checkbox"
import { useNavigation } from "@react-navigation/native"
import React from "react"
import { Button, FlatList, Text, View } from "react-native"
import { useSelector } from "react-redux"
import { RootState } from "./store"

export default () => {
    const todos = useSelector((state: RootState) => state.todo.todos)
    const {navigate} = useNavigation()
    return (
        <View style={{flex: 1, padding: 20}}>
            <FlatList style={{flex: 1}} data={todos} renderItem={
                ({item: {label, done}}) => (
                    <View style={{paddingTop: 10, flex: 1, flexDirection: "row", alignItems: "center"}}>
                        <Text style={{flex: 1}}>{label}</Text>
                        <CheckBox value={done} />
                    </View>
                )
            } keyExtractor={({id}) => String(id)} />
            <Button title="New todo" onPress={() => navigate("addTodo")} />
        </View>
    )
}