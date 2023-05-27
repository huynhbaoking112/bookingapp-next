import React from 'react'
import {BsFacebook} from "react-icons/bs"
import {AiFillTwitterCircle} from "react-icons/ai"
import {MdEmail} from "react-icons/md"

const Footer = () => {
  return (
    <div className='h-[300px] w-[full]' >
        <div className='w-full h-full flex  gap-5 bg-gray-400 pl-[30px] ' >
            <div className='w-[30%] flex flex-col pt-[30px] ' >
                <h1 className='flex  items-center h-[50px] font-bold text-white' >FAQ</h1>
                <h1 className='flex  items-center h-[50px] font-bold text-white' >Where we are based </h1>
                <h1 className='flex  items-center h-[50px] font-bold text-white' >How we operate </h1>
                <h1 className='flex  items-center h-[50px] font-bold text-white' >Refund policy </h1>
            </div>
            <div className='w-[30%] flex flex-col pt-[30px] ' >
                <h1 className='flex  items-center h-[50px] font-bold text-white' >Contacts</h1>
                <h1 className='flex gap-2   items-center h-[50px] font-bold text-white  ' > <BsFacebook size={"25px"} /> https://www.facebook.com/</h1>
                <h1 className='flex gap-2  items-center h-[50px] font-bold text-white' > <AiFillTwitterCircle size={"25px"}/> https://twitter.com/ </h1>
                <h1 className='flex  items-center h-[50px] font-bold gap-2 text-white' > <MdEmail size={"25px"}/>huynhbaoking@gmail.com </h1>
            </div>
            <div className='w-[30%] flex flex-col pt-[30px] ' >
                <h1 className='flex  items-center h-[50px] font-bold text-white' >Privacy Policy</h1>
                <p className='text-white' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi architecto ea iste similique nesciunt ipsam iusto inventore corporis omnis aut, soluta neque voluptas nihil labore, aspernatur rem vitae deserunt assumenda</p>
            </div>
            </div>
         
            
            </div>
 

  )
}

export default Footer