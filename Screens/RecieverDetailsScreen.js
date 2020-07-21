import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';
import{Card,Header,Icon} from 'react-native-elements';
import firebase from 'firebase';

import db from '../config.js';
import { ScrollView } from 'react-native-gesture-handler';

export default class RecieverDetailsScreen extends Component{
  constructor(props){
    super(props);
    this.state={
      userId          : firebase.auth().currentUser.email,
      userName        : "",
      recieverId      : this.props.navigation.getParam('details')["user_ID"],
      requestId       : this.props.navigation.getParam('details')["requestID"],
      item_name        : this.props.navigation.getParam('details')["item_name"],
      reason_for_requesting     : this.props.navigation.getParam('details')["reason"],
      recieverName    : '',
      recieverContact : '',
      recieverAddress : '',
      recieverRequestDocId : ''
    }
  }



  getRecieverDetails(){
    db.collection('users').where('email_ID','==',this.state.recieverId).get()
    .then(snapshot=>{
      snapshot.forEach(doc=>{
        this.setState({
          recieverName    : doc.data().first_name,
          recieverContact : doc.data().mobile_number,
          recieverAddress : doc.data().address,
        })
      })
    });

    db.collection('goods_request').where('requestID','==',this.state.requestId).get()
    .then(snapshot=>{
      snapshot.forEach(doc => {
        this.setState({recieverRequestDocId:doc.id})
     })
  })}


  getUserDetails=(userId)=>{
    db.collection("users").where('email_ID','==', userId).get()
    .then((snapshot)=>{
      snapshot.forEach((doc) => {
        this.setState({
          userName  :doc.data().first_name + " " + doc.data().last_name
        })
      })
    })
  }

  updateitemStatus=()=>{
    db.collection('all_donations').add({
      "item_name"           : this.state.item_name,
      "request_id"          : this.state.requestId,
      "requested_by"        : this.state.recieverName,
      "donor_id"            : this.state.userId,
      "request_status"      :  "Donor Interested"
    })
  }


  addNotification=()=>{
    var message = this.state.userName + " has shown interest in donating the item"
    db.collection("all_notifications").add({
      "targeted_user_id"    : this.state.recieverId,
      "donor_id"            : this.state.userId,
      "request_id"          : this.state.requestId,
      "item_name"           : this.state.item_name,
      "date"                : firebase.firestore.FieldValue.serverTimestamp(),
      "notification_status" : "unread",
      "message"             : message
    })
  }



  componentDidMount(){
    this.getRecieverDetails()
    this.getUserDetails(this.state.userId)
  }


    render(){
      return(
        <ScrollView>
        <View style={styles.container}>
          <View style={{flex:0.1}}>
            <Header
              leftComponent ={<Icon name='arrow-left' type='feather' color='white'  onPress={() => this.props.navigation.goBack()}/>}
              centerComponent={{ text:"Details", style: { color: '#00E1D9', fontSize:20, fontWeight:"200" } }}
              backgroundColor = "black"
            />
          </View>
          <View style={{flex:0.45,}}>
            <Card
                title={"Item Information"}
                titleStyle= {{fontSize : 25, fontWeight:"200"}}
              >
              <Card >
                <Text style={{fontWeight:'200'}}>Item Name : {this.state.item_name}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'200'}}>Reason : {this.state.reason_for_requesting}</Text>
              </Card>
            </Card>
          </View>
          <View style={{flex:0.3}}>
            <Card
              title={"Reciever Information"}
              titleStyle= {{fontSize : 25, fontWeight:"200"}}
              >
              <Card>
                <Text style={{fontWeight:'200'}}>Name: {this.state.recieverName}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'200'}}>Contact: {this.state.recieverContact}</Text>
              </Card>
              <Card>
                <Text style={{fontWeight:'200'}}>Address: {this.state.recieverAddress}</Text>
              </Card>
            </Card>
          </View>
          <View style={styles.buttonContainer}>
            {
              this.state.recieverId !== this.state.userId
              ?(
                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                      this.updateitemStatus()
                      this.addNotification()
                      this.props.navigation.navigate('MyDonations')
                    }}>
                  <Text style={{color:'white'}}>I want to Donate</Text>
                </TouchableOpacity>
              )
              : null
            }
          </View>
        </View>
        </ScrollView>
      )
    }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  buttonContainer : {
    flex:0.3,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50,
    justifyContent:'center',
    alignItems : 'center',
    borderRadius: 10,
    backgroundColor: '#40E0D0',
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     },
    elevation : 16,
    margin:20
  }
})
