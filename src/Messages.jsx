import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import { collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';
import { List, ListItemButton, ListItemText } from '@mui/material';

export default function Messages({user,db}) {

    const [messages,setMessages]=useState([]);

    useEffect(()=>{
        async function getMessages() {
            const adatCollection = collection(db, 'uzenetek');
            const adatSnapshot = await getDocs(adatCollection);
            const adatList = adatSnapshot.docs.map(doc => ({ ...doc.data(), id:doc.id }));
            setMessages(adatList);
            console.log(adatList);
        }
        getMessages();
    },[])

  return (
    <>
        <Navbar/>
        <div className='messages' style={{marginTop:'100px'}}>
            Itt vannak az üzenetek.
            {messages.map(x=>
                <List sx={{display:'flex',flexDirection:'column',borderRadius:'5px',}}>
                    <ListItemButton component="a" href="">
                        <ListItemText primary={x.felado} />
                        <ListItemText primary={x.datum} />
                        <ListItemText primary={x.uzenet} />
                        <ListItemText primary={x.fogado} />
                    </ListItemButton>
                </List>
            )}
        </div>
    </>
    
  )
}
