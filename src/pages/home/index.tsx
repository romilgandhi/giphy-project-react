import React from "react";
import DisplayGiphy from "components/DisplayGiphy";

const Home = () => {
  return (
    <div className="p-home">
      {/* Functional component  */}
      <DisplayGiphy />
      {/* Class component */}
      {/* <ClickMeClass /> */}
    </div>
  );
};

export default Home;
