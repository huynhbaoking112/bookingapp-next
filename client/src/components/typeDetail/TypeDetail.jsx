import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const TypeDetail = () => {
  const navigate = useNavigate();
  const [room, setRoom] = useState({});
  const token = useSelector((state) => state.auth.token);
  const id = useParams().id;
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [checkError, setCheckError] = useState(false);
  const [checkSuccess, setCheckSuccess] = useState(false);

  useEffect(() => {
    const fetchWithId = async () => {
      try {
        const res = await fetch(`http://localhost:5000/room/find/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        const data = await res.json()
        setRoom(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchWithId();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const miliTimeFirst = await new Date(firstDay).getTime()
    const miliTimeLast = await new Date(lastDay).getTime()
    let arrayli = [miliTimeFirst, miliTimeLast]
    const even = (element) =>
      (element[0] <= miliTimeFirst && miliTimeFirst <= element[1]) ||
      (element[0] <= miliTimeLast && miliTimeLast <= element[1])
    const check = await room.unavailableDates.some(even)
    console.log(check)
    console.log(miliTimeFirst)
    console.log(arrayli)
    if (!check) {
      try {
        const res = await fetch(
          `http://localhost:5000/room/bookRoom/${room._id}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ arrayli }),
          }
        );
        const data = await res.json();
        setCheckSuccess(true);
        setTimeout(() => {
          setCheckSuccess(false);
          navigate("/");
        }, 2500);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    } else {
      setCheckError(true);
      setTimeout(() => {
        setCheckError(false);
      }, 2500);
    }
  };

  return (
    <div className="w-full  pt-[100px] pb-[50px] px-[100px] ">
      {checkError && (
        <div className=" absolute h-[100px] w-[200px] flex justify-center items-center rounded-lg bg-red-400  ">
          <h1 className="text-white ">
            Date already booked please choose another date😢
          </h1>
        </div>
      )}
      {checkSuccess && (
        <div className=" absolute h-[100px] w-[200px] flex justify-center items-center rounded-lg bg-green-400  ">
          <h1 className="text-white ">Booking success😊</h1>
        </div>
      )}
      <div className="flex w-full h-full justify-between px-[50px] ">
        <img
          className="h-full w-[400px]"
          src={`http://localhost:5000/images/${room.photo}`}
        />
        <div className="h-[500px] w-[400px] border-2 border-yellow-600 rounded-xl flex flex-col ">
          <form onSubmit={handleSubmit}>
            <h1 className="flex justify-center text-yellow-800 text-2xl font-Domine mt-2 pb-2 ">
              {room.title}
            </h1>
            <h1 className="gap-9 flex text-yellow-600 text-xl font-bold font-Lobster pl-5 py-3 ">
              Type : <span>{room.type}</span>
            </h1>
            <h1 className="gap-9 flex text-yellow-600 text-xl font-bold font-Lobster pl-5 py-3 ">
              Country : <span>{room.country}</span>
            </h1>
            <h1 className="gap-9 flex text-yellow-600 text-xl font-bold font-Lobster pl-5 py-3 ">
              Review : <span>{room.review}⭐</span>
            </h1>
            <h1 className="gap-9 flex text-yellow-600 text-xl font-bold font-Lobster pl-5 py-3 ">
              Price : <span>{room.price}💲</span>
            </h1>
            <div className="flex justify-center items-center gap-2 mt-7">
              <h1 className="text-yellow-600 text-xl font-bold font-Lobster">
                FirstDay:
              </h1>
              <Input
                type="Date"
                color="warning"
                variant="soft"
                required
                onChange={(e) => setFirstDay(e.target.value)}
              />
            </div>
            <div className="flex justify-center items-center gap-2 mt-7">
              <h1 className="text-yellow-600 text-xl font-bold font-Lobster">
                LastDay:
              </h1>
              <Input
                type="Date"
                color="warning"
                variant="soft"
                required
                onChange={(e) => setLastDay(e.target.value)}
              />
            </div>
            <div className="flex justify-center py-6 ">
              <Button type="Submit" color="success" sx={{ width: "130px" }}>
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TypeDetail;
