import firebase from 'firebase';

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectID,
    storageBucket: process.env.storageBuckec,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

try{

    firebase.initializeApp(firebaseConfig);
}catch(err){
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}


/**
 * firebase object already initialized
 */
const fire = firebase;


export default fire;
