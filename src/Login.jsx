import { Button, Divider, FormControl, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useEffect } from 'react';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export default function Login({auth,user,db}) {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loginError,setLoginError]=useState(false);
  const [errorText,setErrorText]=useState("");
  const [users,setUsers]=useState([]);
  
  const navigate = useNavigate();

  useEffect(()=>{
      async function getUsers() {
          const adatCollection = collection(db, 'users');
          const adatSnapshot = await getDocs(adatCollection);
          const adatList = adatSnapshot.docs.map(doc => ({ ...doc.data(), id:doc.id }));
          setUsers(adatList);
          console.log(adatList);
      }
      getUsers();
  },[])

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginError(false);
      setErrorText(""); setEmail(""); setPassword("");
      navigate("/messages");
    } catch (err) {
      setLoginError(true);
      setErrorText("Hibás felhasználónév vagy jelszó!");
    }
  }

  async function googleLogin() {
    let result=await signInWithPopup(auth, new GoogleAuthProvider());
    console.log(result);
    const adatSnapshot = await getDocs(query(collection(db, 'users'), where("email", "==", result.user.email)));
    if(adatSnapshot.docs.length==0){
      let profile={username:result.user.displayName,email:result.user.email,avatar:result.user.photoURL};
      console.log(profile);
      await addDoc(collection(db, "users"), profile);
    }
    navigate("/messages");
  }

  async function logout() {
      await signOut(auth);
      console.log("katt");
      
  }


  return (
    <>
      <Navbar/>
      <Stack className='login' spacing={2} sx={{border:'1px solid purple',padding:'10px',width:'300px',textAlign:"center",marginTop:'70px'}}>
        <h2>Login</h2>
        <FormControl variant="standard">
          <InputLabel htmlFor="email-input" color='secondary'>
            Email
          </InputLabel>
          <Input
            error={loginError}
            color='secondary'
            required
            id="email-input"
            label="Email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <EmailIcon/>
              </InputAdornment>
            }
          />
        </FormControl>
        <FormControl variant="standard" color='secondary'>
          <InputLabel htmlFor="password-input">
            Password
          </InputLabel>
          <Input
            error={loginError}
            required
            id="password-input"
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon/>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant='contained' color='secondary' onClick={login} disabled={email=="" || password=="" ? true : false}>Login</Button>
        <Stack color='error'>{errorText}</Stack>
        <Divider>or</Divider>
        <Button
            variant="outlined"
            loadingPosition="start"
            color='secondary'
            startIcon={<img src="/google.png" alt="" className='imgGoogle'/> }
            onClick={googleLogin}
          >
            Login with Google
          </Button>
          <Typography variant='body1'>Don't have an account? <Link to="/signup" style={{textDecoration:"none"}}>Sign up</Link></Typography>
          <Button variant="contained" color='error' onClick={logout}>Logout</Button>
      </Stack>
    </>
    
  )
}
