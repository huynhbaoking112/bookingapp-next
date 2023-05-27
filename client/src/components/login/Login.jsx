import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Input from "@mui/joy/Input";
import { Button } from "@mui/material";
import { login } from "../../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if(res.status===404){
         throw new Error("Can't found user")
      }
      const data = await res.json();
      dispatch(login(data));
      navigate("/");
    } catch (error) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2500);
    }
  };
  return (
    <div className="w-full h-screen  ">
      <div className="w-full h-full flex justify-center items-center bg-gradient-to-tr from-black to-gray-600 ">
        {error ? (
          <h1 className="text-white text-3xl font-FrankRuhlLibre ">
            Login error please try again!
          </h1>
        ) : (
          <div className="w-[400px] h-[350px] border-2 border-white rounded-lg flex flex-col justify-center ">
            <form>
              <label className="text-white ml-[20px] ">Email</label>
              <Input
                placeholder="Enter your email..."
                color="primary"
                size="md"
                variant="outlined"
                required
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  bgcolor: "transparent",
                  marginLeft: "20px",
                  marginRight: "20px",
                }}
              />
              <div className="mt-4">
                <label className="text-white ml-[20px]  ">Password</label>
                <Input
                  color="primary"
                  placeholder="Enter your password..."
                  size="md"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  sx={{
                    bgcolor: "transparent",
                    marginLeft: "20px",
                    marginRight: "20px",
                  }}
                />
              </div>
              <div className="w-full flex justify-center mt-7">
                <Button
                  variant="contained"
                  sx={{ width: "130px", bgcolor: "black" }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </div>
              <h1 className="text-white flex mt-5 justify-center gap-2">
                Don't have an account?{" "}
                <Link to="/signup" className=" text-blue-600 ">
                  Signup
                </Link>{" "}
              </h1>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
