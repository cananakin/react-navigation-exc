import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// screen
import AddContactScreen from './screens/AddContactScreen'
import ContactDetailsScreen from './screens/ContactDetailsScreen'
import ContactListScreen from './screens/ContactListScreen'
import LoginScreen from './screens/LoginScreen'
import SettingsScreen from './screens/SettingsScreen'

import contacts, { compareNames } from './contacts';
import { AuthContext } from './context'
import { fetchUsers } from './api';

import { Provider } from 'react-redux'
import store from './redux/store';

/// Root Screen
const RootStack = createStackNavigator();
const RootStackScreen = ({ userToken, contactsData }) => {
	return (
	<RootStack.Navigator headerMode="none" screenOptions={{ animationEnabled: false }}>
		{
			userToken ? 
				<RootStack.Screen name="App" component={AppTapsStackScreen} initialParams={{contacts: contactsData}}  />
				:
				<RootStack.Screen  name="Auth" component={AuthStackScreen} />
		}
	</RootStack.Navigator>
)}

// Auth Screen
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
	<AuthStack.Navigator>
		<AuthStack.Screen name="SignIn" component={LoginScreen} />
	</AuthStack.Navigator>
)

// App Screen / Main
const AppTapsStack = createBottomTabNavigator();
const AppTapsStackScreen = ({route}) => (
	<AppTapsStack.Navigator 
		initialRouteName="MainStack" 
		tabBarOptions={{ activeTintColor: '#a41034',inactiveTintColor: 'gray' }} 
		screenOptions={ ({route}) => ({
			tabBarIcon: ({ focused, color}) => {
				let iconName;
				if(route.name === 'MainStack') {
					iconName = `ios-contacts${focused ? "" : ""}`;
                } else if (route.name === 'Settings') {
              		iconName = focused ? 'ios-settings' : 'ios-settings';
            	}
				return <Ionicons name={iconName} size={30} color={color} />
			}
		})
		
	}>
		<AppTapsStack.Screen 
			name="MainStack" 
			component={MainStackScreen} 
			initialParams={{ contacts: route.params.contacts }}
			 />
		<AppTapsStack.Screen name="Settings" component={SettingsScreen} />
	</AppTapsStack.Navigator>
)

// Main Screen
const MainStack = createStackNavigator();
const MainStackScreen = ({ route }) => {
	const { signOut } = React.useContext(AuthContext);  
	return (
	<MainStack.Navigator screenOptions={{
		headerStyle: { backgroundColor: '#dddddd'}
	}}>
		<MainStack.Screen 
			name="ContactList" 
			component={ContactListScreen} 
			initialParams={{ contacts: route.params.contacts }}
			options={({navigation}) => ({
				title: 'Contacts',
				headerRight: () => (
					<Button title="Add"
						onPress={() => {
							navigation.navigate('AddContact')
						}}
					/>
				),
				headerLeft: () => (
					<Button title="Sign Out"
						onPress={() => signOut()}
					/>
				),
				headerTintColor: '#a41034'
			})}
			/>
		<MainStack.Screen 
			name="ContactDetails" 
			component={ContactDetailsScreen}
			options={({route}) => ({
				title: route.params.contact.name
			})} />
		<MainStack.Screen name="AddContact" component={AddContactScreen} options={{ title: 'Add Contact', headerTintColor: 'teal' }}/>
	</MainStack.Navigator>
)}

export default function App() {
	
	const [isLoading, setIsLoading ] = React.useState(true);
	const [userToken, setUserToken ] = React.useState(null);
	const [contactsData, setContactsData ] = React.useState([]);
	
	React.useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		},1000)
		getUser();
	}, [])

	 const getUser = async () => {
		const results = await fetchUsers();
		setContactsData(results)
	}
	

	const authContext = React.useMemo(() => {
		return {
			signIn: () => {
				setIsLoading(false);
				setUserToken('login');
				//setContactsData(contacts);
			},
			signUp: () => {
				setIsLoading(false);
				setUserToken('login');
			},
			signOut: () => {
				setIsLoading(false);
				setUserToken(null);
				//setContactsData([]);
			},
			refleshContacts: (data) => {
				const newData = { ...data, key: contacts.length}
				setIsLoading(true);
				setTimeout(() => {
					setIsLoading(false);
					setContactsData([ ...contacts, newData ]);
				},500)
				
			}
		}
	})
	
	if(isLoading){
		return (<View style={styles.container}>
			<Text style={{ fontSize: 20}}>Loading...</Text>
		</View>)
	}
	
	return (
		<Provider store={store}>
			<AuthContext.Provider value={authContext}>
				<NavigationContainer>
					<RootStackScreen userToken={userToken} contactsData={contactsData} />
				</NavigationContainer>
			</AuthContext.Provider>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		paddingTop: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
});
