import React from "react";
import PreGameDiv from "../containers/preGameDiv";
import PreGameProvider from "../hooks/usePreGame_context";

const PreGame = () => {
  return (
    <PreGameProvider>
      <PreGameDiv />
    </PreGameProvider>
  );
};

export default PreGame;
