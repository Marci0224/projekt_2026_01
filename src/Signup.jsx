import React from 'react'
import { useState } from 'react';
import Navbar from './Navbar';
import { Button, FormControl, Input, InputAdornment, InputLabel, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup({auth,user,db}) {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [testPassword,setTestPassword]=useState("");
  const [passwordError,setPasswordError]=useState(false);
  const [loginError,setLoginError]=useState(false);
  const [errorText,setErrorText]=useState("");

  const navigate = useNavigate();



  async function addUser() {
    await addDoc(collection(db, "users"), {username:"",email:email,password:password,avatar:""});
  }

  async function signup() {
    try {
      console.log(password, testPassword, password==testPassword);
      
      if(password==testPassword){
        console.log(email, password, testPassword);
        await createUserWithEmailAndPassword(auth, email, password);
        addUser();
        setLoginError(false);
        setErrorText(""); setEmail(""); setPassword("");
        navigate("/messages");
      } else{
        setPasswordError(true);
        setErrorText("Nem egyezik a két jelszó!");
      }
    } catch (err) {
      setLoginError(true);
      setPasswordError(true);
      setErrorText("Hibás email cím!");
      console.log(err);
      
    }
  }

  return (
    <>
      <Navbar/>
      <Stack className='login' spacing={2} sx={{border:'1px solid purple',padding:'10px',width:'300px',textAlign:"center",marginTop:'50px'}}>
        <h2>Sign up</h2>
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
            error={passwordError}
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
        <FormControl variant='standard' color='secondary'>
          <InputLabel htmlFor="password-test">
            Password again
          </InputLabel>
          <Input
            error={passwordError}
            required
            id="password-test"
            label="Password again"
            type="password"
            variant="outlined"
            value={testPassword}
            onChange={e=>setTestPassword(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon/>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button variant='contained' color='secondary' onClick={signup} disabled={email=="" || password=="" || testPassword=="" ? true : false}>Sign up</Button>
        <Stack color='error'>{errorText}</Stack>
      </Stack>
    </>
  )
}
