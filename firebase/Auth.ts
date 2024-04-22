import { useState } from "react";
import { auth, db } from "./Config";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  onSnapshot,
  deleteDoc,
  doc,
  query,
  where,
  getDoc,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  signInWithCredential,
  verifyPasswordResetCode,
  EmailAuthProvider,
  signOut,
} from "firebase/auth";

onAuthStateChanged(auth, (user) => {
  if (user != null) {
    console.log(user);
  }
});

async function register(email, password) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  return cred;
}

async function resetEmail(email) {
  const cred = await sendPasswordResetEmail(auth, email);
  return cred;
}

async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function logout() {
  await signOut(auth);
}
///////////////////////////////////////////////////////////////////////////////////////
const colUser = collection(db, "users");
const colToDos = collection(db, "ToDos");

onSnapshot(colUser, (snapshot) => {
  let user = [];
  snapshot.docs.forEach((use) => {
    user.push({ ...use.data(), id: use.id });
  });
  console.log("Users ", user);
});

onSnapshot(colToDos, (snapshot) => {
  let ToDos = [];
  snapshot.docs.forEach((user) => {
    ToDos.push({ ...user.data(), id: user.id });
  });
  console.log("ToDos ", ToDos);
});

async function getDocsUser() {
  const snapshot = await getDocs(colUser);
  return snapshot.docs;
}
async function getDocsToDos() {
  const snapshot = await getDocs(colToDos);
  return snapshot.docs;
}

async function addUser(uid, mail, uname) {
  let res = await addDoc(colUser, {
    uid: uid,
    name: uname,
    email: mail,
  });
  return res;
}
async function addTodo(id, desName, des) {
  let res = await addDoc(colToDos, {
    uid: id,
    name: desName,
    description: des,
  });
  return res;
}

async function getUsers() {
  let User = await getDocsUser();
  let users = [];
  User.forEach((user) => {
    users.push({ ...user.data(), id: user.id });
  });
  return users;
}
async function getUser() {
  const userid = auth.currentUser.uid;
  const user = (await getDocs(query(colUser, where("uid", "==", userid)))).docs;
  console.log("current User", user[0].data());
  return user[0].data();
}
async function getToDos() {
  let ToDos = await getDocsToDos();
  let AllToDos = [];
  ToDos.forEach((ToDo) => {
    AllToDos.push({ ...ToDo.data(), id: ToDo.id });
  });
  return AllToDos;
}
async function getToDoForUser(uid) {
  const Todos = await getToDos();

  const todoOfUser = (await getDocs(query(colToDos, where("uid", "==", uid))))
    .docs;
  const to = [];
  todoOfUser.forEach((user) => {
    to.push({ ...user.data(), id: user.id });
  });
  console.log("to dos for user", to);
  return to;
}

async function delTodo(id) {
  const docRef = doc(colToDos, id);
  await deleteDoc(docRef);
}

async function updateToDo(id, todo) {
  const docRef = doc(colToDos, id);
  await updateDoc(docRef, todo);
}

// function subscribe(callback) {
//   const unsub = onSnapshot(query(colToDos), (snap) => {
//     const status = snap.metadata.hasPendingWrites ? "local" : "global";
//     snap.docChanges().forEach((s) => {
//    })
//   });
// }

export {
  register,
  login,
  resetEmail,
  getUser,
  addTodo,
  logout,
  getToDoForUser,
  addUser,
  delTodo,
  updateToDo,
};
