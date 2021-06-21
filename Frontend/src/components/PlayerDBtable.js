import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { Player } from '../axios'

const EditableContext = React.createContext(null);

async function callAsync(func, params) {
  console.log(params)
  var x = await func(params);
  console.log(x)
  return x;
}

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    let isEditable = true
    if(props.adim == 'administer'){
      isEditable = false
    }
    if(isEditable){
      this.columns = [
        {
          title: '背號',
          dataIndex: 'number',
          width: '30%',
          editable: isEditable,
        },
        {
          title: '球員名',
          dataIndex: 'name',
          editable: isEditable
        },
        {
          title: '學號',
          dataIndex: 'student_id',
          editable: isEditable
        },
        {
          title: '年級',
          dataIndex: 'grade',
          editable: isEditable
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (_, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record)}>
                <a>Delete</a>
              </Popconfirm>
            ) : null,
        },
      ];
    }
    else{
      this.columns = [
        {
          title: '背號',
          dataIndex: 'number',
          width: '30%',
          editable: isEditable,
        },
        {
          title: '球員名',
          dataIndex: 'name',
          editable: isEditable
        },
        {
          title: '學號',
          dataIndex: 'student_id',
          editable: isEditable
        },
        {
          title: '年級',
          dataIndex: 'grade',
          editable: isEditable
        }
      ];
    };
    
    this.state = {
      dataSource: [],
      count: 0,
      update_player_id: [],
      create_key: []
    };
  }

  async componentDidMount(){
    let data = await Player.GetAllPlayerByTeamID(this.props.team_id);
    for(let i = 0; i < data.length; i ++){
      data[i].key = i
    }
    this.setState({dataSource:data, count:data.length})
    console.log(this.state)
  }

  handleDelete = async (record) => {
    const dataSource = [...this.state.dataSource];
    let delete_player_id = record.player_id
    let delete_data = dataSource.filter((item) => item.player_id == delete_player_id)
    let data = delete_data[0]
    console.log(data)
    let result = await Player.Delete(data)
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== record.key),
    });
  };

  handleAdd = () => {
    console.log(123)
    const { count, dataSource } = this.state;
    console.log(count)
    console.log(dataSource)
    const newData = {
      key: count,
      name: `王大明`,
      number: '77',
      team_id: this.props.team_id,
      student_id: `B09123456`,
      grade: 1
    };
    let create_key_tmp = [...this.state.create_key]
    create_key_tmp.push(count)
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
      create_key: create_key_tmp
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    let update_player_id = [...this.state.update_player_id]
    if(!update_player_id.includes(row.player_id)){
      update_player_id.push(row.player_id)
    }
    this.setState({
      dataSource: newData,
      update_player_id
    });
  };

  saveDB = async () => {
    const dataSource = [...this.state.dataSource]
    console.log(dataSource)
    let update_data = dataSource.filter((item) => this.state.update_player_id.includes(item.player_id))
    let create_data = dataSource.filter((item) => this.state.create_key.includes(item.key))
    // let delete_data = dataSource.filter((item) => this.state.delete_player_id.includes(item.player_id))
    console.log(update_data)
    for(let i = 0; i < update_data.length ; i++){
      let data = update_data[i]
      let result = await Player.Update(data)
    }
    for(let j = 0; j < create_data.length ; j++){
      let data = create_data[j]
      let result = await Player.Create(data)
    }
    // for(let k = 0; k < delete_data.length ; k++){
    //   let data = delete_data[k]
    //   console.log(data)
    //   let result = await Player.Delete({data})
    // }
  }

  render() {
    console.log(this.props)
    console.log(this.state)
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    if(this.props.adim == 'administer'){
      return(<div>
        <Button
          onClick={this.props.backpage}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          回上頁
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>)
    }
    return (
      <div>
        <Button
          onClick={this.handleAdd}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          增加球員
        </Button>
        <Button
          onClick={this.saveDB}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          儲存結果
        </Button>
        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable; 