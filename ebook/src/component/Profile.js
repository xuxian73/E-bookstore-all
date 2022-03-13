import React from 'react'
import { Avatar, Descriptions, Divider, Select, Space } from 'antd'
import { Bar, Column, Pie } from '@ant-design/charts'

import { Layout, Menu } from 'antd';
import '../css/Profile.css'
import { Statistic, Row, Col, Card, Tag, Soace } from 'antd';
import { userStastics } from '../services/StasticsService'
import { getOrder} from '../services/orderService'
const { Option } = Select;

class Profile extends React.Component {

    state = {
        data: [],
        details: [],
        tag: [],
        num: [],
        money: [],
        order: [],
        text: "All ",
        time: 0
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        const callback = (msg) => {
            console.log(msg);
            this.state.data = msg.data;
            this.setState({ data: this.state.data });
            this.state.details = this.state.data.details;
            this.setState({ details: this.state.details });
            console.log(this.state.data);
        }
        userStastics(user.userId, callback);

        
        const callback2 = (data) => {
            console.log(data);
            let i = 1;
            data.forEach(element => {
                element.key = i;
                i = i + 1;
            });
            this.setState({ order: data });
        }
        getOrder(user.userId, callback2);
    }

    handleTimeChange = (value) => {
        var time = (new Date()).getTime();
        console.log(value);
        if (value == 'Last Week') {
            time -= 604800000;
        } else if (value == 'Last Month') {
            time -= 2592000000;
        } else if (value == "Last Three Month") {
            time -= 7776000000;
        }else if (value == 'Last Half Year') {
            time -= 15552000000;
        } else if (value == 'Last Year') {
            time -= 31536000000;
        } else time = 0;
        this.setState({text: value, time: time});
    }

    updateTotal(time) {
        var n = 0;
        var m = 0;
        this.state.order.forEach( element => {
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

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        var paletteSemanticRed = '#F4664A';
        var brandColor = '#5B8FF9';
        var bookConfig = {
            data: this.state.details,
            xField: 'type',
            yField: 'money',
            autoFit: false,
            width: 400,
            color: function color(_ref) {
                // var id = _ref.id;
                // if (id == 1) {
                //     return paletteSemanticRed;
                // }
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
                type: { alias: '种类' },
                money: { alias: '购买数' },
            },
        };
        var mosttype = {
            type: "Code",
            num: 0,
            money: 0
        }
        this.state.details.forEach(element => {
            if (element.money > mosttype.money) {
                mosttype = element;
            }
        });
        console.log(mosttype);

        var tag = null;
        var col1 = null;
        var col2 = null;
        if (mosttype.num) {
            tag = <Tag color="magenta">{mosttype.type}</Tag>;
            col1 = <Col span={4}>
                <Card hoverable style={{ border: 'solid 1px #B8DDFF' }}>
                    <Statistic title={mosttype.type + " Books"} value={mosttype.num} />
                </Card>
            </Col>;
            col2 = <Col span={4}>
                <Card hoverable style={{ border: 'solid 1px #B8DDFF' }}>
                    <Statistic title={mosttype.type + " Books"} value={mosttype.money} />
                </Card>
            </Col>;

        }
        
        var tmp = this.updateTotal(this.state.time);
        console.log(this.state.time);
        console.log(tmp);
        return (
            <div>
                <Divider orientation="left">Avatar</Divider>
                <div className="baseinfo">
                    <div className="avatar">
                        <Avatar size={100} src={this.props.info.avatar} />
                    </div>
                    <div className={"description"}>
                        <Descriptions>
                            <Descriptions.Item span={3} label="Name">{user.username}</Descriptions.Item>
                            <Descriptions.Item span={3} label="email">{user.email}</Descriptions.Item>
                            <Descriptions.Item span={3} label="tag">
                                <div>
                                    {tag}
                                </div>
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <Divider orientation="left">Statistics</Divider>
                
                <div className="analysis" >
                    <Row gutter={16}>
                        <Col span={4}>
                            <Card hoverable style={{ border: 'solid 1px #B8DDFF' }}>
                                <Statistic title="Bought Books" value={this.state.data.num} />
                            </Card>
                        </Col>
                        {col1}
                        {col2}
                        <Col span={10}>
                            <Card hoverable style={{ border: 'solid 1px #B8DDFF' }}>
                                <Statistic title="Paid Money(CNY)" value={this.state.data.money} precision={2} />
                            </Card>
                        </Col>
                    </Row>
                </div>
                
                <div className="chart-container">
                    <Column {...bookConfig} />
                </div>

                <Divider orientation="left" style={{marginTop: 50}}>Statistics with time limit</Divider>
                <Select defaultValue="All" style={{ width: 120, marginTop: 10, marginBottom: 30}} onChange={this.handleTimeChange}>
                    <Option value="All">All</Option>
                    <Option value="Last Week">Last Week</Option>
                    <Option value="Last Month">Last Month</Option>
                    <Option value="Last Three Month">Last Three Months</Option>
                    <Option value="Last Half Year">Last Half Year</Option>
                    <Option value="Last Year">Last Year</Option>
                </Select>
                
                <div className="analysis">
                    <Row gutter={16}>
                        <Col span={8}>
                            <Card hoverable style={{ border: 'solid 1px #B8DDFF' }}>
                                <Statistic title={this.state.text + " Bought Books"} value={tmp.num} />
                            </Card>
                        </Col>
                        
                        <Col span={8}>
                            <Card hoverable style={{ border: 'solid 1px #B8DDFF' }}>
                                <Statistic title={this.state.text + " Paid Money(CNY)"} value={tmp.money} precision={2} />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default Profile;