import React from 'react'
import { List, Typography, Divider, Button } from 'antd'
import styled from 'styled-components'


const StyledButton = styled(Button)`
    height: 33px;
    background-color: #bb6b72;
    border-radius: 10px;
    float: right;
    display: flex;
    margin:0;
`

const StyledItem = styled(List.Item)`
  padding:0;
  height: 47px;
  float: center;
`

const StyledA = styled.a`
  color: black;
  text-decoration: underline;
`

const List_component = ({titleName, dataSource, catagoryColName, contentColName, urlColName, edit, generateModal}) => {

// dataSouce must contain property:
// - createtime

  return (
    <React.Fragment>
        <Divider orientation="left">{titleName}</Divider>
            <List
            bordered
            dataSource={dataSource}
            renderItem={anews => (
                <React.Fragment>
                  <StyledItem>
                      <div>
                        {anews.createtime.slice(0,10)}
                        <Typography.Text style={{"margin":"0 10px"}} mark>[{anews[catagoryColName]}]</Typography.Text> 
                        <StyledA href={anews[urlColName]}>{anews[contentColName]}</StyledA>
                      </div>
                      {edit && <StyledButton onClick={()=>generateModal(anews['post_id'])}>刪除</StyledButton>}
                  </StyledItem>
                  
                </React.Fragment>
            )}
            />
    </React.Fragment>
  );
}

export default List_component;
