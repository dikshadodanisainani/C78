import React, { Component } from 'react';
import { StyleSheet, Text, View ,TextInput, Alert, TouchableOpacity,Modal, ScrollView, KeyboardAvoidingView} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import SantaAnimation from '../components/SantaClaus';
export default class WelcomeScreen extends Component
{
    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            isModalVisible:'false',
            first_name:'',
            last_name:'',
            address:'',
            contact:'',
            confirmPassword:'',
        }
    }

    userSignUp=(username,password,confirmPassword)=>{
        if(password!=confirmPassword)
        {
            return Alert.alert("Password does't match\n Check your Password")
        }
        else{
        firebase.auth().createUserWithEmailAndPassword(username,password).then((response)=>{
            return Alert.alert("User Added");
        })
        .catch(function(error){
            var errorCode=error.code;
            var errorMessage=error.message;
            return Alert.alert(errorMessage);
        });
        db.collection('users').add({
            first_name:this.state.first_name,
            last_name:this.state.last_name,
            mobile_number:this.state.contact,
            email_id:this.state.emailId,
            address:this.state.address
        })
    }
    }
    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password).then(()=>{
            return Alert.alert("Successfully Login");
        })
        .catch((error)=>{
            var errorCode=error.code;
            var errorMessage=error.message;
            return Alert.alert(errorMessage);
        })
    }

    showModal=()=>{
        return(
            <Modal 
            animationType='fade'
            transparent={true}
            visible={this.state.isModalVisible}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width:'100%'}}>
                        <KeyboardAvoidingView style={styles.KeyboardAvoidingView}>
                            <Text style={styles.modalTitle}>Registration</Text>
                            <TextInput 
                            style={styles.formTextInput}
                            placeholder={"First Name"}
                            maxLength={8}
                            onChangeText={(text)=>{
                                this.setState({
                                    first_name:text
                                })
                            }}/>

                            <TextInput 
                            style={styles.formTextInput}
                            placeholder={"Last Name"}
                            maxLength={8}
                            onChangeText={(text)=>{
                                this.setState({
                                    last_name:text
                                })
                            }}/>

                            <TextInput 
                            style={styles.formTextInput}
                            placeholder={"contact"}
                            maxLength={10}
                            keyboardType={'numeric'}
                            onChangeText={(text)=>{
                                this.setState({
                                    address:text
                                })
                            }}/>

                            <TextInput 
                            style={styles.formTextInput}
                            placeholder={"Address"}
                            multiline={true}
                            onChangeText={(text)=>{
                                this.setState({
                                    address:text
                                })
                            }}/>
                             <TextInput 
                            style={styles.formTextInput}
                            placeholder={"Email"}
                            keyboardType={'email-address'}
                            onChangeText={(text)=>{
                                this.setState({
                                    emailId:text
                                })
                            }}/>

                            <TextInput 
                            style={styles.formTextInput}
                            placeholder={"Password"}
                           secureTextEntry={true}
                            onChangeText={(text)=>{
                                this.setState({
                                    password:text
                                })
                            }}/>

                            <TextInput 
                            style={styles.formTextInput}
                            placeholder={" Confirm Password"}
                           secureTextEntry={true}
                            onChangeText={(text)=>{
                                this.setState({
                                    confirmPassword:text
                                })
                            }}/>
                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                style={styles.registerButton}
                                onPress={()=>
                                this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)}>
                                <Text style={styles.registerButtonText}>Register</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.modalBackButton}>
                                <TouchableOpacity
                                style={styles.cancelButton}
                                onPress={()=>
                               this.setState({isModalVisible:false})}>
                                <Text style={{color:'#ff5722'}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                            

                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>

            </Modal>
        )
    }




    render()
    {
        return(
            <View style={styles.container}>
                <View style={{justifyContent:"center",alignItems:'center'}}>
                    {
                        this.showModal()
                    }
                </View>
                <View >
                   
                    <Text style={styles.title}>Book Santa</Text>
                </View>
                <View>
                <TextInput
                style={styles.inputBox}
                placeholder="abc@example/com"
                keyboardType='email-address'
                onChangeText={(text)=>{
                    this.setState({
                        emailId:text
                    })
                }}/>
                 <TextInput
                style={styles.inputBox}
                placeholder="EnterPassword"
               secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }}/>
                <TouchableOpacity style={[styles.button,{marginBottom:20,marginTop:20}]}
                onPress={()=>{this.userLogin(this.state.emailId,this.state.password)}}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}
                 onPress={()=>this.setState({ isModalVisible:true})}>
                    <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
                </View>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
     flex:1,
     backgroundColor:'#F8BE85',
     alignItems: 'center',
     justifyContent: 'center'
   },
   profileContainer:{
     flex:1,
     justifyContent:'center',
     alignItems:'center',
   },
   title :{
     fontSize:65,
     fontWeight:'300',
     paddingBottom:30,
     color : '#ff3d00'
   },
   loginBox:{
     width: 300,
     height: 40,
     borderBottomWidth: 1.5,
     borderColor : '#ff8a65',
     fontSize: 20,
     margin:10,
     paddingLeft:10
   },
   KeyboardAvoidingView:{
     flex:1,
     justifyContent:'center',
     alignItems:'center'
   },
   modalTitle :{
     justifyContent:'center',
     alignSelf:'center',
     fontSize:30,
     color:'#ff5722',
     margin:50
   },
   modalContainer:{
     flex:1,
     borderRadius:20,
     justifyContent:'center',
     alignItems:'center',
     backgroundColor:"#ffff",
     marginRight:30,
     marginLeft : 30,
     marginTop:80,
     marginBottom:80,
   },
   formTextInput:{
     width:"75%",
     height:35,
     alignSelf:'center',
     borderColor:'#ffab91',
     borderRadius:10,
     borderWidth:1,
     marginTop:20,
     padding:10
   },
   registerButton:{
     width:200,
     height:40,
     alignItems:'center',
     justifyContent:'center',
     borderWidth:1,
     borderRadius:10,
     marginTop:30
   },
   registerButtonText:{
     color:'#ff5722',
     fontSize:15,
     fontWeight:'bold'
   },
   cancelButton:{
     width:200,
     height:30,
     justifyContent:'center',
     alignItems:'center',
     marginTop:5,
   },
  
   button:{
     width:300,
     height:50,
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     backgroundColor:"#ff9800",
     shadowColor: "#000",
     shadowOffset: {
        width: 0,
        height: 8,
     },
     shadowOpacity: 0.30,
     shadowRadius: 10.32,
     elevation: 16,
     padding: 10
   },
   buttonText:{
     color:'#ffff',
     fontWeight:'200',
     fontSize:20
   }
  })