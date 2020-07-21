import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyBvwNEDmgVe38PDdHWSPXYnBPvSSZYOSJ4",
  authDomain: "barter-system-d48e5.firebaseapp.com",
  databaseURL: "https://barter-system-d48e5.firebaseio.com",
  projectId: "barter-system-d48e5",
  storageBucket: "barter-system-d48e5.appspot.com",
  messagingSenderId: "487447129368",
  appId: "1:487447129368:web:70c178a5bd813fa6fb026d"
};
  // Initialize Firebase
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
