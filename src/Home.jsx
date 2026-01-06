import { Button } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {

    const navigate = useNavigate();

  return (
    <div className='home'>
      <h1>Home</h1>
      <Link to="/login"><Button variant='contained' color='secondary'>Login</Button></Link>
    </div>
  )
}
