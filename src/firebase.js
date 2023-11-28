import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCOXDAhoDwBuiuHSMuC_8TnbjYyQoIR3vA",
  authDomain: "todo-list-2k24.firebaseapp.com",
  projectId: "todo-list-2k24",
  storageBucket: "todo-list-2k24.appspot.com",
  messagingSenderId: "457538188677",
  appId: "1:457538188677:web:1918ccec749b3a62ae40ec",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addDataToFireStore() {
  try {
    const docRef = await addDoc(collection(db, "todos"), {
      title: "Task3",
      status: "active",
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

async function getDataFromFirestore() {
  const querySnapshot = await getDocs(collection(db, "todos"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().title}`);
  });
}

addDataToFireStore();
getDataFromFirestore();

console.log(app);
