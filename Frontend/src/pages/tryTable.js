import React, { useContext, useState, useEffect, useRef } from 'react';
import 'antd/dist/antd.css';
import { Table, Input, Form } from 'antd';
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
      this.columns = [
        {
          title: 'name',
          dataIndex: 'name',
          width: '30%',
          editable: true,
        },
        {
          title: 'age',
          dataIndex: 'age',
        }
      ];
      this.state = {
        dataSource: [
          {
            key: '0',
            name: 'Edward King 0',
          },
          {
            key: '1',
            name: 'Edward King 1',
          },
        ],
        count: 2,
      };
    }
  
    
    handleSave = (row) => {
      const newData = [...this.state.dataSource];
      const index = newData.findIndex((item) => row.key === item.key);
      const item = newData[index];
      newData.splice(index, 1, { ...item, ...row });
      this.setState({
        dataSource: newData,
      });
    };
  
    render() {
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
      return (
        <div>
          
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


// const Default = () => {
//     return(
//         <div className="ant-layout-content" style={{ height: '1000px'}}>
//             <div className="site-layout-content" style={{ padding: '0 50px'}}>
//                 <EditableTable />
//             </div>
//         </div>
//     )
// }


export default EditableTable



