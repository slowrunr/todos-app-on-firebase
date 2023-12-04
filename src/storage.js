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

export function createStorage(key) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return {
    key,
    db,
    pull: async function () {
      const querySnapshot = await getDocs(collection(this.db, this.key));
      const todos = [];

      querySnapshot.forEach((doc) => {
        todos.push({
          id: doc.id,
          title: doc.data().title,
        });
      });

      return todos;

      //   const data = localStorage.getItem(this.key);
      //   if (!data) {
      //     return null;
      //   }
      //   return JSON.parse(data);
    },
    push: async function (todo) {
      try {
        const docRef = await addDoc(collection(this.db, this.key), {
          title: todo.title,
          status: todo.status,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      // const preparedData = JSON.stringify(data);
      // localStorage.setItem(this.key, preparedData);
    },
  };
}
