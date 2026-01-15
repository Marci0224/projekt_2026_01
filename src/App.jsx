import { useState } from 'react'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseConfig.js';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './App.css'
import Login from './Login';
import Users from './Users';
import Send from './Send';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';
import { useEffect } from 'react';
import Messages from './Messages.jsx';
import Profile from './Profile.jsx';
import Signup from './Signup.jsx';

export default function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});
  const [userData, setUserData] =useState({});

  const app=initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth=getAuth(app);

  
  async function getUserData() {
    if(!user) return;
    console.log(user);
    const adatSnapshot = await getDocs(query(collection(db, 'users'), where("email", "==", user.email)));
    console.log(adatSnapshot);
    if(!adatSnapshot.empty){
      setUserData(adatSnapshot.docs[0].data());
    }
    console.log(userData);
  }

  useEffect(()=>{getUserData()},[user])

  useEffect(()=>{
    const us=onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return(us);
  },[])

   const router = createBrowserRouter([
    { path: "/", element: <Home/> },
    { path: "/login", element: <Login auth={auth} user={user} db={db}/> },
    { path: "/messages", element: <Messages user={user} db={db} userData={userData}/> },
    { path: "/send", element: <Send auth={auth}/> },
    { path: "/users", element: <Users auth={auth}/> },
    { path: "/signup", element: <Signup auth={auth} user={user} db={db}/>},
    { path: "/profile", element: <Profile auth={auth} user={user} userData={userData}/> }
  ]);

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}