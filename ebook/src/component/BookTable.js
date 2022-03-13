import React from 'react'
import {Table, Switch, Input, Button, Popconfirm, Space} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import AddBook from '../component/AddBook'
import {getBooks} from '../services/bookService'

class BookTable extends React.Component {
    state = {
        searchText: '',
        searchedColumn: '',
        modalUpdate: 0,
        data: []
    };

    componentDidMount(){
        const callback = (data) => {
            console.log(data);
            this.setState({data:data});
        };
        getBooks({"search": null}, callback);
    }
    
    handleChangeData = (formData) => {
        const {data} = this.state;
        console.log('handleChangeData triggered');
        const tmp =
            {
                key: formData.ISBN,
                name: formData.name,
                author: formData.author,
                cover: formData.image,
                type: formData.type,
                ISBN: formData.ISBN,
                price: formData.price,
                description: formData.description,
            }
        this.setState({data: [...data, tmp]});
        console.log(this.state.data);
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

    handleDelete = (key) => {
        this.setState({data: this.state.data.filter(item => item.key !== key)});
    };

    render() {
        const columns = [
            /*
              {
                  title: 'Cover',
                  dataIndex: 'cover',
                  key: 'cover',
                  width: '10%',
                  render: (record) => <img src={record} alt="" width='100%'/>
              },
              */
            {
                title: 'ISBN',
                dataIndex: 'ISBN',
                key: 'ISBN',
                width: '10%',
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
                width: '20%',
            },
            {
                title: 'Type',
                dataIndex: 'type',
                key: 'type',
                width: '15%',
            },
            {
                title: 'Price',
                dataIndex: 'price',
                key: 'price',
                width: '20%',
            },

            {
                title: 'operation',
                dataIndex: 'operation',
                render: (_, record) =>
                    this.state.data.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <a>Delete</a>
                        </Popconfirm>
                    ) : null,
            },
        ];

        return (
            <div>
                <div style={{marginBottom: 16, float: 'left'}}>
                    <AddBook changeData={this.handleChangeData}/>
                </div>
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
                />
            </div>
        )
    }
}

export default BookTable;