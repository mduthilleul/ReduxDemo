import { useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { TextInput, View } from "react-native"
import { useAppDispatch } from "./store"
import { addTodo } from "./todoReducer"

export default () => {
    const [label, setLabel] = useState<string>()
    const dispatch = useAppDispatch()
    const {goBack} = useNavigation()
    return (
        <View style={{flex: 1, padding: 20}}>
            <TextInput
                style={{backgroundColor: "white", padding: 10, borderRadius: 10}}
                placeholder="Todo Label" value={label}
                onChangeText={setLabel}
                onSubmitEditing={() => {
                    if (label) {
                        dispatch(addTodo(label))
                        goBack()
                    }
                }}
            />
        </View>
    )
}