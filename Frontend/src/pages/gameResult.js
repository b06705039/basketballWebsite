import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Select } from "antd";
import Cycles from "../components/drawLots/Cycles";
import Kickout from "../components/kickout";
import Table from "../components/table";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import InterGameProvider from "../hooks/useInterGame_context";
const { Option } = Select;

const ContentBackground = styled.div`
  height: 1000px;
  padding: 50px 100px;
`;
const ContentBody = styled.div`
  padding: 50px;
  border: 1px solid black;
  flex-direction: column;
  // justify-content: space-between;
  height: 100%;
`;

const StyledSelect = styled(Select)`
  margin: 10px 0;
`;

const StyledH1 = styled.h1`
  margin: 15px 30px;
`;

// const GameResult = () => {
//   const map2dict = {
//     場次結果: <Table type="matches"></Table>,
//     預賽: (
//       <>
//         {/* <StyledH1>預賽循環</StyledH1>
//         <Cycles /> */}
//       </>
//     ),
//     複賽: (
//       <InterGameProvider>
//         <StyledH1>複賽循環</StyledH1>
//         <Kickout />
//       </InterGameProvider>
//     ),
//     隊伍: <Table type="teams"></Table>,
//   };

//   const [subComponent, setSubComponent] = useState(map2dict["複賽"]);

//   function handleChange(value) {
//     setSubComponent(() => map2dict[value]);
//   }

//   return (
//     <ContentBackground
//       className="ant-layout-content"
//       style={{ height: "1000px" }}
//     >
//       <ContentBody
//         className="site-layout-content"
//         style={{ padding: "0 50px" }}
//       >
//         <Router>
//           <StyledSelect
//             defaultValue="場次結果"
//             style={{ width: 120 }}
//             onChange={handleChange}
//           >
//             {Object.entries(map2dict).map((Aroute, index) => (
//               <Option key={index} value={Aroute[0]}>
//                 {Aroute[0]}
//               </Option>
//             ))}
//           </StyledSelect>

//           <Switch>
//             {Object.entries(map2dict).map((Aroute, index) => (
//               <Route
//                 key={index}
//                 path={"/比賽結果/" + Aroute[0]}
//                 component={Aroute[1][0]}
//               />
//             ))}
//           </Switch>
//         </Router>
//       </ContentBody>
//     </ContentBackground>
//   );
// };

// export default GameResult;
