import React from 'react';
import {Tag, Table, Switch, Input, Button, Space, message} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { ChangeEnable, getUser } from '../services/userService';

class UserTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data: [
        ]
    };

    componentDidMount() {
        var i = 1;
        const callback = (data) => {
            data.forEach(element => {
                element.key = i;
                i = i + 1;
            });
            console.log(data);
            this.setState({data:data});
        }
        getUser(callback);
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{width: 90}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },

    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({searchText: ''});
    };

    onChangeSwitch = (isSelect, record) => {
        console.log(record); // True / False

        if (isSelect) {
            record.enable = true;
        }

        if (!isSelect) {
            record.enable = false;
        }
        const data = {
            user_id: record.user_id,
            enable: isSelect ? 1 : 0
        };
        console.log(data);
        const callback = (response) => {
            if (response.status >= 0) {
                this.setState({data:this.state.data});
                message.success(response.msg);
            } else {
                message.error(response.msg);
            }
        }
        ChangeEnable(data, callback);
        
    }

    render() {

        const columns = [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                width: '20%',
                ...this.getColumnSearchProps('username'),
            },
            {
                title: 'Authority',
                dataIndex: 'userType',
                key: 'authority',
                width: '20%',
                render :(e, record) => {
                    if (record.userType) {
                        return (
                            <Tag color="blue">Administrator</Tag>
                        )
                    } else {
                        return (
                            <Tag color="blue">User</Tag>
                        )
                    }
                }
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                width: '25%',
            },
            {
                title: 'Status',
                dataIndex: 'enable',
                key: 'status',
                width: '20%',
                render: (e, record) => {
                    if (record.enable) {
                        return (
                            <Tag color="green">Enabled</Tag>
                        )
                    } else {
                        return (
                            <Tag color="red">Disabled</Tag>
                        )
                    }
                }
            },
            {
                title: 'Manage',
                dataIndex: 'switch',
                key: 'switch',
                render: (e, record) => (
                    <Switch
                        defaultChecked={record.enable}
                        checkedChildren="Enabled"
                        unCheckedChildren="Disabled"
                        disabled={record.userType == 1}
                        onChange={
                            (value) => this.onChangeSwitch(value, record)
                        }
                    />
                )
            },
        ];
        return (
            <Table columns={columns} dataSource={this.state.data}/>
        )
    }
}

export default UserTable;