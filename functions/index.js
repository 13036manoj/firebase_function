const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const admin_fireStore=admin.firestore();

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });


exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
   console.log('user details',user)    
  return admin_fireStore.collection(`users`).doc(`${user.uid}`).set({
       name:user.email,
       mobile:{mobile1:1234567890,mobile2:9870122345}
       })
       .then(function(docRef) {
           console.log("Document written with ID: ", docRef.id);
           return Promise.resolve()
       })
       .catch(function(error) {
           console.error("Error adding document: ", error);
           return Promise.reject(error)
       });
   
});
exports.sendByeEmail = functions.auth.user().onDelete((user) => {
    console.log('delete user',user)  
   return admin_fireStore.collection(`users`).doc(`${user.uid}`).update({
        name:'disabled',
        mobile:{mobile1:1234567890,mobile2:9870122345}
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            return Promise.resolve()
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
            return Promise.reject(error)
        });  
  });



