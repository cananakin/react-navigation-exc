import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Aux from './hoc/Aux';
import SectionListContacts from './SectionListContacts';
import AddContactForm from './AddContactForm';

import Constants from 'expo-constants'
 
import contacts, { compareNames } from './contacts';
import NavigationBar from './NavigationBar';

export default class App extends React.Component {
	state = {
		showContacts: true,
		showForm: false,
		contacts: contacts,
		navName: {
			show: 'Close',
			add: 'Add'
		}
	}

	toggleContacts = () => {
		this.setState(prevState => ({
			showContacts: !prevState.showContacts,
			navName: {...prevState.navName, show: (prevState.showContacts ? 'Show' : 'Close')}
		}))
	}

	toggleContactForm = () => {
		this.setState(prevState => ({
			showForm: !prevState.showForm,
			navName: {...prevState.navName, add: (prevState.showForm ? 'Add' : 'Cancel')}
		}))
	}

	addDataHandler = (data) => {
		this.setState(prevState => ({
			showForm: !prevState.showForm,
			contacts: [...prevState.contacts,data ], 
		}))
	}

	sortContacts = () => {
		this.setState(prevState => ({
			contacts: prevState.contacts.sort(compareNames), 
		}))
	}

	render() {
		return (
			<View style={styles.container}>
				<Aux>
					<NavigationBar navName={this.state.navName} showButton={this.toggleContacts} addButton={this.toggleContactForm} />
					{
						this.state.showForm ? 
							<AddContactForm onAddedContact={this.addDataHandler} onCancelled={this.toggleContactForm} /> 
							:
							this.state.showContacts ? <SectionListContacts contacts={this.state.contacts} sortedContact={this.sortContacts} /> : null
					}
				</Aux>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: Constants.statusBarHeight
	},
});
