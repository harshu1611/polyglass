import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
// import './Tab1.css';
import { useEffect, useState } from 'react';
import '../tailwind.css'
import { supabase } from '../supabase/supabase';

import { FaAngleDown } from "react-icons/fa";
// import { FaAngleUp } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";


import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { IoEnter } from "react-icons/io5";
import logo from '../assets/images/logo.png'




const LowStock: React.FC = () => {

  const [item,setItem]=useState<any>([]);
  const [sheets,setSheets]=useState<any>([]);
  const [select,setSelect] =useState<number>();
  const [shopBulk,setShopBulk]=useState<number>(1)
  const [godownBulk,setGodownBulk]=useState<number>(1)
  const [drawer,setDrawer]=useState(false)
  const [cost,setCost]=useState<number>()
  const [query,setQuery]=useState<string>('')
  const [queryResult,setQueryResult]=useState<any>([])

  const fetchData=async()=>{
    let { data: item, error:sError } = await supabase
    .from('led')
    .select('*')
    .order('id',{ascending:true})

    // console.log(sheets)
    setItem(item)

    let { data: sheets, error:lError } = await supabase
    .from('sheets')
    .select('*')
    .order('id',{ascending:true})

    // console.log(sheets)
    setSheets(sheets)
    // console.log(error)
  }
 
    useEffect(() => {
      fetchData();
    }, [])
            
 if(item.length===0 && sheets.length===0){
  fetchData()
 }


  

  // console.log(select)
  // console.log(drawer)
  return (
    <IonPage className='bg-white  h-full p-4 justify-center'>
        <div className='flex flex-col overflow-y-auto'>
        
          <h1 className=' text-sm absolute top-0 text-blue-600 italic underline font-semibold p-1' onClick={async()=>{
            await supabase.auth.signOut();
          }}>Sign out</h1>
      
          <div className='flex flex-col w-full items-center mb-4'>
          <img src={logo} className='h-18 w-48'/>
          </div>
          
          {
          sheets &&  sheets.map((data:any)=>{
            const total=data.shop + data.godown
             if(total<data.minimum) return(
                <div className='bg-white px-2 h-auto w-full flex flex-col rounded-2xl drop-shadow-xl mt-2' key={data.id}>
        
       
        <div className='flex flex-row justify-between h-6'>
         
        <h1 className='text-red-700 font-semibold text-sm '>{data.item}</h1>
        <h1 className='text-sm text-blue-700 font-semibold'>Shop : {data.shop}</h1>

        <h1 className='text-sm text-blue-700 font-semibold'>Godown : {data.godown}</h1>
        {/* <h1 className='text-sm text-red-700 font-semibold'>Cost : {data.cost}</h1> */}

        </div>
        <h1 className='text-sm text-red-700 font-semibold'>Cost : {data.cost} /Piece</h1>
    
       
        </div>
              )
            })
          }
       
        {
          item &&  item.map((data:any)=>{
            if(data.shop<data.minimum)  return(
                <div className='bg-white px-2 h-auto w-full flex flex-col rounded-2xl drop-shadow-xl mt-2' key={data.id}>
        
       
        <div className='flex flex-row justify-between h-6'>
         
        <h1 className='text-red-700 font-semibold text-sm '>{data.item}</h1>
        <h1 className='text-sm text-blue-700 font-semibold'>Shop : {data.shop}</h1>

        {/* <h1 className='text-sm text-blue-700 font-semibold'>Godown : {data.godown}</h1> */}
        {/* <h1 className='text-sm text-red-700 font-semibold'>Cost : {data.cost}</h1> */}

        </div>
        <h1 className='text-sm text-red-700 font-semibold'>Cost : {data.cost} /Piece</h1>
    
       
        </div>
              )
            })
          }
        </div>
        
       
        
      </IonPage>
  );
};

export default LowStock;
