import React from 'react'
import AddContactForm from '../components/AddContactForm';
//import { AuthContext } from '../context';
import { connect } from 'react-redux';
import { addContact } from '../redux/actions';

const AddContactScreen = (props) => {
    const { navigation } = props;
    //const { refleshContacts } = React.useContext(AuthContext);
    const handleSubmit  = (formState) => {
        //refleshContacts(formState);
        props.addContact(formState);
        navigation.navigate('ContactList')
        //navigation.navigate('ContactList', { newData: formState })
    }
    
    return <AddContactForm onSubmit={handleSubmit} />
}

export default connect(null, { addContact: addContact })(AddContactScreen);
