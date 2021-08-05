import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ACycle from "./aCycle";
// import { usePreGame } from "../hooks/usePreGame_context";
import { usePages } from "../../hooks/usePages";

const CycleDiv = styled.div`
  display: inline-flex;
  width: 100%;
  height: 100%;
  justify-content: center;
`;

const Cycles = ({ mapDict, editable }) => {
  // const { mapDict, editable } = usePreGame();
  const { id } = usePages();

  return (
    <CycleDiv>
      {id !== "administer" && editable ? (
        <React.Fragment>
          <p>未發布預賽</p>
        </React.Fragment>
      ) : (
        mapDict &&
        Object.entries(mapDict).map((sessionObject, index) => {
          return (
            <ACycle
              key={index}
              groupSession={sessionObject[0]}
              data={sessionObject[1]}
            />
          );
        })
      )}
    </CycleDiv>
  );
};

export default Cycles;
