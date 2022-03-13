import React from 'react'
import { Table, Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getOrder } from '../services/orderService';

class OrderTable extends React.Component {

    state = {
        searchText: '',
        searchedColumn: '',
        data: [],
        time: 0,
    };

    updateTotal(time) {
        var n = 0;
        var m = 0;
        this.state.data.forEach( element => {
            const date = new Date(time);
            const orderDate = new Date(element.date);
            if (orderDate > date) {
                n += element.quantity;
                m += element.price * element.quantity;
            }
        })
        m = Math.round(m * 100) / 100;
        var data = {
            num: n,
            money: m
        }
        return data;
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        const callback = (data) => {
            console.log(data);
            let i = 1;
            data.forEach(element => {
                element.key = i;
                i = i + 1;
            });
            this.setState({ data: data });
            this.updateTotal(0);
            this.setState({num: this.state.num});
        }
        getOrder(user.userId, callback);
        
    }

    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
        this.setState({ searchText: '' });
    };

    render() {

        const columns = [
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
                width: '20%',
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
                width: '20%',
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
                    
                    return (
                        <div>{record.date.substring(0, 10)}</div>
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
                    } else time = 0;
                    this.state.time = time;
                    const date = new Date(time);
                    const orderDate = new Date(record.date);
                    if (orderDate > date) {
                        return true;
                    } else return false;
                }
            },
        ];
        var tmp = this.updateTotal(this.state.time);
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data}
                    expandable={{
                        expandedRowRender: record => (
                            <div style={{ display: 'flex' }}>
                                <img src={record.image} alt="" width="100px" />
                                <p style={{ margin: 'auto' }}>{record.description}</p>
                            </div>
                        ),
                        rowExpandable: record => record.name !== 'Not Expandable',
                    }}
                />
                
            </div>
        )
    }
}

export default OrderTable;