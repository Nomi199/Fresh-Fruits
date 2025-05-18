// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // Import Storage


// const firebaseConfig = {
//     apiKey: "AIzaSyDu3mlc74h_vVic_MebK0oTmyYMfwEczWo",
//     authDomain: "my-project-4651e.firebaseapp.com",
//     projectId: "my-project-4651e",
//     storageBucket: "my-project-4651e.firebasestorage.app",
//     messagingSenderId: "892738372922",
//     appId: "1:892738372922:web:6b78862e4fbca671f03c03",
//     measurementId: "G-ES2XB4SKX3"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app); // Initialize Storage

// export { db, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, storage };




// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import { getStorage } from "firebase/storage"; // Import Storage
// // import { getDatabase } from "firebase/database";
// import { getAuth } from "firebase/auth";


// const firebaseConfig = {
//     apiKey: "AIzaSyDu3mlc74h_vVic_MebK0oTmyYMfwEczWo",
//     authDomain: "my-project-4651e.firebaseapp.com",
//     projectId: "my-project-4651e",
//     storageBucket: "my-project-4651e.appspot.com", // ✅ Corrected Storage Bucket
//     messagingSenderId: "892738372922",
//     appId: "1:892738372922:web:6b78862e4fbca671f03c03",
//     measurementId: "G-ES2XB4SKX3"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const storage = getStorage(app); // Initialize Storage
// const auth = getAuth(app);
// // const database = getDatabase(app);


// export { db, auth, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, storage };




import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 
import { getDatabase, ref, set } from "firebase/database"; // ✅ Import Realtime Database
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDu3mlc74h_vVic_MebK0oTmyYMfwEczWo",
    authDomain: "my-project-4651e.firebaseapp.com",
    projectId: "my-project-4651e",
    storageBucket: "my-project-4651e.appspot.com",
    messagingSenderId: "892738372922",
    appId: "1:892738372922:web:6b78862e4fbca671f03c03",
    measurementId: "G-ES2XB4SKX3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const database = getDatabase(app); // ✅ Initialize Realtime Database

// Export required modules
export { db, auth, collection, addDoc, getDocs, deleteDoc, doc, updateDoc, storage, database, ref, set };
