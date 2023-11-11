import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useState,useEffect } from 'react';
import { useRef } from 'react'
import {getDownloadURL, getStorage,ref, uploadBytesResumable}from 'firebase/storage'
import { app } from '../firebase';
export default function Profile() {
  const fileRef = useRef(null); 
  const {currentUser} = useSelector(state=>state.user)
  const [file,setFile] = useState(undefined)
  const [filePercentage,setFilePercentage] = useState(0);
  const[fileUploadError,setFileUploadError] = useState(false);
  const [formData,setFormData] = useState({});
  console.log(file)
  console.log(filePercentage)
  console.log("FormData: ",formData)
  const handleFileUpload = (file)=>{
    const storage = getStorage(app);
    const filename = new Date().getTime() + file.name;
    const storageRef = ref(storage,filename)
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',
    (snapshot)=>{
      const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      setFilePercentage(Math.round(progress))
    }
    ,(error)=>{
      setFileUploadError(true);
    },()=>{
      getDownloadURL(uploadTask.snapshot.ref).then(
        (downloadURL)=>{
          setFormData({...formData,avatar:downloadURL});
        }
      )
    });
  }
  useEffect(()=>{
    if(file){
      handleFileUpload(file)
    }
  },[file])
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept = "image/*" onChange={e=>setFile(e.target.files[0])}/>
        <img onClick={()=>fileRef.current.click()} className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2" src = {formData.avatar||currentUser.avatar} alt="profile"/>
        <p className='text-center'>
          {fileUploadError ? 
         ( <span className='text-red-700'>Error Image Upload(Must be less than 2mb) </span> ): (filePercentage > 0 && filePercentage < 100) ? <span className="text-slate-700">{`Uploading ${filePercentage}` }</span> 
            : (filePercentage ===100) ? <span className='text-green-700'> Image Successfully Uploaded</span>: ""
        }
        </p>
        <input id="username" className='border p-3 rounded-lg' type="text" placeholder="username" />
        <input id="email" className='border p-3 rounded-lg' type="email" placeholder="email" />
        <input id="password" className='border p-3 rounded-lg' type="password" placeholder="password" />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>Update</button>

      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>

      </div>

    </div>
  )
}
