import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAc321r8H_X8I7DdHZGVOKgvyLa1Q4g8Yg",
  authDomain: "kd-smartshop.firebaseapp.com",
  databaseURL: "https://kd-smartshop.firebaseio.com",
  projectId: "kd-smartshop",
  storageBucket: "",
  messagingSenderId: "982276402475",
  appId: "1:982276402475:web:b5d535d6269d367cade96e"
};
export const createUserProfileDocument=async (userAuth, additionalData)=>{
  if (!userAuth)return;

  const userRef=firestore.doc(`user/${userAuth.uid}`);

  const snapShot=await userRef.get();
  
  if(!snapShot.exists){
    const {displayName, email}=userAuth;
    const createdAt=new Date();

    try{
      await userRef.set({
        displayName, 
        email,
        createdAt,
        ...additionalData,
      })
    }catch(error){
     console.log('error creating user', error.message)
    }
  }
  return userRef;
}
firebase.initializeApp(config);

export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider= new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promt :'select_account '});
export const signInWithGoogle=()=>auth.signInWithPopup(provider);
export default firebase;