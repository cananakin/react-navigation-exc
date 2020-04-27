import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

import SectionListContacts from '../components/SectionListContacts';
import { connect } from 'react-redux';

const ContactListScreen = (props) => {
    const { navigation, route } = props;
    const [ showContacts, setShowContacts ] = React.useState(true);
    React.useEffect(() => {
        if(route.params.newData !== undefined){
            navigation.setParams({
                //contacts: [ ...route.params.contacts, route.params.newData ],
                contacts: [ ...props.contacts, route.params.newData ],
                newData: undefined
            })
        }
    }, [route.params.newData])
    
    const toggleContacts = () => {
        setShowContacts(!showContacts)
    };

    const handleSelectContact = contact => {
        //navigation.navigate('ContactDetails', { contact: contact, contacts: route.params.contacts  });
        navigation.navigate('ContactDetails', { contact: contact, contacts: props.contacts  });
    };
    const sortContacts = contact => {
        if(route.params.newData !== undefined){
            navigation.setParams({
                //contacts: [ ...route.params.contacts, route.params.newData ],
                contacts: [ ...props.contacts, route.params.newData ],
                newData: undefined
            })
        }
        //navigation.setParams('ContactDetails', { contact: contact });
    };

    return (
        <View style={styles.container}>
            <Button title="toggle contacts" onPress={toggleContacts} />
            {showContacts && (
                <SectionListContacts
                    contacts={props.contacts}
                    onSelectContact={handleSelectContact}
                    sortedContact={sortContacts}
                />
            )}
        </View>
    );
    
}

const mapStateToProps = (state) => {
    //console.log(state)
    return {
        contacts: state.contacts
    }
}

export default connect(mapStateToProps)(ContactListScreen);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
