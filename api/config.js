import firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDhxRWWlBUBrdIOm9MmW_9B72niHJDlWuA",
    authDomain: "dw-expenses.firebaseapp.com",
    databaseURL: "https://dw-expenses.firebaseio.com",
    projectId: "dw-expenses",
    storageBucket: "dw-expenses.appspot.com",
    messagingSenderId: "893041305380"
  };
  
  firebase.initializeApp(config);

  const Firebase = firebase

  export default Firebase

  