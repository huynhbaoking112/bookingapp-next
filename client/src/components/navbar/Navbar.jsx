import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./../../redux/authSlice.js";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };
  
 

  return (
    <div className="w-full h-[70px] fixed z-10  ">
      <div className="h-full w-full items-center flex justify-between px-9 bg-gradient-to-r from-[#79E0EE] to-gray-900 ">
        <Link to="/">
          <h1 className=" font-bold text-3xl bg-gradient-to-r from-[#cc2b5e] to-[#753a88] text-transparent bg-clip-text font-Lobster ">
            TravelBooking
          </h1>
        </Link>
        <div className="flex gap-5">
          <Link to="/">
            <h2 className=" text-gray-400 text-2xl font-BebasNeue font-bold  hover:text-white duration-300 hover:scale-105 duration-300 ">
              Home
            </h2>
          </Link>
          <Link to="/">
            <h2 className=" text-gray-400 text-2xl font-BebasNeue font-bold  hover:text-white duration-300 hover:scale-105 duration-300 ">
              About
            </h2>
          </Link>
          <Link to="/">
        

            <h2  className=" text-gray-400 text-2xl font-BebasNeue font-bold  hover:text-white duration-300 hover:scale-105 duration-300 ">
              Services
            </h2>
       
          </Link>
          <Link to="/">
            <h2 className=" text-gray-400 text-2xl font-BebasNeue font-bold  hover:text-white duration-300 hover:scale-105 duration-300 ">
              Suggested
            </h2>
          </Link>
        </div>
        {!user ? (
          <div className="flex gap-2 ">
            <Button
              variant="contained"
              sx={{ bgcolor: "black" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "black" }}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </div>
        ) : (
          <div className="flex gap-2 ">
            <h1 className="text-white font-bold mr-2 flex items-center ">{user.username}</h1>
            {user.isAdmin&&<Button variant="contained" sx={{ bgcolor: "black" }} onClick={()=>{navigate("/create")}}  >
            Create
          </Button>}
            <Button
              variant="contained"
              sx={{ bgcolor: "black" }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
