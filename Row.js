import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const Row = (props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={() => {props.onSelectContact(props)}}>
            <Text style={styles.name}>{props.name}</Text>
            <Text style={styles.phone}>{props.phone}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 7,
        marginHorizontal:20,
        borderBottomWidth:1,
        borderColor: '#eee'
    },
    name: {
        fontSize:16,
        color: '#000'
    },
    phone: {
        fontSize:14,
        color: '#000'
    }
})
export default Row
