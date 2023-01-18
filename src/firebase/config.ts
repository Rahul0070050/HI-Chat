// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, User } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


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

const storage = getStorage(app);


type UserData = {
  uid: string,
  email: string,
}

type userInfo = {
  username: string,
  mobile: string,
  about: string,
  file: Blob
}



// sign-in user
export function userSignUp(email: String, password: String) {
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

export function userSignIn(email: String, password: String) {
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
export function uploadProfile(userInfo: userInfo) {
  console.log(userInfo.file);

  const storageRef = ref(storage, `profile/${auth.currentUser?.uid}.jpg`);

  const uploadTask = uploadBytesResumable(storageRef, userInfo.file);

  uploadTask.on('state_changed',
    (snapshot) => {
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
      console.log(error);
      console.log(error.message);

    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const currentUser: User = auth.currentUser as User
        console.log('File available at', downloadURL);
        updateProfile(currentUser, {
          displayName: userInfo.username,
          photoURL: downloadURL,
        }).then(res => {
          console.log('profile updated');
        })
        setDoc(doc(db, 'users', currentUser?.uid), {
          displayName: userInfo.username,
          photoURL: downloadURL,
          mobile: userInfo.mobile,
          about: userInfo.about,
        }).then(res => {
          console.log('user added');

        }).catch(err => {
          console.log(err);

        })
      }).catch(err => {
        console.log(err);

      });
    }
  );
}

export { auth }


