import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const NavigationBar = (props) => (
    <View style={styles.view}>
        <Button color="#000" style={styles.button} title={props.navName.show} onPress={props.showButton} />
        <Text style={styles.text}>Contacts</Text>
        <Button color="#000" style={styles.button} title={props.navName.add} onPress={props.addButton} />
    </View>
)

const styles = StyleSheet.create({
    view: {
        flexDirection: 'row',
        backgroundColor: '#ddd',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        marginBottom:10
    },
    text: {
        paddingVertical: 6,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: 'purple'
    }
})

export default NavigationBar;