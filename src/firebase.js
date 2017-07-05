import * as firebase from "firebase";


var config = {
  apiKey: "AIzaSyBRoC5-hJZf_RmAxe2QPx0ketrypq6rah8",
  authDomain: "dcpretest.firebaseapp.com",
  databaseURL: "https://dcpretest.firebaseio.com",
  storageBucket: "dcpretest.appspot.com",
};
firebase.initializeApp(config);
var database = firebase.database();
export default database;
