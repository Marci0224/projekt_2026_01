import { Padding } from '@mui/icons-material'
import { Avatar, Button, Stack, Typography } from '@mui/material'
import { deepPurple } from '@mui/material/colors'
import { signOut } from 'firebase/auth'
import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({user, userData}) {

    async function logout() {
        await signOut(auth);
    }

    

  return (
    <div className='navbar'>
        <Stack sx={{padding:"10px", display:'flex', gap:'20px', flexDirection:'row',verticalAlign:'middle'}}>
            <Link to="/" style={{textDecoration:'none'}}>
                <Typography variant='h5'>
                    Home
                </Typography>
            </Link>
            <Link to={user? "/messages" : "/"} style={{textDecoration:'none'}}>
                <Typography variant='h5'>
                    Messages
                </Typography>
            </Link>
            <Link to={user ? "/users" : "/"} style={{textDecoration:'none'}}>
                <Typography variant='h5'>
                    Users
                </Typography>
            </Link>
        </Stack>
        <Stack sx={{display:'flex', flexDirection:'row', gap:'5px',verticalAlign:'middle',padding:"10px"}}>
            <Typography variant='h6'>Marcell</Typography>
            <Link to="/profile" style={{textDecoration:'none'}}><Avatar sx={{ bgcolor: deepPurple[500] }}>
        M</Avatar></Link>
        </Stack>
    </div>
  )
}
