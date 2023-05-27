import { Button } from "@mui/material";
import React, { useState } from "react";
import { GiCoconuts } from "react-icons/gi";
import { MdOutlineInsertEmoticon } from "react-icons/md";
import { SiYourtraveldottv } from "react-icons/si";
import { useDispatch } from "react-redux";
import { addTime } from "../../redux/checkTimeSlice";
import { useNavigate } from "react-router-dom";
const About = () => {
  const navigate = useNavigate();
  const [firstDays, setFirstDay] = useState("");
  const [endDays, setEndDay] = useState("");
  const [type, setType] = useState("");
  const dispatch = useDispatch();
  const handleClick = (e) => {
    e.preventDefault();
    const setMiliTime = async () => {
      const firstDay = await new Date(firstDays).getTime();
      const endDay = await new Date(endDays).getTime();
      await dispatch(addTime({ firstDay, endDay, type }));
    };
    setMiliTime();
    navigate(`/checkday/${type}`)
  };

  return (
    <div
      className="flex  h-screen w-full bg-no-repeat bg-cover  "
      style={{
        backgroundImage:
          "url(https://hips.hearstapps.com/hmg-prod/images/champagne-beach-espiritu-santo-island-vanuatu-royalty-free-image-1655672510.jpg?crop=1.00xw:0.755xh;0,0.173xh&resize=1200:*)",
      }}
    >
      <div className=" absolute w-[800px] h-[500px] top-[100px] left-[100px] ">
        <div className="h-full w-full flex flex-col justify-center">
          <h2 className="text-white mb-8 text-2xl font-Mogra ">
            Your dream vacationa awaits you
          </h2>
          <div className="flex gap-2 ">
            <h1 className=" text-6xl bg-gradient-to-r from-[#ec008c] to-[#fc6767] text-transparent bg-clip-text font-bold font-Lobster ">
              Book now for{" "}
            </h1>
            <h1 className=" text-yellow-500 text-6xl font-bold font-Lobster ">
              20% off!
            </h1>
          </div>

          <div className=" h-[100px] bg-white mt-9 rounded-r-full gap-9 rounded-l-full flex justify-center items-center gap-2  ">
            <div className="flex flex-col gap-4 mr-7 ">
              <h1 className="flex items-center gap-2 text-xl text-yellow-700 ">
                Type <GiCoconuts size={"30px"} />{" "}
              </h1>
              <select
                className=" border-2 text-yellow-400 bg-cyan-700 rounded-lg h-8 "
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Type" selected disabled>
                  {" "}
                  Type
                </option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="penthouse">Penthouse</option>
                <option value="bungalow">Bungalow</option>
              </select>
            </div>
            <div className="flex flex-col gap-4  ">
              <h1 className="flex items-center gap-2 text-xl text-yellow-700 ">
                First day <MdOutlineInsertEmoticon size={"30px"} />{" "}
              </h1>
              <input
                type="date"
                className="focus:outline-none border-2 border-yellow-700 rounded-md "
                placeholder="Type date..."
                onChange={(e) => setFirstDay(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-4 ">
              <h1 className="flex items-center gap-2 text-xl text-yellow-700 ">
                Last day <SiYourtraveldottv size={"30px"} />{" "}
              </h1>
              <input
                type="date"
                className="focus:outline-none  border-2 border-yellow-700 rounded-md"
                placeholder="Type date..."
                onChange={(e) => setEndDay(e.target.value)}
              />
            </div>
            <div className="ml-5">
              <Button
                variant="contained"
                className="h-[40px] "
                sx={{ bgcolor: "black" }}
                onClick={handleClick}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
