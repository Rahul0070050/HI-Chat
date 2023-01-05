// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, User } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { type } from "os";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage(app, 'profile-images');


type UserData = {
  uid: String,
  email: String,
}

type userInfo = {
  username: String,
  mobile: Number,
  about: String,
  file: File
}

// sign-in user
export function userSignIn(email: String, password: String) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, `${email}`, `${password}`)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        resolve(user)
        // createUser({ ...user, uid: user.uid as String, email: user.email as String })
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        console.log(errorCode);
        reject(errorCode)
        // console.log(errorMessage);
        // ..
      });
  })
}

export function loginUser(email: String, password: String) {
  return new Promise((resolve, reject) => { 
    
    signInWithEmailAndPassword(auth, `${email}`, `${password}`)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      resolve(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      // const errorMessage = error.message;
      console.log(errorCode);

      reject(errorCode)
    });
  })
}

// upload user profile
export function uploadProfile(userInfo:userInfo) {
  const storageRef = ref(storage, 'profile-images/rivers.jpg');

  const uploadTask = uploadBytesResumable(storageRef, userInfo.file);

  // Register three observers:
  // 1. 'state_changed' observer, called any time the state changes
  // 2. Error observer, called on failure
  // 3. Completion observer, called on successful completion
  uploadTask.on('state_changed',
    (snapshot) => {
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      console.log(error.message);

    },
    () => {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const currentUser:User = auth.currentUser as User
        console.log('File available at', downloadURL);
        updateProfile(currentUser, {
          displayName: null,
          photoURL: null,
        })
        setDoc(doc(db,'users',currentUser?.uid), {
          displayName: userInfo.username,
          photoURL: downloadURL,
          mobile: userInfo.mobile,
          about: userInfo.about
        }).then(res => {
          console.log(res);
          
        }).catch(err => {
          console.log(err);
          
        })
      });
    }
  );
}

export { auth }


