import React from "react";
import styled from "styled-components";

const ContentBackground = styled.div`
  height: 1000px;
  padding: 50px 100px;
`;
const ContentBody = styled.div`
  padding: 50px;
  border: 1px solid black;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function pageFrame({ children }) {
  return (
    <ContentBackground>
      <ContentBody>{children}</ContentBody>
    </ContentBackground>
  );
}
