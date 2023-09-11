import React from "react";
import {Text,View} from "react-native"

export default function favquote(props){
    return (
        <View style={ { padding: 16,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',}}>
            <Text>
                {props.content}
            </Text>
        </View>
    )
}