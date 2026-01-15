import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import { addDoc, collection, getDocs, or, query, where } from 'firebase/firestore';
import { useState } from 'react';
import { FormControl, InputLabel, List, ListItemButton, ListItemText, MenuItem, OutlinedInput, Select, serverTimestamp, Timestamp} from '@mui/material';

export default function Messages({user,db,userData}) {

    const [messages,setMessages]=useState([]);
    const [users,setUsers]=useState([]);
    const [cimzett,setCimzett]=useState(users[0].email);
    const [uzenet,setUzenet]=useState("");

    async function sendUzenet() {
        let ujLevel={felado:userData.email,fogado:cimzett,uzenet:uzenet,datum:serverTimestamp()}
        await addDoc(collection(db, "uzenetek"), ujLevel);
    }

    
    useEffect(()=>{
        async function getUsers() {
            const adatCollection = collection(db, 'users');
            const adatSnapshot = await getDocs(query(adatCollection, where("email", "!=", userData.email)));
            const adatList = adatSnapshot.docs.map(doc => ({ ...doc.data(), id:doc.id }));
            setUsers(adatList);
            console.log(adatList);
            setCimzett(adatList[0].email);
        }
        if(userData){
            getUsers();
        }
    },[userData]);

    useEffect(()=>{
        async function getMessages() {
            const adatCollection = collection(db, 'uzenetek');
            console.log(userData);
            const adatSnapshot = await getDocs(query(collection(db, 'uzenetek'), or (where("fogado", "==", userData.email),where("felado","==",userData.email)),orderBy("datum", "asc")));
            const adatList = adatSnapshot.docs.map(doc => ({ ...doc.data(), id:doc.id })).filter(x=>(x.fogado==cimzett) || (x.felado==cimzett));
            setMessages(adatList);
            console.log(adatList);
        }
        if(userData){
            getMessages();
        }
    },[userData]);

    console.log(users);
    
  return (
    <>
        <Navbar/>
        <div className='messages' style={{marginTop:'100px'}}>
            <select className='cimzettek' onChange={e=>setCimzett(e.target.value)}>
                {users.map(x=>
                    <option value={x.email} key={x.id}>{x.email}</option>
                )}
            </select>
            <div className='uzenetek'>
                {messages.map(x=>
                    <div className={x.felado==userData.email ? "tolem" : "kapott"} key={x.id}>{x.uzenet}</div>
                    /*<List sx={{display:'flex',flexDirection:'column',borderRadius:'5px',}}>
                        <ListItemButton component="a" href="" >
                            <ListItemText primary={x.felado} />
                            <ListItemText primary={x.datum} />
                            <ListItemText primary={x.uzenet} />
                            <ListItemText primary={x.fogado} />
                        </ListItemButton>
                    </List>*/
                )}
            </div>
            <div className='kuldes'><input type="text" className='uzenet' value={uzenet} onChange={e=>setUzenet(e.target.value)}/> <input type="button" className='gomb' value="Küldés" onClick={sendUzenet}/></div>
        </div>
    </>
    
  )
}
