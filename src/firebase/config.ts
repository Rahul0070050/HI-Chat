// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, User } from "firebase/auth";
import { getFirestore, setDoc, addDoc, doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
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

const db: any = getFirestore(app);

const storage = getStorage(app);


type UserData = {
  uid: string,
  email: string,
}

type userInfo = {
  username: string,
  mobile: string,
  about: string,
  file?: Blob | undefined
}

type addFriendInfo = {
  uid: string,
  displayName: string,
  photoURL: string
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
  return new Promise((resolve, reject) => {
    const currentUser: User = auth.currentUser as User

    console.log('update profile');

    if (userInfo.file != undefined) {

      console.log('update profile with profile image');

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
            steUserData(downloadURL, userInfo).then(() => {
              resolve(0)
            })
          }).catch(err => {
            console.log(err);

          });
        }
      );
    } else {
      console.log('update profile without profile image');
      steUserData('', userInfo).then(() => {
        resolve(0)
      })
    }
  })
}



function steUserData(downloadURL: string, userInfo: userInfo) {
  const currentUser: User = auth.currentUser as User

  const updateProfileData = () => {
    return new Promise((resolve, reject) => {
      const currentUser: User = auth.currentUser as User

      updateProfile(currentUser, {
        displayName: userInfo.username,
        photoURL: downloadURL ? downloadURL : currentUser.photoURL,
      }).then(res => {
        console.log('profile updated');
        resolve(0)
      })
    })
  }
  const setUserData = () => {
    return new Promise((resolve, reject) => {
      setDoc(doc(db, 'users', currentUser?.uid), {
        displayName: userInfo.username,
        photoURL: downloadURL ? downloadURL : currentUser.photoURL,
        mobile: userInfo.mobile,
        about: userInfo.about,
        email: currentUser?.email ? currentUser?.email : '',
      }).then(res => {
        console.log('user added');
        resolve(0)
      }).catch(err => {
        console.log(err);
      })
    })
  }
  return Promise.all([updateProfileData(), setUserData()]).then(() => {
    console.log('finished');
  })
}



export function findUserInfo(uid: string) {
  return new Promise((resolve, reject) => {

    const findTheUser = () => {
      try {
        return new Promise(async (resolve, reject) => {
          const userDocRef = doc(db, 'users', uid)
          const data = await getDoc(userDocRef)
          if (data?.data()) {
            resolve({ ...data.data() })
          } else {
            resolve({ status: 'invalid qr code' })
          }
        })
      } catch (error) {
        console.log(error);

      }
    }


    const iAlreadySendRequestOrNot = () => {
      return new Promise(async (resolve, reject) => {
        try {
          const currentUser: User = auth.currentUser as User
          // searching his collection, did i send friend request already to the person
          const collRef = collection(db, `users/${currentUser.uid}/friendRequested`)
          const userQuery: any = query(collRef, where("uid", "==", uid))

          getDocs(userQuery).then(snapShort => {
            if (snapShort.empty) {
              resolve({ requested: false });
            } else {
              snapShort.forEach((doc: any) => {
                resolve({ requested: true })
              });
            }
          }).catch(err => {
            console.log(err);
          })
        } catch (error) {
          console.log(error);

        }
      })
    }

    const thePersonIsMyFriendOrNot = () => {
      return new Promise(async (resolve, reject) => {
        try {

          const currentUser: User = auth.currentUser as User

          // searching the user is my friend of not
          const collRef = collection(db, `users/${currentUser.uid}/friends`)
          const userQuery: any = query(collRef, where("uid", "==", uid))
          getDocs(userQuery).then(snapShort => {
            if (snapShort.empty) {
              resolve({ friend: false })
            } else {
              snapShort.forEach((doc: any) => {
                resolve({ friend: true })
              })
            }
          }).catch(err => {
            console.log('2', err);
            reject(err)
          });
        } catch (error) {
          console.log(error);

        }
      })
    }

    Promise.all([findTheUser(), thePersonIsMyFriendOrNot(), iAlreadySendRequestOrNot()]).then((res: any) => {
      const profile = {...res[0],...res[1],...res[2]}
      console.log(profile);
      resolve(profile)
    }).catch(err => {
      console.log(err);

    })
  })
}



export function sendFriendRequest(personInfo: addFriendInfo) {
  return new Promise((resolve, reject) => {

    console.log(personInfo);
    
    const setFriendRequested = () => {
      return new Promise(async (resolve, reject) => {
        const currentUser: User = auth.currentUser as User
        const userCollRef = collection(db, `users/${currentUser.uid}/friendRequested`)
        // setting doc in the my Collection as a friend requested
        addDoc(userCollRef, personInfo).then(res => {
          console.log(res);
          resolve(res)
        }).catch(err => {
          console.log(err);
        })

      })
    }
    const setFriendRequestToThePerson = () => {
      return new Promise((resolve, reject) => {
        const currentUser: User = auth.currentUser as User

        const userCollRef = collection(db, `users/${personInfo.uid}/friendRequest`)
        // setting doc in that persons Collection as a friend request
        addDoc(userCollRef, { uid: currentUser.uid, displayName: currentUser.displayName, photoURL: currentUser.photoURL }).then(res => {
          console.log(res);
          resolve(res)
        }).catch(err => {
          console.log(err);
        })
      })
    }

    Promise.all([setFriendRequested(), setFriendRequestToThePerson()]).then(res => {
      resolve(res);

    })
  })
}

export function cancelFriendRequest() {
  return new Promise((resolve, reject) => {
    
  })
  
}

export { auth }


