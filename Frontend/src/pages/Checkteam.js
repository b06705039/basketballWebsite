import React, { useContext, useState, useEffect, useRef } from "react";
import { message, Table, Input, Button, Form, Select } from "antd";
import PlayerTable from "../components/PlayerDBtable";
import { Team } from "../axios";

const { Option } = Select;

async function callAsync(func) {
  var x = await func();
  console.log(x);
  return x;
}

const EditableContext = React.createContext(null);
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
  handleModifiedteam,
  range,
  isbutton,
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
      handleModifiedteam(record.key);
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    if (editing) {
      if (range) {
        childNode = (
          <Form.Item
            className="editable-cell-value-wrap"
            style={{
              paddingRight: 24,
            }}
            name={dataIndex}
            hasFeedback
            rules={[{ required: true, message: "Please select!" }]}
          >
            <Select placeholder="Please select" ref={inputRef} onChange={save}>
              {range.map((item) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
        );
      } else {
        childNode = (
          <Form.Item
            style={{
              margin: 0,
            }}
            name={dataIndex}
            rules={[{ required: true, message: `${title} is required.` }]}
          >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        );
      }
    } else {
      childNode = (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
  }
  return <td {...restProps}>{childNode}</td>;
};

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: "隊伍名",
        dataIndex: "name",
        width: "20%",
        editable: false,
        range: false,
      },
      {
        title: "系所",
        dataIndex: "department",
        width: "20%",
        editable: false,
        range: false,
      },
      {
        title: "聯絡人",
        dataIndex: "owner",
        width: "30%",
        editable: false,
        range: false,
      },
      {
        title: "球員名單",
        dataIndex: "squad",
        range: false,
        align: "center",
        render: (_, record) => (
          <Button type="primary" onClick={() => this.handleVisible(record.key)}>
            檢視
          </Button>
        ),
      },
      {
        title: "繳費狀態",
        dataIndex: "status",
        // editable: true,
        align: "middle",
        render: (_, record) => (
          <Form.Item
            // className="editable-cell-value-wrap"
            style={{
              paddingTop: 25,
            }}
            hasFeedback
            rules={[{ required: true, message: "Please select!" }]}
          >
            <Select
              defaultValue={record.status}
              placeholder="Please select"
              onChange={(value) => {
                record.status = value;
                this.handleSave(record);
              }}
            >
              {this.state.range.map((item) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
        ),
      },
    ];
    let data = [];
    this.state = {
      dataSource: data,
      count: data.length + 1,
      visible: true,
      team_id: null,
      modify_key: [],
      create_key: [],
      range: ["已繳費", "未繳費", "未報名"],
    };
  }

  async componentDidMount() {
    let data = await callAsync(Team.GetALLTeam);
    for (let i = 0; i < data.length; i++) {
      data[i].key = i;
    }
    this.setState({ dataSource: data, count: data.length });
    if (this.props.adim === "team") {
      let team_id = await Team.GetTeamIDbyUser(this.props.user_id);
      this.setState((state, props) => {
        return { team_id };
      });
    }
  }

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    const modify_key = [...this.state.modify_key];
    const create_key = [...this.state.create_key];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
      modify_key: modify_key.filter((item) => item !== key),
      create_key: create_key.filter((item) => item !== key),
    });
  };

  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: "未指定",
      owner: "未指定",
      status: "未繳費",
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = async (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    let team_id = row.team_id;
    let status = row.status;
    let result = await Team.UpdatePaid(team_id, status);
    console.log(result);
    if (result.info.includes("[Error]")) {
      message.info("更新失敗!");
    } else {
      message.info("更新成功!");
    }
    this.setState({
      dataSource: newData,
    });
  };

  handleModifiedteam = (key) => {
    if (
      !this.state.modify_key.includes(key) &&
      !this.state.create_key.includes(key)
    ) {
      this.state.modify_key.push(key);
      this.setState({ modify_key: this.state.modify_key });
    }
  };

  handleCreateteam = (key) => {
    this.state.create_key.push(key);
    this.setState({ create_key: this.state.create_key });
  };

  handleVisible = (key) => {
    const dataSource = [...this.state.dataSource];
    const index = dataSource.findIndex((item) => key === item.key);
    console.log(index);
    let team_id = dataSource[index].team_id;
    console.log(team_id);
    this.setState({ team_id, visible: !this.state.visible });
  };

  handleBackpage = () => {
    this.setState({ visible: !this.state.visible });
  };

  saveDB = async () => {
    const dataSource = [...this.state.dataSource];
    let modify_data = dataSource.filter((item) =>
      this.state.modify_key.includes(item.key)
    );
    let create_data = dataSource.filter((item) =>
      this.state.modify_key.includes(item.key)
    );
    for (let i = 0; i < modify_data.length; i++) {
      let data = modify_data[i];
      await Team.Create(data.name, data.department);
    }
    for (let j = 0; j < create_data.length; j++) {
      let data = create_data[j];
      await Team.update(data.name, data.department);
    }
  };

  render() {
    // console.log(gettoken())
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
          range: col.range,
          handleSave: this.handleSave,
          handleModifiedteam: this.handleModifiedteam,
        }),
      };
    });
    if (this.props.adim === "administer") {
      if (this.state.visible) {
        return (
          <div>
            <Table
              components={components}
              rowClassName={() => "editable-row"}
              bordered
              dataSource={dataSource}
              columns={columns}
            />
          </div>
        );
      } else {
        return (
          <div>
            <PlayerTable
              backpage={this.handleBackpage}
              team_id={this.state.team_id}
              adim={this.props.adim}
            />
          </div>
        );
      }
    } else if (this.props.adim === "team") {
      if (this.state.team_id === null) {
        return <div>loading</div>;
      }
      return (
        <div>
          <PlayerTable
            backpage={this.handleBackpage}
            team_id={this.state.team_id}
            adim={this.props.adim}
          />
        </div>
      );
    }
  }
}
export default EditableTable;
// ReactDOM.render(<EditableTable />, mountNode);
