import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

var config = {
    apiKey: "AIzaSyBVMnkKLf0-GBQRsSWvBWAmgpnF79C3H4U",
    authDomain: "lp-wmce-projet-tutore.firebaseapp.com",
    databaseURL: "https://lp-wmce-projet-tutore.firebaseio.com",
    projectId: "lp-wmce-projet-tutore",
    storageBucket: "lp-wmce-projet-tutore.appspot.com",
    messagingSenderId: "300951782730"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;