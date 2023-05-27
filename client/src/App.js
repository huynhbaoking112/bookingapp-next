import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";
import Home from "./components/home/Home.jsx";
import Create from "./components/create/Create.jsx";
import Login from "./components/login/Login.jsx";
import Signup from "./components/signup/Signup.jsx";
import Type from "./components/type/Type.jsx";
import TypeDetail from "./components/typeDetail/TypeDetail.jsx";
import { useSelector } from "react-redux";
import CheckDay from "./components/CheckDay/CheckDay.jsx";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/types/:type" element={<Type />} />
        <Route path="/typeDetail/:id" element={<TypeDetail />} />
        <Route path="/checkday/:type" element={<CheckDay />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
