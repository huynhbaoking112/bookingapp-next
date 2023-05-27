import React, { useState } from 'react'
import Input from '@mui/joy/Input';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Create = () => {
  const token=useSelector(state=>state.auth.token)
  const [title,setTitle]=useState("")
  const [desc,setDes]=useState("")
  const [price,setPrice]=useState(0)
  const [country,setCountry]=useState("")
  const [img,setImg]=useState(null)
  const [type,setType]=useState("")
  const [review,setReview]=useState(0)
  const navigate=useNavigate()

  const handleChange=(e)=>{
      setImg(e.target.files[0])
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();

      let filename = null;
      if (img) {
        filename = Date.now() + img.name;
        // for first img
        formData.append("filename", filename);
        formData.append("image", img);

        await fetch(`http://localhost:5000/upload/image`, {
          method: "POST",
          body: formData,
          headers:{
            "Authorization": `Bearer ${token}`
          }
        });

      // upload product and navigate to product
      const res = await fetch("http://localhost:5000/room", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          country,
          type,
          photo: filename,
          price,
          review,
        }),
      });
      const room = await res.json();
      navigate(`/typeDetail/${room?._id}`);
    }

    } catch (error) {
      console.error(error);
    }
  }

  return (
   <div className='pt-5 w-full' >
   <div className='h-full w-full flex   justify-center items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500   ' >
      <div className='h-[530px] w-[450px] mt-[70px] border-2 rounded-xl bg-transparent mb-5  ' >
          <form encType="multipart/form-data" onSubmit={handleSubmit} >
          <label className='text-white font-Lobster ml-[20px]' >Title</label>
          <Input className='mx-[20px]' color="success" variant="outlined" required placeholder='Title...' onChange={(e)=>{setTitle(e.target.value)}} />
          <label className='text-white font-Lobster ml-[20px]'  >Des</label>
          <Input className='mx-[20px]' color="success" variant="outlined" onChange={(e)=>{setDes(e.target.value)}} required placeholder='Des...' />
          <label className='text-white font-Lobster ml-[20px]' onChange={(e)=>{setPrice(e.target.value)}} >Price</label>
          <Input className='mx-[20px]' color="success" variant="outlined" type='Number' required placeholder='Price...' />
          <label className='text-white font-Lobster ml-[20px]' >Country</label>
          <Input className='mx-[20px]' color="success" variant="outlined" required onChange={(e)=>{setCountry(e.target.value)}} placeholder='Country...' />
          <label className='text-white font-Lobster ml-[20px]' >Photo</label>
          <Input className='mx-[20px]'  filename="firstImg" color="success" onChange={handleChange} variant="outlined" required type='file' placeholder='Title...' />
          <label className='text-white font-Lobster ml-[20px]' >Type</label>
          <Input className='mx-[20px]' color="success" variant="outlined" required onChange={(e)=>{setType(e.target.value)}}  placeholder='Type...' />
          <label className='text-white font-Lobster ml-[20px]' >Review</label>
          <Input className='mx-[20px]' color="success" variant="outlined" onChange={(e)=>{setReview(e.target.value)}} required type='Number' placeholder='Review...' />
          <div className='flex justify-center mt-2' >
            <Button type='Submit' variant='contained' sx={{bgcolor:"black",width:"120px"}} >Submit</Button>
          </div>
          </form>
      </div>
   </div>

   </div>
  )
}

export default Create