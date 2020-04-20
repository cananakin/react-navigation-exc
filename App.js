import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Ionicons from 'react-native-vector-icons/Ionicons';

import Aux from './hoc/Aux';
//import SectionListContacts from './SectionListContacts';
//import AddContactForm from './AddContactForm';

 
import contacts, { compareNames } from './contacts';
//import NavigationBar from './NavigationBar';

// screen
import AddContactScreen from './screens/AddContactScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import ContactListScreen from './screens/ContactListScreen'
import LoginScreen from './screens/LoginScreen'
import SettingsScreen from './screens/SettingsScreen'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
Stack.navigationOption = {
	tabBarIcon: ({ focused, tintColor}) => (
		<Ionicons
			name={`ios-contacts${focused ? "" : "-outline"}`}
			size={25}
			color={tintColor} 
		/>
	)
}
//screenOptions={{ headerShown: false }}
function MainStack(props) {
	
	return (
		<Stack.Navigator initialRouteName="ContactList" >
			<Stack.Screen name="ContactList" initialParams={{contacts: props.route.params.contacts}} 
				 >
				{props => <ContactListScreen {...props} screenProps={{contacts: props.route.params.contacts}} />}
			</Stack.Screen>
			<Stack.Screen name="ContactDetails" component={ContactDetailsScreen} />
			<Stack.Screen name="AddContact" component={AddContactScreen} />
		</Stack.Navigator>
	);
}

function MainTap(props) {
	return (
		<Tab.Navigator screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;

				if (route.name === 'MainStack') {
				iconName = focused
					? 'ios-information-circle'
					: 'ios-information-circle-outline';
				} else if (route.name === 'Settings') {
				iconName = focused ? 'ios-list-box' : 'ios-list';
				}

				// You can return any component that you like here!
				return <Ionicons name={iconName} size={size} color={color} />;
			},
			})}
			tabBarOptions={{
				activeTintColor: '#a41034',
			}}>
			<Tab.Screen name="MainStack" initialParams={{contacts: props.contacts}} >
				{props => <MainStack {...props} screenProps={{contacts: props.route.params.contacts}} />}
			</Tab.Screen>
			<Tab.Screen name="Settings" component={SettingsScreen} />
		</Tab.Navigator>
	);
}

export default class App extends React.Component {
	state = {
		showContacts: true,
		showForm: false,
		contacts: contacts,
		isLoggedIn:false,
		navName: {
			show: 'Close',
			add: 'Add'
		}
	}

	addDataHandler = (data) => {
		this.setState(prevState => ({
			showForm: !prevState.showForm,
			contacts: [...prevState.contacts,data ], 
		}))
	}

	render() {
		return (
			<View style={styles.container}>
				<Aux>
					<NavigationContainer>
						<Stack.Navigator >
							<Stack.Screen name="Login" component={LoginScreen} />
							<Stack.Screen name="Main"  >
								{props => <MainTap {...props} contacts={this.state.contacts} />}
							</Stack.Screen>
						</Stack.Navigator>
					</NavigationContainer>
				</Aux>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 10
	},
});
