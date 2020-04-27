import React from "react";
import { Button, View, StyleSheet, Text, TextInput } from "react-native";
import { AuthContext } from '../context';
import { login } from '../api';


export default function LoginScreen({navigation}) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errMessage, setErrMessage] = React.useState('');
  const { signIn } = React.useContext(AuthContext);
  
  const _login = async () => {
    try {
      const success = await login(username, password)
      signIn()
    } catch (error) {
      console.log(error)
      const errMessage = error.message
      setErrMessage(errMessage)
    }
    console.log('login')
    
  }

  const handleUsernameUpdate = (text) => {
    setUsername(text);
    console.log('username')
  }
  
  const handlePasswordUpdate = (text) => {
    setPassword(text)
    console.log('password')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.error}>{errMessage}</Text>
      <TextInput 
        placeholder='Username' 
        autoCapitalize='none'
        value={username} 
        onChangeText={handleUsernameUpdate} 
        style={styles.input} />
      <TextInput placeholder='Password' secureTextEntry value={password} onChangeText={handlePasswordUpdate} style={styles.input} />
      <Button title="Press to Log In" onPress={_login} />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: 'center'
  },
  error: {
    textAlign: "center",
    color: 'red'
  },
  input: {
    width: 200,
    height: 35,
    borderWidth: 1,
    borderColor: '#444',
    marginTop: 10,
    paddingHorizontal: 10,
    fontSize:16,
    color: '#444'
  }
});
