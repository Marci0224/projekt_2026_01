import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Fragment } from 'react';
import { signOut } from 'firebase/auth';

export default function Home() {

    const navigate = useNavigate();

    async function logout() {
      await signOut(auth);
    }

  return (
    <>
      <Navbar/>
      <div className='home'>
        <h1>Home</h1>
        <Link to="/login"><Button variant='contained' color='secondary'>Login</Button></Link>
      </div>
      
    </>
    
  )
}
