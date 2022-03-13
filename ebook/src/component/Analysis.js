import React from 'react'
import { Divider } from 'antd'
import { Select } from 'antd'
import { Bar, Column, Pie } from '@ant-design/charts'
import '../css/Analysis.css'
import { getHotBook, getHotUser } from '../services/StasticsService'

const { Option } = Select;

class Analysis extends React.Component {
    state = {
        bookdata: [],
        userdata: [],
        typedata: [
            {
                type: 'Code',
                value: 27,
            },
            {
                type: 'Education',
                value: 25,
            },
            {
                type: 'Literature',
                value: 18,
            },
            {
                type: 'Science',
                value: 15,
            },
            {
                type: 'Other',
                value: 10,
            }
        ]
    }
    handleBookChange = (value) => {
        console.log(value);
        var i = 1;
        const callback = (data) => {
            console.log(data);
            this.state.typedata.forEach(element => {
                element.value = 0;
            });
            this.state.bookdata = [];
            data.array.forEach(element => {
                this.state.bookdata.push({
                    id: i,
                    type: element.name,
                    sales: element.quantity
                });
                ++i;
                this.state.typedata.forEach(item => {
                    if (element.type == item.type) {
                        item.value += element.quantity;
                    }
                })
            })

            this.setState({ bookdata: this.state.bookdata });
            this.setState({ typedata: this.state.typedata });
            console.log(this.state.bookdata);
        }
        getHotBook({date:value}, callback);
    }
    handleCustomerChange = (value) => {
        console.log(value);
        const callback = (data) => {
            console.log(data.array);
            this.setState({userdata: data.array});
        }
        getHotUser({date: value}, callback);
    }

    componentDidMount() {
        this.handleBookChange("all");
        this.handleCustomerChange("all");
    }
    render() {
        
        var config = {
            appendPadding: 10,
            data: this.state.typedata,
            angleField: 'value',
            colorField: 'type',
            radius: 0.9,
            label: {
                type: 'inner',
                offset: '-30%',
                content: function content(_ref) {
                    var percent = _ref.percent;
                    return ''.concat((percent * 100).toFixed(2), '%');
                },
                style: {
                    fontSize: 14,
                    textAlign: 'center',
                },
            },
            interactions: [{ type: 'element-active' }],
        };
        
        var paletteSemanticRed = '#F4664A';
        var brandColor = '#5B8FF9';
        
        var bookConfig = {
            data: this.state.bookdata,
            xField: 'type',
            yField: 'sales',
            autoFit: false,
            width: 400,
            color: function color(_ref) {
                var id = _ref.id;
                if (id == 1) {
                    return paletteSemanticRed;
                }
                return brandColor;
            },
            label: {
                position: 'middle',
                style: {
                    fill: '#FFFFFF',
                    opacity: 0.6,
                },
            },
            meta: {
                type: { alias: '书籍' },
                sales: { alias: '销售额' },
            },
        };
        var userData = [
            
        ];
        var userConfig = {
            data: this.state.userdata,
            xField: 'username',
            yField: 'money',
            autoFit: false,
            width: 400,
            color: function color(_ref) {
                var type = _ref.type;
                if (type === 'usr1') {
                    return paletteSemanticRed;
                }
                return brandColor;
            },
            label: {
                position: 'middle',
                style: {
                    fill: '#FFFFFF',
                    opacity: 0.6,
                },
            },
            legend: {},
            meta: {
                type: { alias: '用户名' },
                sales: { alias: '销售额' },
            },
        };
        return (
            <div className="analysis-container">

                <Divider orientation="left">Hot-Selling Books</Divider>
                <Select defaultValue="All" style={{ width: 120, marginTop: 30 }} onChange={this.handleBookChange}>
                    <Option value="all">All</Option>
                    <Option value="last-week">Last Week</Option>
                    <Option value="last-month">Last Month</Option>
                    <Option value="last-three-month">Last Three Months</Option>
                    <Option value="last-half-year">Last Half Year</Option>
                    <Option value="last-year">Last Year</Option>
                </Select>
                <div className="chart-container">
                    <div style={{ marginRight: 100 }}>
                        {/* <Column {...typeConfig} /> */}
                        <Pie {...config} />
                    </div>
                    <div width="50%">
                        <Column {...bookConfig} />
                    </div>
                </div>
                <Divider orientation="left">Cosumer List</Divider>
                <Select defaultValue="All" style={{ width: 120, marginTop: 30 }} onChange={this.handleCustomerChange}>
                    <Option value="all">All</Option>
                    <Option value="last-week">Last Week</Option>
                    <Option value="last-month">Last Month</Option>
                    <Option value="last-three-months">Last Three Months</Option>
                    <Option value="last-half-year">Last Half Year</Option>
                    <Option value="last-year">Last Year</Option>
                </Select>
                <div className="chart-container">
                    <Column {...userConfig} />
                </div>
            </div>
        )
    }
}

export default Analysis;