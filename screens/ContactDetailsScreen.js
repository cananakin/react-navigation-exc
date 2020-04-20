import React, { useLayoutEffect } from 'react';
import { Button, Text, View } from 'react-native';

// static navigationOptions = ({ navigation }) => {
//     console.log(navigation)
//     return {
//       headerTitle: navigation.getParam('name'),
//     };
//   };

export default function ContactDetailsScreen({ route,navigation }) {
	const [count, setCount] = React.useState(0);
	console.log(route)
	
	navigation.setOptions({
		headerRight: () => (
			<Button title="Update count" />
		),
		headerTitle: route.params.name,
	});
	goToRandomContact = () => {
		console.log(this.props)
		//const { contacts } = this.props.screenProps;
		const { phone } = route.params;
		console.log(phone)
		let randomContact;
		while (!randomContact) {
			const randomIndex = Math.floor(Math.random() * contacts.length);
			if (contacts[randomIndex].phone !== phone) {
				randomContact = contacts[randomIndex];
			}
		}

		// this.props.navigation.navigate('ContactDetails', {
		//   ...randomContact,
		// });
		navigation.push('ContactDetails', {
			...randomContact,
		});
	};

	return (
		<View>
			<Text>{route.params.phone}</Text>
			<Button title="Go to random contact" onPress={this.goToRandomContact} />
		</View>
	);



}
