import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBJL8pwTAA-Lm3pZzW9mbHTSWG8VMYy6DU",
    authDomain: "discord-clone-1e146.firebaseapp.com",
    projectId: "discord-clone-1e146",
    storageBucket: "discord-clone-1e146.appspot.com",
    messagingSenderId: "39382770191",
    appId: "1:39382770191:web:959614cf009bdf05b0797a",
    measurementId: "G-9J6B52KJ4F"
});
// the firebaseApp which we initialized above, using that we can use it get firestore which will have all the data
// we are storing it in a variable called db and we are exporting it

const db=firebaseApp.firestore();
const auth=firebase.auth();
const provider= new firebase.auth.GoogleAuthProvider();

export {auth,provider};
export default db;