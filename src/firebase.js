import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCueeouPzCKunXYL2K4v__sMaCtYK3cHyI",
    authDomain: "linkedin-clone-d1775.firebaseapp.com",
    projectId: "linkedin-clone-d1775",
    storageBucket: "linkedin-clone-d1775.appspot.com",
    messagingSenderId: "159580534072",
    appId: "1:159580534072:web:573ad3e562b333537cfdcd"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, provider }