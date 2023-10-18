console.log("!!! database_module.mjs has loaded !!!")

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js"

import { collection, doc, getDoc, getDocs, addDoc, setDoc, Timestamp, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
import { query, orderBy, limit, where, onSnapshot } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js"
import { getStorage, ref } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-storage.js"

const firebaseConfig = {
    apiKey: "AIzaSyDA5itOehOkeLc9ob3a8GsTJ9VhbWdee7I",
    authDomain: "sprout-financials.firebaseapp.com",
    databaseURL: "https://sprout-financials-default-rtdb.firebaseio.com",
    projectId: "sprout-financials",
    storageBucket: "sprout-financials.appspot.com",
    messagingSenderId: "864423850272",
    appId: "1:864423850272:web:725227e1ed9a578ef36745",
    measurementId: "G-Z0E9H5Z16M"
};

const app = initializeApp(firebaseConfig);  //Initialize Firebase


let db = null

try {
    db = getFirestore();
} catch (error) {
    console.log("Error initializing Firestore: ", error);
}

export async function getCollection(specific_collection) {
    const recordsCollection = collection(db, specific_collection);
    return recordsCollection;
}

export async function printDocumentIds(specific_collection) {
    const recordsCollection = await getCollection(specific_collection);
    
    try {
        const querySnapshot = await getDocs(recordsCollection);
        
        querySnapshot.forEach((doc) => {
            console.log("Document ID:", doc.id);
        });
    } catch (error) {
        console.error("Error getting documents:", error);
    }
}

export async function populateTableFilter(collectionName, filterCategory, tableId) {
    const recordsCollection = collection(db, collectionName);
  
    try {
      const querySnapshot = await getDocs(recordsCollection);
      const tableBody = document.querySelector(`#${tableId} tbody`); // Use the provided tableId
      let rowNumber = 1;
  
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.accountCategory === filterCategory) {
          tableBody.innerHTML += `
            <tr>
              <td>${data.accountNumber}</td>
              <td>${data.accountName}</td>
              <td>${data.normalSide}</td>
              <td>${data.accountCategory}</td>
              <td>${data.balance}</td>
              <td>${data.accountDescription}</td>
            </tr>
          `;
          rowNumber++;
        }
      });
    } catch (error) {
      console.error("Error getting documents:", error);
    }
}

export async function populateTable(collectionName, tableId) {
  const recordsCollection = collection(db, collectionName);

  try {
      const querySnapshot = await getDocs(recordsCollection);
      const tableBody = document.querySelector(`#${tableId} tbody`); // Use the provided tableId
      let rowNumber = 1;

      querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (true) {
              tableBody.innerHTML += `
                  <tr>
                      <td><input type="checkbox"></td>
                      <td>${data.accountNumber}</td>
                      <td>${data.accountName}</td>
                      <td>${data.normalSide}</td>
                      <td>${data.accountCategory}</td>
                      <td>${data.balance}</td>
                      <td>${data.accountDescription}</td>
                  </tr>
              `;
              rowNumber++;
          }
      });
  } catch (error) {
      console.error("Error getting documents:", error);
  }
}


export async function addDocument(specific_collection, data) {
    const recordsCollection = await getCollection(specific_collection);
    
    try {
        const docRef = await addDoc(recordsCollection, data);
        console.log("Successfully added account");
    } catch (error) {
        console.error("Error adding documents:", error);
    }
}

export async function getTimestamp() {
    return await serverTimestamp();
}
