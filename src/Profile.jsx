import { Password } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material'
import { signOut } from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Profile({auth,user,userData,db}) {

    let [username,setUsername]=useState("");

    const navigate = useNavigate();

    async function changeUsername() {
      let ujInfo={avatar:userData.avatar,email:userData.email,password:userData.password,username:username}
      console.log(userData);
      console.log(user.id);
      
      await setDoc(doc(collection(db,"users"),user.id), ujInfo);
    }

    async function logout() {
      await signOut(auth);
      console.log("katt");
      navigate("/");
    }

  return (
    <div className='profile'>
        <Typography>Your email adress: {userData.email}</Typography>
        <TextField id="tfUsername" label="Username" variant="filled" value={username} onChange={e=>setUsername(e.target.value)}/>
        <Button variant="contained" onClick={changeUsername} >Username change</Button>
        <Button variant="contained" color='error' onClick={logout}>Logout</Button>
    </div>
  )
}
