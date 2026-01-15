import { Button, TextField, Typography } from '@mui/material'
import { signOut } from 'firebase/auth';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile({auth,user,userData}) {

    let [username,setUsername]=useState("");

    const navigate = useNavigate();

    async function changeUsername() {
      
    }

    async function logout() {
        await signOut(auth);
        console.log("katt");
        navigate("/");
    }

  return (
    <div className='profile'>
        <Typography>Your email adress: {userData.email}</Typography>
        <TextField id="tfUsername" label="Username" variant="filled" value={username}/>
        <Button variant="contained" onClick={changeUsername}>Username change</Button>
        <Button variant="contained" color='error' onClick={logout}>Logout</Button>
    </div>
  )
}
