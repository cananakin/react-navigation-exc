import React from 'react'
import AddContactForm from '../AddContactForm';

class AddContactScreen extends React.Component {
    static navigationOptions = {
        headerTitle: 'New Contact'
    }

    handleSubmit  = formState => {
        this.props.screenProps.addContact(formState);
        this.props.navigation.navigation('ContactList'); 
    }
    render() {
        return <AddContactForm onSubmit={this.onSubmit} />
    }
}

export default AddContactScreen;
