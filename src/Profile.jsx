import { Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react'

export default function Profile({user}) {

    let [username,setUsername]=useState("");

  return (
    <div className='profile'>
        <Typography>Your email adress: {user.email}</Typography>
        <TextField id="tfUsername" label="Username" variant="filled" value={username}/>
        <Button variant="contained">Username change</Button>
    </div>
  )
}
