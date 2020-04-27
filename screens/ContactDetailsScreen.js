import React from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { AuthContext } from '../context';

export default ContactDetailsScreen = ({ navigation, route }) => {
	//const { refleshContacts } = React.useContext(AuthContext);
	randomGoto = () => {
		const contacts = route.params.contacts;
		const phone = route.params.contact.phone;
		let randomContact;
		while (!randomContact) {
			const randomIndex = Math.floor(Math.random() * contacts.length);
			if(contacts[randomIndex].phone !== phone){
				randomContact = contacts[randomIndex];
			}
		}
		navigation.navigate('ContactDetails', { contact: randomContact, contacts: contacts })
	}
	
	return (
	<View style={styles.container}>
		<Text>{route.params.contact.phone}</Text>
		<Button title="Go to random contact" onPress={() => randomGoto() } />
	</View>);
	
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
});
