import React from 'react'
import { List, Typography, Divider } from 'antd'

const List_component = ({titleName, dataSource, catagoryColName, contentColName, urlColName}) => {

// dataSouce must contain property:
// - createtime

  return (
    <>
        <Divider orientation="left">{titleName}</Divider>
            <List
            bordered
            dataSource={dataSource}
            renderItem={anews => (
                <List.Item>
                    {anews.createtime.slice(0,10)}
                    <Typography.Text style={{"margin":"0 10px"}} mark>[{anews[catagoryColName]}]</Typography.Text> 
                    {anews[contentColName]}
                </List.Item>
            )}
            />
    </>
  );
}

export default List_component;
