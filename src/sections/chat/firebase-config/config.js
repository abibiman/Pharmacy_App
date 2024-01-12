// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: 'AIzaSyAc5dCq_Wl6YMJ0HTHCmfeojDDt_WI5Mig',
//   authDomain: 'test-chatapp-efb7a.firebaseapp.com',
//   projectId: 'test-chatapp-efb7a',
//   storageBucket: 'test-chatapp-efb7a.appspot.com',
//   messagingSenderId: '146798877352',
//   appId: '1:146798877352:web:e1dfbacb436991a610c09d',
//   measurementId: 'G-FYEJHLL7M2',
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBSPR6Fpjzd1etidnUNio2qD4B40WSVHH8',
  authDomain: 'test-chatapp-c27d6.firebaseapp.com',
  projectId: 'test-chatapp-c27d6',
  storageBucket: 'test-chatapp-c27d6.appspot.com',
  messagingSenderId: '770864139300',
  appId: '1:770864139300:web:1ed6b74f3dc882fd7ddcb1',
};

// console.log(getFirestore);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);
