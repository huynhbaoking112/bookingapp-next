import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"

const SuggestedPlace = () => {
  const [allRoom, setAllRoom] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await fetch("http://localhost:5000/room", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAllRoom(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAll();
  }, []);

  return (
    <div className=" w-full">
      <div
        className="h-full w-full bg-no-repeat bg-cover bg-bottom"
        style={{
          backgroundImage:
            "url(https://static.vinwonders.com/2022/11/khu-du-lich-viet-nam-1.jpg)",
        }}
      >
      <h1 className="flex justify-center text-3xl font-Domine font-bold text-purple-500 h-[80px] pt-[30px] " >These are our showrooms.</h1>
      <div className=" pt-5 h-full w-full grid grid-cols-3 gap-4 pl-9 items-center pb-5  ">
     
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
    </div>
  );
};

export default SuggestedPlace;
