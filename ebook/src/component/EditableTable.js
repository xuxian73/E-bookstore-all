import React, {useState} from 'react';
import {Table, Input, InputNumber, Space, Popconfirm, Form, Typography} from 'antd';
import EditableCell from '../component/EditableCell'
import AddBook from '../component/AddBook'

const EditableTable = props => {
    const [form] = Form.useForm();
    const [data, setData] = useState(props.data);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.bookId === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            age: '',
            address: '',
            ...record,
        });
        setEditingKey(record.bookId);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...props.data];
            const index = newData.findIndex((item) => key === item.bookId);

            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {...item, ...row});
                props.handleChangeData(newData, key);
                setEditingKey('');
            } else {
                newData.push(row);
                props.handleChangeData(newData, key);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
            width: '7%',
            editable: true,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '25%',
            editable: true,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
            width: '15%',
            editable: true,
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
            width: '15%',
            editable: true,
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            editable: true,

        },
        {
            title: 'Cover',
            dataIndex: 'image',
            key: 'cover',
            width: '10%',
            editable: true,
            ellipsis: true,
        },
        {
            title: 'operation',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <a
                href="javascript:;"
                onClick={() => save(record.bookId)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <Space>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            Edit
                        </Typography.Link>

                        <Popconfirm title="Sure to delete?" onConfirm={() => props.handleDelete(record.bookId)}>
                            <a>Delete</a>
                        </Popconfirm>
                    </Space>
                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <div>
            <div style={{marginBottom: 16, float: 'left'}}>
                <AddBook changeData={props.handleAdd}/>
            </div>
            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    bordered
                    dataSource={props.data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                    expandable={{

                        expandedRowRender: record => (
                            <div style={{display: 'flex'}}>
                                <img src={record.image} alt="" width="100px"/>
                                <p style={{margin: 'auto'}}>{record.description}</p>
                            </div>
                        ),
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                />
            </Form>
        </div>
    );
};

export default EditableTable;
