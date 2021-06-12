import React, { useContext, useState, useEffect, useRef } from 'react'
import 'antd/dist/antd.css';
import { Table, Input, Form } from 'antd'
import { usePreGame } from '../hooks/usePreGame'

const PreGameCol = [
    {
      title: '球隊',
      dataIndex: 'name',
      key: 'name',
      width: '50%',
    },
    {
      title: '場次',
      dataIndex: 'session',
      key: 'session',
      editable: true,
    },
];

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
      childNode = editing? (
          <Form.Item
            style={{ margin: 0 }}
            name={dataIndex}>
              <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
      ) : (
          <div
            className="editable-cell-value-wrap"
            style={{ paddingRight: 24 }}
            onClick={toggleEdit}>
              {children}
          </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
};

const PreGameTable = () => {
    
    const [ columns, setColumns ] = useState(PreGameCol)
    const { preGameTable, setPreGameTable } = usePreGame()
    console.log("in preGameTable", preGameTable)

    const handleSave = (row) => {
        const newData = JSON.parse(JSON.stringify(preGameTable))
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setPreGameTable(()=>newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };
    const Columns = columns.map((col) => {
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
                handleSave: handleSave,
            }),
        };
    });

    return (
        <>
            <Table
                components={components}
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={preGameTable}
                columns={Columns}
            />
        </>
    )
}

export default PreGameTable
