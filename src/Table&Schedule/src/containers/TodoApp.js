import React, { Component } from "react";
import Table from '../components/Table'
import Schedule from './Schedule'

class TodoApp extends Component {
    constructor(props){
        super(props);
        this.state = {
            columns: ['A','B','C','D','E'],
            objects: {
                1:[1,2,3,4,5],
                2:[2,3,4,5,6],
                3:[3,4,5,6,7]
            }
        }
    }
    render(){
        return (
            <>
              <Table columns={this.state.columns} object={this.state.objects}></Table>
              <Schedule></Schedule>
            </>
        );
    }
}


export default TodoApp;
