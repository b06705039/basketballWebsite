import React from "react";
import AMember from "./aMember";
import styled from "styled-components";

const MemberFoulDiv = styled.div`
  margin: 10px 0 15px 0;
`;
const MemberFoul = ({ memberDict, setMemberDict }) => {
  return (
    <MemberFoulDiv>
      {Object.keys(memberDict).map((member, index) => (
        <AMember
          key={index}
          member={member}
          num={memberDict[member]}
          nums={memberDict}
          setNums={setMemberDict}
        />
      ))}
    </MemberFoulDiv>
  );
};

export default MemberFoul;
