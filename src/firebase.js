
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut} from "firebase/auth";
import { getFirestore, collection, query, getDocs, where, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMGwrz5FCyLEu6Mv_i5aI36jbt2d73w5w",
  authDomain: "mdnotes-a1e1c.firebaseapp.com",
  projectId: "mdnotes-a1e1c",
  storageBucket: "mdnotes-a1e1c.appspot.com",
  messagingSenderId: "799031031841",
  appId: "1:799031031841:web:9c2c5c792f35f59bce0b60"
};

// Initialize Firebase, auth and database services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getFirestore(app); //Get associated database
const notesCollection = collection(database, "notes") //Find collection from specified database
const usersCollection = collection(database, "users");


//Provide Google authentication feature
const googleAuthProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        const user = result.user;
        //Construct a query that looks into user collection for the specified user uid
        const customQuery = query(usersCollection, where("uid", '==', user.uid));
        //Make the query
        const userDocuments = await getDocs(customQuery);

        if (userDocuments.docs.length === 0) {
            //User does not exist. Add a new entry into the users collection
            await addDoc(collection(database, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (error) {
        //User was unable to sign in properly
        alert(error.message);
    }
};

//Provide email register feature
const registerWithEmailAndPassword = async (name, email, password) => {
    try {
        //Try to create a new account
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = result.user;
        //Add new account into database
        await addDoc(usersCollection, {
            uid: newUser.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        //Could not create an account
        alert(error.message);
    }
}

//Provide email login feature
const logInWithEmailAndPassword = async (email, password) => {
    try {
        //Try to sign in with the given credentials
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        //Unable to sign in with the given credentials
        alert(error.message);
    }
}

//Provide password reset functionality
const sendPasswordReset = async (email) => {
    try {
        //Send password reset email
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link has been sent!");
    } catch (error) {
        //Got problem sending reset email
        alert(error.message);
    }
};

//Provide logout functionality
const logout = () => {
    signOut(auth);
}

//Export required variables and functions
export {
    auth,
    database,
    notesCollection,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
}



