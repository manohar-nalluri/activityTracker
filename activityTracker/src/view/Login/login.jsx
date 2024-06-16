import React, { useState } from 'react'
import axios from '../../Api/axios'
import { useToast } from '@/components/ui/use-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate=useNavigate()
  const LOGIN_URL='/user/login'
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const {toast}=useToast()


  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
    const response=await axios.post(LOGIN_URL,JSON.stringify({email,password}),{headers:{'Content-Type':'application/json'},withCredentials:true})
    navigate('/')
    }catch(err){
      if(err.response){
        if(err.response.data.message){
          toast({description:err.response.data.message,
          variant:"destructive",duration:2000})
        }
        else{
          toast({
            description:"Something went wrong",
            variant: "destructive",
            duration:2000
          })
        }
      }
      else{
        toast({
          description:err.message,
          variant: "destructive",
          duration:2000
        })
      }
    }
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
           <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login 
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>

                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" onChange={(e)=>setPassword(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                                   <button type="submit" className="w-full text-black bg-black-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? <div onClick={()=>navigate('/signup')} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</div>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default Login
