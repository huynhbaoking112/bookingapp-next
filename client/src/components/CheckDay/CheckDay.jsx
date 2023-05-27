import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

const CheckDay = () => {
    const {firstDay,endDay}=useSelector((state)=>state.time)
    const {type}=useParams()
    const [allRoom,setAllRoom]=useState([])
    useEffect(()=>{
        const fetchData=async()=>{
            try {
                const res= await fetch(`http://localhost:5000/room?type=${type}`)
                const data=await res.json()
                console.log(data);
                let phuhop=[]
                await data.map((list)=>{
                    const check=  list.unavailableDates.some((element) =>
                    (element[0] <= firstDay && firstDay <= element[1]) ||
                    (element[0] <= endDay && endDay <= element[1]))
                    if(!check){
                        phuhop.push(list)
                    }
                })
                setAllRoom(phuhop)

            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    },[])

  return (
    <div className='w-full pt-[100px] pl-[50px] bg-gradient-to-b from-black to-gray-700 pb-9  ' >
    <h1 className='text-white flex justify-center text-2xl font-InstrumentSerif my-[30px]' >💕This is {type} ❤️</h1>
        <div className='w-full grid grid-cols-3 gap-4  ' >

        {allRoom.map((room,id)=>{
            return <Link  key={id} to={`/typeDetail/${room._id}`} >

             <div className="h-[370px] w-[300px] bg-white rounded-lg flex flex-col shadow-lg shadow-yellow-200 hover:shadow-xl hover:shadow-blue-500 hover:scale-105 duration-300 cursor-pointer mb-3 " >
              <div className="h-[270px] w-full rounded-lg " >
                  <img className="h-full w-full rounded-lg " src={ `http://localhost:5000/images/${room.photo}`} />
              </div>
              <div className="w-full flex justify-between px-[70px] pt-3 pb-3 " >
                  <h1 className="font-bold font-Domine text-cyan-600" >{room.type}:</h1>
                  <h1 className="font-bold font-Lobster text-green-600" >{room.title}</h1>
                </div>
              <div className="flex justify-between px-[40px] pt-1"  >
                  <h1 className=" font-Pacifico  " >country: {room.country} </h1>
                  <h1 className=" font-Pacifico " >review: {room.review}⭐</h1>
              </div>
            </div>
            </Link> 
          })}
        </div>
    </div>
  )
}

export default CheckDay