import React from 'react'
import {Table, Input, Button, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import { getOrderAdmin } from '../services/orderService';

const data = [
    {
        key: '1',
        username: 'Newbee',
        name: '三体',
        author: '刘慈欣',
        cover: 'http://img3m4.ddimg.cn/32/35/23579654-1_u_3.jpg',
        quantity: '1',
        price: '$50',
        date: '2020-3-20',
        description: '程序员必读经典著作！理解计算机系统*书目，10万程序员共同选择。第二版销售突破100000册，第三版重磅上市！'
    },
    {
        key: '2',
        username: 'Newbee',
        name: '深入理解计算机系统',
        author: '刘慈欣',
        cover: 'http://img3m4.ddimg.cn/32/35/23579654-1_u_3.jpg',
        quantity: '1',
        price: '$50',
        date: '2020-3-20',
        description: '程序员必读经典著作！理解计算机系统*书目，10万程序员共同选择。第二版销售突破100000册，第三版重磅上市！'
    },
    {
        key: '3',
        username: 'Newbee',
        name: 'Java核心技术',
        author: '刘慈欣',
        cover: 'http://img3m4.ddimg.cn/32/35/23579654-1_u_3.jpg',
        quantity: '2',
        price: '$70',
        date: '2020-3-20',
        description: '程序员必读经典著作！理解计算机系统*书目，10万程序员共同选择。第二版销售突破100000册，第三版重磅上市！'
    },
    {
        key: '4',
        username: 'Newbee',
        name: 'Jim Red',
        author: '刘慈欣',
        cover: 'http://img3m4.ddimg.cn/32/35/23579654-1_u_3.jpg',
        quantity: '2',
        price: '$70',
        date: '2020-3-20',
        description: '程序员必读经典著作！理解计算机系统*书目，10万程序员共同选择。第二版销售突破100000册，第三版重磅上市！'

    },
];

class AdminOrderTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        data:[]
    };

    componentDidMount() {
        const callback = (data) => {
            console.log(data);
            this.setState({data: data});
        }
        getOrderAdmin(callback);
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

    render() {
        const columns = [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username',
                width: '15%',
                ...this.getColumnSearchProps('username'),
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '30%',
                ...this.getColumnSearchProps('name'),
            },
            {
                title: 'Author',
                dataIndex: 'author',
                key: 'author',
                width: '15%',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                key: 'quantity',
                width: '10%',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: '15%',
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                width: '20%',
                filters: [
                    {
                        text: 'Last Week',
                        value: 'lw',
                    },
                    {
                        text: 'Last Month',
                        value: 'lm',
                    },
                    {
                        text: 'Last Half Year',
                        value: 'lhy'
                    },
                    {
                        text: 'Last Year',
                        value: 'ly'
                    }
                ],
                render: (e, record) => {
                    return(
                        <div>{record.date.substring(0,10)}</div>
                    )
                },
                filterMultiple: false,
                onFilter: (value, record) => {
                    var time = (new Date()).getTime();
                    console.log(time);
                    if (value == 'lw') {
                        time -= 604800000;
                    } else if (value == 'lm') {
                        time -= 2592000000;
                    } else if (value == 'lhy') {
                        time -= 15552000000;
                    } else if (value == 'ly') {
                        time -= 31536000000;
                    }
                    const date = new Date(time);
                    const orderDate = new Date(record.date);
                    if (orderDate > date) {
                        return true;
                    } else return false;
                }
                
            },
        ];
        return (
            <Table columns={columns} dataSource={this.state.data}
            />
        )
    }
}

export default AdminOrderTable;