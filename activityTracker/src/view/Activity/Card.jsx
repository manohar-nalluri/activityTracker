import React, { useEffect, useState } from 'react'

const Card = ({activity ,onStart,onPause,onResume,onEnd,onDelete}) => {
  const [actionToggle,setActionToggle]=useState('false')
  const [duration,setDuration]=useState(0)
  const [details,setDetails]=useState(false)
  console.log(details)
  const toggleDetails=()=>{
    setDetails(!details)
  }
  const actionToggler=()=>{
    setActionToggle(!actionToggle)
  }
  const formatedTimestamp = (d)=> {
    console.log(d)
    const c=new Date(d).toString()

    return c.split("GMT")[0].trim();
}
  useEffect(() => {
    let timer = null;
    if (activity.status === "START" || activity.status === "RESUME") {
      let startTime = activity.status === "START" ? activity.start : activity.previousResume;
      startTime=new Date(startTime)
      const initialDuration = activity.duration + Math.floor((Date.now() -startTime.getTime() ) / 1000);
      console.log(Date.now()-startTime)
      setDuration(initialDuration);

      timer = setInterval(() => {
        setDuration((prevDuration) => prevDuration + 1);
      }, 1000);
    }else{
      setDuration(activity.duration)
    }
        return () => {
      clearInterval(timer);
    };
  }, [activity]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    let formattedTime = '';
    if (hours > 0) {
      formattedTime += `${hours}h`;
    }
    if (minutes > 0 || hours > 0) {
      formattedTime += `${minutes}m`;
    }
    formattedTime += `${seconds}s`;
    return formattedTime;
  };
  
  return (
    <>
<div className="w-full max-w-sm md:max-w-xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className="px-5 pb-5">
            <h5 className="text-3xl mt-2 font-semibold tracking-tight text-gray-900 dark:text-white">{activity.name}</h5>
        <div className="flex items-center mt-2.5 mb-5">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-1 py-1 rounded dark:bg-blue-200 dark:text-blue-800 ms-1">{activity.status}</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatTime(duration)}</span>
            <button onClick={toggleDetails} className={`text-white ${activity.status==="END"?"":"hidden"} bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}>Show Details</button>
           
<div className={`flex ${activity.status==="END"?"hidden":""} justify-end px-4 pt-4 relative`}>
    <button id="dropdownButton" onClick={actionToggler} data-dropdown-toggle="dropdown" className="inline-block flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
        <p className="mr-2">Action </p>
        <span className="sr-only">Open dropdown</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
            </svg>   </button>
    <div id="dropdown" className={`z-10 ${actionToggle?"hidden":""} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow absolute top-full mt-1 left-0 w-44 dark:bg-gray-700`}>
        <ul className="py-2" aria-labelledby="dropdownButton">
            <li>
                <div onClick={()=>{onStart(activity._id);actionToggler()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Start</div>
            </li>
<li>
                <div onClick={()=>{onPause(activity._id);actionToggler()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Pause</div>
            </li>
<li>
                <div onClick={()=>{onResume(activity._id);actionToggler()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Resume</div>
            </li>

            <li>
                <div onClick={()=>{onEnd(activity._id);actionToggler()}} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">End</div>
            </li>
            <li>
                <div onClick={()=>{onDelete(activity._id);actionToggler()}} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</div>
            </li>
        </ul>
    </div>
</div>
        </div>

    <div className={`${details?"":"hidden"}`}>
          <h4>Created at:{formatedTimestamp(activity.createdAt)}</h4>
          <h4>Started at:{formatedTimestamp(activity.start||Date.now())}</h4>
          <h4>Ended at:{formatedTimestamp(activity.end||Date.now())}</h4>
          <h4>Duration:{formatTime(duration)}</h4>
    </div>
    </div>
</div>

    </>
  )
}

export default Card

