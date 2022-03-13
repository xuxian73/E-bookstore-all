import React from 'react'
import {Table, Input, Button, Space, message} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {InputNumber} from 'antd';
import { getCart } from '../services/cartService';
import { addOrder } from '../services/orderService';
import { deleteCart } from '../services/cartService';
import { history } from '../util/history'
class CartTable extends React.Component {
    state = {
        total: 0,
        searchText: '',
        searchedColumn: '',
        selectedRowKeys: [],
        data: [
        ],
    };

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const callback = (data) =>{
            console.log(data);
            let i = 1;
            data.forEach(element => {
                element.key = i;
                i = i + 1;
            });
            this.setState({data:data});
        }
        getCart(user.userId, callback);
    }

    handleAddOrder = () => {
        const callback = (data) => {
            if (data.status >=0) {
                message.success(data.msg);
            } else {
                message.error(data.msg);
            }
        }
        const user = JSON.parse(localStorage.getItem("user"));
        const tmp = {
            user_id:user.userId,
            date: new Date(),
            num: 0,
            money: 0,
            orderItems: []
        };
        this.state.data.forEach(element => {
            const ind = this.state.selectedRowKeys.indexOf(element.key);
            if (ind >= 0) {
                tmp.orderItems.push({
                    user_id: user.userId,
                    book_id: element.book_id,
                    quantity: element.quantity
                });
                tmp.num += element.quantity;
                tmp.money += element.price;
                const tmp2 = {
                    user_id: user.userId,
                    book_id: element.book_id,
                }
                // addOrder(tmp, callback);
                deleteCart(tmp2, callback);
            }
        });
        addOrder(tmp, callback);
        history.push('/order');
    }

    
    selectRow = (record) => {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.key) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
        } else {
            selectedRowKeys.push(record.key);
        }
        this.setState({selectedRowKeys});
    }
    onSelectedRowKeysChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys});
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

    handleNumChange = (key, value) => {
        console.log(key, value);
        this.state.data.forEach(element => {
            if (element.key == key) {
                element.quantity = value;
                element.price = element.quantity * element.unitprice;
            }
        });
        this.setState(
            {data: this.state.data}
        )
    }

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
                render: (_, record) => (
                    <InputNumber type="number" min={1} defaultValue={record.quantity} onChange={(value) => {
                        this.handleNumChange(record.key, value)
                    }}/>
                )
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: '20%',
            },
        ];
        const {selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        };
        this.state.total = 0;
        this.state.data.forEach(item => {
            item.price = Math.round(item.price * 100) / 100;
            if (this.state.selectedRowKeys.indexOf(item.key) >= 0) {
                this.state.total += item.price;
                
            }
        });
        this.state.total = Math.round(this.state.total * 100) / 100;
        
        return (
            <div>
                <Table columns={columns} dataSource={this.state.data}
                       expandable={{
                           expandedRowRender: record => (
                               <div style={{display: 'flex'}}>
                                   <img src={record.image} alt="" width="100px"/>
                                   <p style={{margin: 'auto'}}>{record.description}</p>
                               </div>
                           ),
                           rowExpandable: record => record.name !== 'Not Expandable',
                       }}
                       rowSelection={rowSelection}
                    // onRow={(record) => ({
                    //     onClick: () => {
                    //       this.selectRow(record);
                    //     },
                    // })}
                />
                <div style={{float: 'right', display: 'flex'}}>
                    <p style={{margin: 'auto 20px', fontSize: '20px'}}>Total: ${this.state.total}</p>
                    <Button type="primary" size="large" onClick={this.handleAddOrder}>Pay Now</Button>
                </div>
            </div>
        );
    }
}

export default CartTable;