import { IonPage } from '@ionic/react'
import React, { useState } from 'react'
import logo from '../assets/images/logo.png'
import { supabase } from '../supabase/supabase'

export default function Login() {
    const sign=async(email:any,password:any)=>{
        // const { data, error } = await supabase.auth.signInWithOAuth({
        //     provider: 'google'
        //   })
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })
          console.log(data,error)
    }

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
  return (
    <IonPage className='bg-white flex p-4 items-center '>
    <div className='flex w-full items-center flex-col h-full'>
      <img src={logo} className='h-20 w-44 mt-4'></img>
      <div className='flex flex-col mt-[50%] justify-center w-full'>
        <input className='w-full bg-white border-gray-300 border-2 text-black rounded-lg h-8 p-2 mt-2' type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'></input>
        <input className='w-full bg-white border-gray-300 border-2 text-black rounded-lg h-8 p-2 mt-2' type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password'></input>
        <button onClick={()=>sign(email,password)} className='bg-[#a4cc3c] rounded-xl w-[50%] mx-[25%] h-12 items-center justify-center mt-2 flex'>
          <h1 className='text-white text-lg'>Sign In</h1>
        </button>
      </div>
      <a href='/signup'>
        <h1 className='text-blue-600 text-sm italic underline' >Register for New Users</h1>
      </a>
    </div>
  </IonPage>
  
  )
}
