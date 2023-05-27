import React from "react";
import About from "../about/About";
import Types from "../types/Types";
import SuggestedPlaces from "../suggestedPlaces/SuggestedPlace";
const Home = () => {
  return (
    <div>
      <About />
      <Types />
      <SuggestedPlaces />
    </div>
  );
};

export default Home;
