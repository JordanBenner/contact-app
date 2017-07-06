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

        setTimeout(function () {
          database.ref('contacts/' + User.user.uid)
            .once('value').then(function(contacts) {
              console.log(contacts.val());
            });
        }, 2000);

          database.ref('contacts/' + User.user.uid)
            .on('value', function(contacts) {
              console.log(contacts.val());
            });

      })
      .catch(function (e) {
        reject(e);
      });
  });
}

export function logout () {
  User.user = null;
  firebase.auth().signOut();
}

firebase.auth()
  .onAuthStateChanged(function(user) {
    if (user) {
      User.user = user;
      console.log(user);
    }
  });


export default database;
