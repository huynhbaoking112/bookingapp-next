import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Types = () => {
  
  const [types, setTypes] = useState([]);
  const token =useSelector((state)=>state.auth.token)
  const pic=["https://i.pinimg.com/474x/68/67/26/686726575a853e3f1af6311e98831048.jpg","https://i.pinimg.com/474x/48/75/dd/4875dda53c2a675473a1aa3228af19b2.jpg","https://i.pinimg.com/474x/27/1a/2f/271a2f37461f53e877b90a5696261103.jpg","https://i.pinimg.com/474x/37/f2/d0/37f2d0dc9a23f912c56ad2fd84bdb5e0.jpg"]
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const data = await fetch("http://localhost:5000/room/find/types", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((res) => res.json());
        setTypes(Object.entries(data));
      
      } catch (error) {
        console.log(error);
      }
    };
    fetchTypes();
  }, []);
  return (
    <div className="h-screen w-full" id="two" >
      <div
        className="h-full w-full bg-no-repeat bg-cover bg-bottom flex flex-col items-center justify-center "
        style={{
          backgroundImage:
            "url(https://i0.wp.com/theimaginativeconservative.org/wp-content/uploads/2017/07/beach-4481919_1280.jpeg?ssl=1)",
        }}
      >
        <h1 className="text-3xl text-white font-Lobster ">
          Here is the number of types of our accommodation.
        </h1>
        <div className="flex justify-center gap-[130px] w-full h-[300px]">
          {types.map(([name, value],id) => {
            return (
              <div
                key={name + value}
                className="flex flex-col justify-center   "
              >
                <Link to={`/types/${name}`} >
                  <div className="w-[180px] h-[180px] rounded-full mb-3 ">
                    <img
                      className="w-full h-full rounded-full hover:scale-105 duration-300 shadow-lg  shadow-yellow-300 hover:shadow-xl hover:shadow-yellow-400 cursor-pointer "
                      src={pic[id]}
                    />
                  </div>
                </Link>
                <h1 className="text-white text-xl font-Domine flex justify-center mt-4 ">
                  {name}: {value}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Types;
