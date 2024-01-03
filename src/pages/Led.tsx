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




const Led: React.FC = () => {

  const [item,setItem]=useState<any>([]);
  const [select,setSelect] =useState<number>();
  const [shopBulk,setShopBulk]=useState<number>(1)
  const [godownBulk,setGodownBulk]=useState<number>(1)
  const [drawer,setDrawer]=useState(false)
  const [cost,setCost]=useState<number>()
  const [query,setQuery]=useState<string>('')
  const [queryResult,setQueryResult]=useState<any>([])

  const fetchData=async()=>{
    let { data: item, error } = await supabase
    .from('led')
    .select('*')
    .order('id',{ascending:true})

    // console.log(sheets)
    setItem(item)
    // console.log(error)
  }
 
    // useEffect(() => {
    //   fetchData();
    // }, [sheets])
            
 if(item.length===0){
  fetchData()
 }


  const subShopData=async(id:any,shop:any,bulk:any)=>{
    const time= Date.now()
    const t2= new Date(time).toISOString()

      
    const { error } = await supabase
      .from('led')
          .update({ shop: shop-bulk , updated_at: t2})
        .eq('id', id)

        console.log(error)
       await fetchData();
        // console.log(sheets)
        setShopBulk(1);

        query?(
          search(query)
        ):(
          ''
        )
  }
  const addShopData=async(id:any,shop:any,bulk:any)=>{
    const time= Date.now()
    const t2= new Date(time).toISOString()

    const { error } = await supabase
      .from('led')
          .update({ shop: shop + bulk, updated_at: t2})
        .eq('id', id)

        console.log(error)
        fetchData();

        setShopBulk(1);
        
        query?(
          search(query)
        ):(
          ''
        )
  }
//   const addGodownData=async(id:any,godown:any,bulk:any)=>{
//         const time= Date.now()
//     const t2= new Date(time).toISOString()

//     const { error } = await supabase
//       .from('sheets')
//           .update({ godown: godown+bulk ,  updated_at: t2})
//         .eq('id', id)

//         console.log(error)
//         fetchData();

//         setGodownBulk(1);

//         query?(
//           search(query)
//         ):(
//           ''
//         )
//   }
//   const subGodownData = async (id: any, godown: any, bulk: any) => {
//     const time = Date.now();
//     const t2 = new Date(time).toISOString();
  
//     const { error } = await supabase
//       .from('sheets')
//       .update({ godown: godown - bulk, updated_at: t2 })
//       .eq('id', id);
  
//     console.log(error);
//   fetchData();
//   setGodownBulk(1)

//   query?(
//     search(query)
//   ):(
//     ''
//   )
    
//   };
  
  const updateCost=async(id:any,newCost:any)=>{
        const time= Date.now()
    const t2= new Date(time).toISOString()

    const { error } = await supabase
      .from('led')
          .update({ cost:newCost,  updated_at: t2 })
        .eq('id', id)

        console.log(error)
        fetchData();

        // setBulk(1);
        query?(
          search(query)
        ):(
          ''
        )
  }

const search=async(query:any)=>{
  

const { data, error } = await supabase
  .from('led')
  .select('*')
  .filter('item', 'ilike', `%${query}%`)
  .order('id',{ascending:true});

// console.log(data)
setQueryResult(data)

if(query===''){
  setQueryResult([])
}
}

useEffect(() => {
 search(query)
 console.log(queryResult)
 fetchData()
}, [query])


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
          <input className='w-full bg-white border-gray-300 border-2 text-black rounded-lg h-8 p-2' type="text" value={query} onChange={(e)=>setQuery(e.target.value)} placeholder='Type to search item'></input>

        {
          queryResult.length > 0 &&(
            queryResult.map((data:any)=>{
              return(
                <div className='bg-white px-2 h-auto w-full flex flex-col rounded-2xl drop-shadow-xl mt-2' key={data.id}>
        
       
                <div className='flex flex-row justify-between h-6'>
                 
                <h1 className='text-black font-semibold text-sm '>{data.item}</h1>
                <h1 className='text-sm text-blue-700 font-semibold'>Shop : {data.shop}</h1>
        
                {/* <h1 className='text-sm text-blue-700 font-semibold'>Godown : {data.godown}</h1> */}
                {/* <h1 className='text-sm text-red-700 font-semibold'>Cost : {data.cost}</h1> */}
        
                </div>
                <h1 className='text-sm text-red-700 font-semibold'>Cost : {data.cost} /Piece</h1>
                {
           drawer && select===data.id?
          
           
             <h1 className='text-black font-semibold text-[20px] -mt-2' onClick={()=>setDrawer(false)}>x</h1>
            
           :
           <button onClick={()=>{
            setSelect(data.id)
            setCost(data.cost)
            setDrawer(true)
            console.log("open button clicked")

           }}>
           <FaAngleDown color='black' className='self-center' size={20}/>
           </button>
        }
        
                      {
                        select===data.id && drawer===true? 
                        <div className='flex flex-col justify-between items-centre transition-all p-2 -mt-5'>
            
        <div className='flex flex-row justify-between'>
        <div className='flex flex-col items-center'>
                <h1 className='text-black text-sm font-semibold'>Shop</h1>
                <div className='flex justify-between flex-row' >
                <FaMinusCircle color='blue' onClick={()=>subShopData(data.id,data.shop,shopBulk)}/>
                <input type="number" onChange={(event)=>setShopBulk(event.target.valueAsNumber)} className='w-12 text-center bg-white text-black border-b-2 border-black mx-2' value={shopBulk}></input>
                <FaPlusCircle color='blue' onClick={()=>addShopData(data.id,data.shop,shopBulk)}/>
                </div>
                
                </div>
        
                
        
                <div className='flex flex-col items-center'>
                <h1 className='text-red-600 text-sm font-semibold'>Update Cost</h1>
                <div className='flex justify-between flex-row' >
                <input type="number" onChange={(event)=>setCost(event.target.valueAsNumber)} className='w-12 text-center bg-white text-black border-b-2 border-black' value={cost}></input>
                <IoEnter color='blue' onClick={()=>updateCost(data.id,cost)} size={18}/>
                </div>
                </div>
        </div>
        <h1 className='text-gray-600 text-sm font-semibold italic '>Last Updated At :{new Date(data.updated_at).toLocaleString()} </h1> 
               
              </div>
                        :
                        <></>
                      }
               
                
        
              
               
                </div>
              )
            })
          )
        }
        {
          query==='' &&  item.map((data:any)=>{
              return(
                <div className='bg-white px-2 h-auto w-full flex flex-col rounded-2xl drop-shadow-xl mt-2' key={data.id}>
        
       
        <div className='flex flex-row justify-between h-6'>
         
        <h1 className='text-black font-semibold text-sm '>{data.item}</h1>
        <h1 className='text-sm text-blue-700 font-semibold'>Shop : {data.shop}</h1>

        {/* <h1 className='text-sm text-blue-700 font-semibold'>Godown : {data.godown}</h1> */}
        {/* <h1 className='text-sm text-red-700 font-semibold'>Cost : {data.cost}</h1> */}

        </div>
        <h1 className='text-sm text-red-700 font-semibold'>Cost : {data.cost} /Piece</h1>
        {
           drawer && select===data.id?
          
           
             <h1 className='text-black font-semibold text-[20px] -mt-2' onClick={()=>setDrawer(false)}>x</h1>
            
           :
           <button onClick={()=>{
            setSelect(data.id)
            setCost(data.cost)
            setDrawer(true)
            console.log("open button clicked")

           }}>
           <FaAngleDown color='black' className='self-center' size={20}/>
           </button>
        }
        

              {
                select===data.id && drawer? 
                <div className='flex flex-col justify-between items-centre transition-all p-2 -mt-5'>
        {/* <button onClick={()=>subShopData(data.id,data.shop,bulk)}>
          <h1 className='text-blue-600'> -</h1>
        </button>
        <input  type="number" onChange={(event)=>setBulk(event.target.valueAsNumber)} value={bulk}>
        </input>
        <button onClick={()=>addShopData(data.id,data.shop,bulk)}>
          <h1 className='text-blue-600'>+</h1>
        </button> */}
  <div className='flex flex-row justify-between'>

  <div className='flex flex-col items-center'>
        <h1 className='text-black text-sm font-semibold'>Shop</h1>
        <div className='flex justify-between flex-row' >
        <FaMinusCircle color='blue' onClick={()=>subShopData(data.id,data.shop,shopBulk)}/>
        <input type="number" onChange={(event)=>setShopBulk(event.target.valueAsNumber)} className='w-12 text-center bg-white text-black border-b-2 border-black mx-2' value={shopBulk}></input>
        <FaPlusCircle color='blue' onClick={()=>addShopData(data.id,data.shop,shopBulk)}/>
        
        </div>
       
        </div>

        {/* <div className='flex flex-col items-center'>
        <h1 className='text-black text-sm font-semibold'>Godown</h1>
        <div className='flex justify-between flex-row' >
        <FaMinusCircle color='blue' onClick={()=>subGodownData(data.id,data.godown,godownBulk)}/>
        <input type="number" onChange={(event)=>setGodownBulk(event.target.valueAsNumber)} className='w-12 text-center bg-white text-black border-b-2 border-black mx-2' value={godownBulk}></input>
        <FaPlusCircle color='blue' onClick={()=>addGodownData(data.id,data.godown,godownBulk)}/>
        </div>
        </div> */}

        <div className='flex flex-col items-center'>
        <h1 className='text-red-600 text-sm font-semibold'>Update Cost</h1>
        <div className='flex justify-between flex-row' >
        <input type="number" onChange={(event)=>setCost(event.target.valueAsNumber)} className='w-12 text-center bg-white text-black border-b-2 border-black' value={cost}></input>
        <IoEnter color='blue' onClick={()=>updateCost(data.id,cost)} size={18}/>
        </div>
        </div>
  </div>
  <h1 className='text-gray-600 text-sm font-semibold italic '>Last Updated At :{new Date(data.updated_at).toLocaleString()} </h1>
       
      </div>
                :
                <></>
              }
       
        

      
       
        </div>
              )
            })
          }
        </div>
        
       
        
      </IonPage>
  );
};

export default Led;
