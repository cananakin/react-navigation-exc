import React from 'react';
import { View, TextInput, StyleSheet, Button, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

class AddContactForm extends React.Component {
    state = {
        name: '',
        phone: '',
        isValid: true
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.name !== this.state.name || this.state.phone !== prevState.phone){
            this.onValidation();
        }
    }

    onSubmitForm = () => {
        const { name, phone } = this.state;
        //this.props.onAddedContact({ name: name,phone: phone })
        this.props.onSubmit({ name: name, phone: phone })
    }

    onChangeName = (text) => { this.onChangeInput('name',text) } 
    
    onChangeNumber = (text) => { if(+text >= 0 && text.length < 11) this.onChangeInput('phone',text) } 
    
    onChangeInput = (name,value) => {
        this.setState({ [name]: value, }) 
    } 

    onValidation = () => {
        const names = this.state.name.split(' ');
        if(+this.state.phone >= 0  && this.state.phone.length < 11 && names.length >= 2 && names[0] !== "" && names[1] !== ""){
            this.setState({ isValid: false });
        }else{
            this.setState({ isValid: true });
        }
    }

    render () {
        const { name, phone } = this.state;
        return (
            <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.view}>
                        <TextInput value={name} style={styles.input} placeholder="Name" onChangeText={this.onChangeName} />
                        <TextInput value={phone} style={styles.input} keyboardType="numeric" placeholder="Phone" onChangeText={this.onChangeNumber} />
                        <Button style={styles.button} title="Save" onPress={this.onSubmitForm} disabled={this.state.isValid}/> 
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )
    }
    
}

const styles = StyleSheet.create({
    view: {
        flex:1,
        alignItems: 'center',
        //flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal:15,
    },
    input: {
        //flex:1,
        width: 220,
        height: 40,
        marginBottom:20,
        marginHorizontal:5,
        paddingHorizontal:10,
        borderWidth: 1,
        fontSize:18,
        borderColor: '#444',
        alignItems: 'center',
    },
    button: {
       flex:1 
    }
})
export default AddContactForm;