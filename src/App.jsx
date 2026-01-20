import { useState } from 'react'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseConfig.js';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './App.css'
import Login from './Login';
import Users from './Users';
import Send from './Send';
import { createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import Home from './Home.jsx';
import { useEffect } from 'react';
import Messages from './Messages.jsx';
import Profile from './Profile.jsx';
import Signup from './Signup.jsx';
import { useMemo } from 'react';


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] =useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const us=onAuthStateChanged(auth, async (currentUser) =>{
      setUser(currentUser);
      if(currentUser){
        const adatSnapshot = await getDocs(query(collection(db, 'users'), where("email", "==", currentUser.email)));
        console.log(adatSnapshot);
        if(!adatSnapshot.empty){
          setUserData(adatSnapshot.docs[0].data());
        }
      } else{
        setUserData(null);
      }
      setLoading(false);
    });
    console.log(userData);
    return ()=>us();
  },[])



  function ProtectedRoute({ user, loading, children }) {
    if (loading) return <div>Betöltés...</div>; 
    if (!user) return <Navigate to="/login" replace />;
    return children;
  }

   const router = useMemo(() => createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login auth={auth} user={user} db={db} /> },
    { path: "/signup", element: <Signup auth={auth} user={user} db={db} /> },
    { path: "/messages", element: <ProtectedRoute user={user} loading={loading}><Messages user={user} db={db} userData={userData} /></ProtectedRoute> },
    { path: "/send", element: <Send auth={auth} /> },
    { path: "/users", element: <ProtectedRoute user={user} loading={loading}><Users auth={auth} /></ProtectedRoute> },
    { path: "/profile", element: <ProtectedRoute user={user} loading={loading}><Profile auth={auth} user={user} userData={userData} /></ProtectedRoute> }
  ]), [user, userData, loading]);

  if (loading) return <div>Éppen betölt...</div>;

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}