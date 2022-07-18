import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken'
import { useHistory } from 'react-router-dom'

const Dashboard = () => {
    const history=useHistory();

    async function populateQuote(){
        const data=await fetch('http:// localhost:1337/api/quote',{
            headers:{
                'x-access-token':LocalStorage.getItem('token'),
            },
        })
    }

    useEffect(()=>{
        const token=localStorage.getItem('token');
        if(token){
            const user=jwt.decode(token);
        }
        if(!user){
            localStorage.removeItem('token');
            window.location.href='/';
            history.replace('/login')
        }
        else{
            populateQuote();
        }
    },[])

  return (
    <div>Hello world</div>
  )
}

export default Dashboard