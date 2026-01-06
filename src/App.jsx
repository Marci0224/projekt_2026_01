import { useState } from 'react'
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebaseConfig.js';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import './App.css'
import Login from './Login';
import Users from './Users';
import Send from './Send';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home.jsx';

export default function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});

  const app=initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth=getAuth(app);

   const router = createBrowserRouter([
    { path: "/", element: <Home/> },
    { path: "/login", element: <Login auth={auth} user={user}/> },
    { path: "/send", element: <Send /> },
    { path: "/users", element: <Users /> }
  ]);

  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  )
}