import React from 'react'
import { Image } from 'antd'
import styled from 'styled-components'
import { useInterGame } from '../hooks/useInterGame'


const StyledKickout = styled(Image)`
  width: 100%;
  padding-top: 50px;
  margin: 1px;
`
const BottomDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`

const Kickout = () => {
  const { mapDict, interTeamNum } = useInterGame()

  return (
    <>
        <StyledKickout
            src={"/img/interGame" + interTeamNum.toString() + ".png"}
            preview={false}
            />
        <BottomDiv>
            {Object.entries(mapDict).map((item,index)=><p key={index}>{item[1].name || item[1].session}</p>)}
        </BottomDiv>
    </>
  )
}


export default Kickout