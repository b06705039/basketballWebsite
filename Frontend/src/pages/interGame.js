import React from "react";
import InterGameDiv from "../containers/interGameDiv";
import InterGameProider from "../hooks/useInterGame_context";

const InterGame = () => {
  return (
    <InterGameProider>
      <InterGameDiv />
    </InterGameProider>
  );
};

export default InterGame;
