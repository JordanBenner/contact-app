import * as firebase from "firebase";

// backend setup
var config = {
  apiKey: "AIzaSyBRoC5-hJZf_RmAxe2QPx0ketrypq6rah8",
   authDomain: "contact-app-862c7.firebaseapp.com",
   databaseURL: "https://contact-app-862c7.firebaseio.com",
   projectId: "contact-app-862c7",
   storageBucket: "contact-app-862c7.appspot.com",
   messagingSenderId: "1055934082544"
};
firebase.initializeApp(config);


var database = firebase.database();

export var User = {};
export function auth () {
  return new Promise(function (resolve, reject) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(function (result) {
        User.user = result.user;
        resolve(User);
      })
      .catch(function (e) {
        reject(e);
      });
  });
}

export default database;
