



import React, {Component} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, _ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/Header'
import { ScrollView } from 'react-native-gesture-handler';

export default class GoodRequest extends Component{
    constructor(){
        super()
        this.state = {
            userId : firebase.auth().currentUser.email,
            item_name:"",
            reason:"",
            IsItemRequestActive : "",
            requestedItemName: "",
            itemStatus:"",
            requestId:"",
            userDocId: '',
            docId :''
        } 
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
      }


    initiateRequest = async (item_name,reason) => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('goods_request').add({
            "user_ID": userId,
            "item_name":item_name,
            "reason":reason,
            "requestID"  : randomRequestId,
            "item_status" : "requested",
            "date"       : firebase.firestore.FieldValue.serverTimestamp()
        })

        await  this.getitemRequest()
        db.collection('users').where("email_Id","==",userId).get()
        .then()
        .then((snapshot)=>{
        snapshot.forEach((doc)=>{
            db.collection('users').doc(doc.id).update({
        IsitemRequestActive: true
        })
        })
    })
        this.setState({
            item_name:'',
            reason:'',
            requestId: randomRequestId
        })
        return Alert.alert("Exchange Request Successfull")
    }

    getIsitemRequestActive(){
        db.collection('users')
        .where('email_Id','==',this.state.userId)
        .onSnapshot(querySnapshot => {
          querySnapshot.forEach(doc => {
            this.setState({
              IsitemRequestActive:doc.data().IsitemRequestActive,
              userDocId : doc.id
            })
          })
        })
      }
      
      getitemRequest =()=>{
        // getting the requested item
      var itemRequest=  db.collection('goods_request')
        .where('user_ID','==',this.state.userId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            if(doc.data().item_status !== "received"){
              this.setState({
                requestId : doc.data().request_id,
                requesteditemName: doc.data().item_name,
                itemStatus:doc.data().item_status,
                docId     : doc.id
              })
            }
          })
      })}
      
      
      
      sendNotification=()=>{
        //to get the first name and last name
        db.collection('users').where('email_Id','==',this.state.userId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            var name = doc.data().first_name
            var lastName = doc.data().last_name
      
            // to get the donor id and item nam
            db.collection('all_notifications').where('request_id','==',this.state.requestId).get()
            .then((snapshot)=>{
              snapshot.forEach((doc) => {
                var donorId  = doc.data().donor_id
                var item_name =  doc.data().item_name
      
                //targert user id is the donor id to send notification to the user
                db.collection('all_notifications').add({
                  "targeted_user_id" : donorId,
                  "message" : name +" " + lastName + " received the item " + item_name ,
                  "notification_status" : "unread",
                  "item_name" : item_name
                })
              })
            })
          })
        })
      }
      
      componentDidMount(){
        this.getitemRequest()
        this.getIsitemRequestActive()
      
      }
      
      updateitemRequestStatus=()=>{
        //updating the item status after receiving the item
        db.collection('goods_request').doc(this.state.docId)
        .update({
          item_status : 'recieved'
        })
      
        //getting the  doc id to update the users doc
        db.collection('users').where('email_Id','==',this.state.userId).get()
        .then((snapshot)=>{
          snapshot.forEach((doc) => {
            //updating the doc
            db.collection('users').doc(doc.id).update({
              IsitemRequestActive: false
            })
          })
        })
      
      
      }
    render(){
        if(this.state.IsBookRequestActive === true){
            return(
      
              // Status screen
      
              <View style = {{flex:1,justifyContent:'center'}}>
                <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
                <Text>Book Name</Text>
                <Text>{this.state.requestedBookName}</Text>
                </View>
                <View style={{borderColor:"orange",borderWidth:2,justifyContent:'center',alignItems:'center',padding:10,margin:10}}>
                <Text> Book Status </Text>
      
                <Text>{this.state.bookStatus}</Text>
                </View>
      
                <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:"orange",width:300,alignSelf:'center',alignItems:'center',height:50,marginTop:30}}
                onPress={()=>{
                  this.sendNotification()
                  this.updateBookRequestStatus();
                  this.receivedBooks(this.state.requestedBookName)
                }}>
                <Text style = {{textAlignVertical:"center"}}>I recieved the book </Text>
                </TouchableOpacity>
              </View>
            )
          }
          else
          {
        return(
            <ScrollView>
                    <View>
                    <MyHeader title="Add item" navigation ={this.props.navigation}/>
                    <TextInput
                        style={styles.itemtitle}
                        placeholder="Name of the Item"
                        placeholderTextColor = "#40E9E0"
                        onChangeText={(text)=>{
                        this.setState({
                            item_name: text
                        })
                        }}
                        value = {this.state.item_name}
                    />
                    <TextInput
                        style={styles.requestReason}
                        multiline = {true}
                        placeholder="Why do you need this item?"
                        placeholderTextColor = "#40E9E0"
                        onChangeText={(text)=>{
                        this.setState({
                            reason: text
                        })
                        }}
                        value = {this.state.reason}
                    />

                    <TouchableOpacity 
                    style = {styles.reqButton}
                    onPress={()=>{
                        this.initiateRequest(this.state.item_name, this.state.reason)
                        }}>
                        <Text style = {styles.reqText}>Request</Text>
                    </TouchableOpacity>
                    </View>                    
            </ScrollView>
        )
    }
}
}

const styles  = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#F8BE85',
        justifyContent: "center",
        alignItems: "center"
    },
    title:{
        fontSize:28,
        fontWeight:'300',
        color : '#4C516D',
        textAlign:"center",
        marginTop:20,
        marginBottom:20,
    },
    itemtitle: {
        width: 300,
        height: 40,
        borderWidth: 2,
        borderColor : '#4C516D',
        fontSize: 16,
        margin:15,
        padding:2,
        alignSelf:"center",
        textAlignVertical:"center",
        textAlign:"center"
    },
    requestReason: {
        width: 300,
        height: 270,
        borderWidth: 2,
        borderColor : '#4C516D',
        fontSize: 16,
        margin:15,
        padding:10,
        alignSelf:"center",
        textAlignVertical:"top"
    },
    reqButton:{
        width:300,
        height:50,
        justifyContent:'center',
        alignSelf:'center',
        alignItems:"center",
        borderRadius:25,
        backgroundColor:"#40E0D0",
        shadowColor: "#000",
        shadowOffset: {
           width: 0,
           height: 8,
        },
        shadowOpacity: 0.30,
        shadowRadius: 10.32,
        elevation: 16,
        margin:20
      },
      reqText:{
        color:'#ffff',
        fontWeight:'200',
        fontSize:20
      },

})