import React, { useContext, useState, useEffect, useRef } from "react";
import { message, Table, Input, Button, Popconfirm, Form } from "antd";
import { Player } from "../axios";

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
      console.log("Save failed:", errInfo);
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
    let isEditable = true;
    if (props.adim === "administer") {
      isEditable = false;
    }
    if (isEditable) {
      this.columns = [
        {
          title: "背號",
          dataIndex: "number",
          width: "30%",
          editable: isEditable,
        },
        {
          title: "球員名",
          dataIndex: "name",
          editable: isEditable,
        },
        {
          title: "學號",
          dataIndex: "student_id",
          editable: isEditable,
        },
        {
          title: "年級",
          dataIndex: "grade",
          editable: isEditable,
        },
        {
          title: "操作",
          dataIndex: "operation",
          render: (_, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm
                title="確定要刪除嗎?"
                onConfirm={() => this.handleDelete(record)}
              >
                <a href="\#">刪除</a>
              </Popconfirm>
            ) : null,
        },
      ];
    } else {
      this.columns = [
        {
          title: "背號",
          dataIndex: "number",
          width: "30%",
          editable: isEditable,
        },
        {
          title: "球員名",
          dataIndex: "name",
          editable: isEditable,
        },
        {
          title: "學號",
          dataIndex: "student_id",
          editable: isEditable,
        },
        {
          title: "年級",
          dataIndex: "grade",
          editable: isEditable,
        },
      ];
    }

    this.state = {
      dataSource: [],
      count: 0,
      update_player_key: [],
      create_key: [],
      max_number: 0,
    };
  }

  async componentDidMount() {
    let data = await Player.GetAllPlayerByTeamID(this.props.team_id);
    let max_number = this.state.max_number;
    for (let i = 0; i < data.length; i++) {
      data[i].key = i;
      if (data[i].number > max_number) {
        max_number = data[i].number;
      }
    }
    max_number = max_number + 1;
    this.setState({ dataSource: data, count: data.length, max_number });
    console.log(this.state);
  }

  handleDelete = async (record) => {
    const dataSource = [...this.state.dataSource];
    let delete_player_id = record.player_id;
    let delete_data = dataSource.filter(
      (item) => item.player_id === delete_player_id
    );
    let data = delete_data[0];
    console.log(data);
    await Player.Delete(data);
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== record.key),
    });
  };

  deleteAll = async () => {
    let result = await Player.DeleteAllPlayerByTeamID(this.props.team_id);
    console.log(result);
    if (result.includes("[Error]")) {
      message.info("刪除失敗!");
    } else {
      this.setState({
        dataSource: [],
        count: 0,
        update_player_id: [],
        create_key: [],
        max_number: 0,
      });
      message.info("刪除成功!");
    }
  };

  handleAdd = () => {
    const { count, dataSource, max_number } = this.state;
    console.log(count);
    console.log(dataSource);
    const newData = {
      key: count,
      name: `王大明`,
      number: max_number,
      team_id: this.props.team_id,
      student_id: `B09123456`,
      grade: 1,
    };
    let create_key_tmp = [...this.state.create_key];
    create_key_tmp.push(count);
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
      create_key: create_key_tmp,
      max_number: max_number + 1,
    });
  };

  handleSave = (row) => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    let update_player_key = [...this.state.update_player_key];
    if (
      !update_player_key.includes(row.key) &&
      !this.state.create_key.includes(row.key)
    ) {
      update_player_key.push(row.key);
    }
    this.setState({
      dataSource: newData,
      update_player_key,
    });
  };

  saveDB = async () => {
    const dataSource = [...this.state.dataSource];
    console.log(dataSource);
    let update_data = dataSource.filter((item) =>
      this.state.update_player_key.includes(item.key)
    );
    let create_data = dataSource.filter((item) =>
      this.state.create_key.includes(item.key)
    );
    // let delete_data = dataSource.filter((item) => this.state.delete_player_id.includes(item.player_id))
    console.log(update_data);
    let flag = false;
    for (let i = 0; i < update_data.length; i++) {
      let data = update_data[i];
      let result = await Player.Update(data);
      if (result.includes("[Error]")) {
        flag = true;
      }
    }
    for (let j = 0; j < create_data.length; j++) {
      let data = create_data[j];
      let { info, player_id } = await Player.Create(data);
      if (info.includes("[Error]")) {
        flag = true;
      } else {
        let index = dataSource.findIndex((x) => x.key === data.key);
        dataSource[index].player_id = player_id;
      }
    }
    if (!flag) {
      this.setState(dataSource);
      message.info("更新成功!");
    } else {
      message.info("更新失敗!");
    }
  };

  render() {
    console.log(this.props);
    console.log(this.state);
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
    if (this.props.adim === "administer") {
      return (
        <div>
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
            rowClassName={() => "editable-row"}
            bordered
            dataSource={dataSource}
            columns={columns}
          />
        </div>
      );
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
        <Button
          onClick={this.deleteAll}
          type="primary"
          style={{
            marginBottom: 16,
          }}
        >
          刪除全部
        </Button>
        <Table
          components={components}
          rowClassName={() => "editable-row"}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;
