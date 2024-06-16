import React, { useEffect, useState } from 'react'
import axios from '../../Api/axios'
import Card from './Card'
import { useToast } from '@/components/ui/use-toast'
import Add from './Add'
import {  useNavigate } from 'react-router-dom'

const ActivityTracker = () => {
  const navigate=useNavigate()
  const {toast}=useToast()
  const [toggle,setToggle]=useState(false)
  const errorHandler=(err)=>{
    if(err.response.status===401){
       toast({description:'Please enable third party cookies to access this site',
      variant:"destructive",duration:2000})}

      navigate('/login')
    }
    if(err.response.data.message){
          toast({description:err.response.data.message,
          variant:"destructive",duration:2000})}
          else{
          toast({description:err.response.data.message,
          variant:"destructive",duration:2000})
          }
  }
  const activityEndPoint='/activity/'
  const [name,setName]=useState()
  const [activities,setActivities]=useState([])

  const fetchData=()=>{
        axios.get(activityEndPoint,{withCredentials:true}).then(
      (response)=>{setActivities(response.data.data.activits)
        setName(response.data.data.user)
      }
    ).catch(
      errorHandler
    )

  }
  useEffect(()=>{
    fetchData()  },[])

  const handleClick=()=>{
    setToggle(!toggle)
  }

  const onStart=(id)=>{
    axios.patch(activityEndPoint+'start/'+id,{id},{withCredentials:true}).then(
      (_)=>{
        fetchData()
      }
    ).catch(errorHandler
    )
  }

  const onPause=(id)=>{
    axios.patch(activityEndPoint+'pause/'+id,{id},{withCredentials:true}).then(
      (_)=>fetchData()
    ).catch(errorHandler)
  }
 const onResume=(id)=>{
    axios.patch(activityEndPoint+'resume/'+id,{id},{withCredentials:true}).then(
      (_)=>fetchData()
    ).catch(errorHandler)
  }
 const onEnd=(id)=>{
    axios.patch(activityEndPoint+'end/'+id,{id},{withCredentials:true}).then(
      (_)=>fetchData()
    ).catch(errorHandler)
  }

  const onDelete=(id)=>{
    axios.delete(activityEndPoint+'delete/'+id,{withCredentials:true}).then(
      (_)=>fetchData()
    ).catch(errorHandler)
  }

  const onNew=(e,name)=>{
    e.preventDefault()
    axios.post(activityEndPoint+'new',{name},{withCredentials:true}).then((_)=>fetchData()).catch(errorHandler)
  }


  return (
    <>
      <header className="flex justify-between">
        <h1 className="ml-4 mb-4 mt-4 text-xl font-extrabold leading-none tracking-tight text-gray-900 md:mt-2 md:text-2xl lg:text-4xl dark:text-white">
          Hi, <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{name}</span> welcome back
        </h1>
        <button onClick={()=>setToggle(!toggle)} className='mt-2 text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Add tasks</button>
      </header>
     <div class="inline-flex items-center justify-center w-full">
    <hr class="w-64 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
    <span class="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">Your Activities</span>
</div> 
      <div className=" ">
        <div className=''>
      {activities.length===0?"No activities found":
      activities.map((activity)=>{
        return(
        <div key={activity._id} className="mb-2 ml-2">
            <Card activity={activity} onStart={onStart} onPause={onPause} onResume={onResume} onEnd={onEnd} onDelete={onDelete}/>
          </div>
        )
      }) }
      </div>
      </div>
      
      <Add value={toggle} handleClick={handleClick} handleSubmit={onNew}/>
    </>
  )
}

export default ActivityTracker
