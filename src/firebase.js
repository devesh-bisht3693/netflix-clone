import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBF8ujrK7slP58Nl7Q0rBq9GWeXGS6kqTI",
    authDomain: "netflix-clone-e4acc.firebaseapp.com",
    projectId: "netflix-clone-e4acc",
    storageBucket: "netflix-clone-e4acc.appspot.com",
    messagingSenderId: "614150449838",
    appId: "1:614150449838:web:2fe135e60d45163cef5b3f"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export { auth };
  export default db;