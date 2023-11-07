import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart,signInSuccess,signInFailure} from '../redux/user/user.slice'
import OAuth from '../components /OAuth'

export default function SignIn() {
  
  const [formData, setFormData] = useState({})
  const{error,loading} = useSelector(state=>state.user)
  // const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
     dispatch(signInStart())
    //  setLoading(true);
      const res = await fetch('/api/auth/signin',{
        method: "POST",
        headers :{
          'Content-Type' : "application/json",
        },
        body : JSON.stringify(formData),
      })
      const data = await res.json();
      console.log("Data",data)
      if(data.status == "fail"){
        dispatch(signInFailure(data.message))
        // setLoading(false);
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/') 

    }catch(err){
      
      dispatch(signInFailure(err.message))
      // setLoading(false);
    }

  }

  console.log(formData)
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 '>
        <input id='email' type="email" placeholder='email' className='border p-3 rounded-lg' onChange={handleChange}/>
        <input id='password' type="password" placeholder='password' className='border p-3 rounded-lg' onChange={handleChange}/>
        <button disabled = {loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hiver:opacity-95 disabled:opacity-80'>{loading? 'Loading':'Sign In'}</button>
        <OAuth/>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account? </p>
        <Link to={"/sign-up"}><span className='text-blue-700'>Sign Up</span></Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
