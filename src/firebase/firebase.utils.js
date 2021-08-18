import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';


const config ={apiKey: "AIzaSyBCC5ywPliSsXf4UW2Mxm7EtsuDO4cQ1nI",
authDomain: "crwn-db-e644f.firebaseapp.com",
projectId: "crwn-db-e644f",
storageBucket: "crwn-db-e644f.appspot.com",
messagingSenderId: "80794478052",
appId: "1:80794478052:web:23445188d3f32e5ca653f1"
};

export const createUserProfileDocument = async(userAuth,additionalData) =>{
    if(!userAuth) return;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();
    
    if(!snapshot.exists)
    {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(err)
        {
            console.log("error",err.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({prompt : 'select_account'});


export const signInWithGoogle= () => auth.signInWithPopup(provider);

export default firebase;