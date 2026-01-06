import { Button, Divider, FormControl, Input, InputAdornment, InputLabel, Stack, TextField } from '@mui/material'
import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';
import LockIcon from '@mui/icons-material/Lock';
import { useState } from 'react';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Login({auth,user}) {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loginError,setLoginError]=useState(false);
  const [errorText,setErrorText]=useState("");

  async function login() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoginError(false);
      setErrorText(""); setEmail(""); setPassword("");
    } catch (err) {
      setLoginError(true);
      setErrorText("Hibás felhasználónév vagy jelszó!");
    }
  }

  async function googleLogin() {
    await signInWithPopup(auth, new GoogleAuthProvider());
  }


  return (
    <Stack className='login' spacing={2} sx={{border:'1px solid purple',padding:'10px',width:'300px',textAlign:"center"}}>
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
      <Button variant='contained' color='secondary' onClick={login}>Login</Button>
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
    </Stack>
  )
}
