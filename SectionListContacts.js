import React from 'react';
import { StyleSheet, Text, SafeAreaView, SectionList, TouchableOpacity } from 'react-native';
import Row from './Row';
import PropTypes from 'prop-types'

const renderItem = ({item, index}) => <Row index={index} {...item} />
const renderSectionHeader = ({section}) => <Text style={styles.header}>{section.title}</Text>

const SectionListContacts = (props) => {

    const contactsByLetter = props.contacts.reduce((obj, contact) => {
        const firstLetter = contact.name[0].toUpperCase();
        return {
            ...obj,
            [firstLetter]: [...(obj[firstLetter] || []), contact],
        }
    }, {})
    const sections = Object.keys(contactsByLetter).sort().map(letter => ({
        key: letter,
        data: contactsByLetter[letter],
        title: letter
    }))
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.sort} onPress={props.sortedContact}> 
                <Text style={styles.sortText}> Sort</Text> 
            </TouchableOpacity>
            <SectionList
                //keyExtractor={(item, index) => item + index}
                sections={sections}
                renderItem={renderItem}
                renderSectionHeader={renderSectionHeader}
                />
        </SafeAreaView>
    );
}

SectionListContacts.propTypes = {
    contacts: PropTypes.array
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    header: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 20,
        backgroundColor: '#ddd'
    },
    sort: {
        borderColor: '#555',
        backgroundColor: '#777',
        borderWidth: 2,
        padding: 5,
        marginHorizontal:20,
        marginBottom: 10,
        borderRadius:4
    },
    sortText: {
        textAlign: 'center',
        fontSize:20,
        color: '#fff'

    }
})

export default SectionListContacts;