import React from 'react'
import { Form, Text, Input, Button, Select, Checkbox, message } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';
import * as userService from '../services/userService'
import '../css/register.css'
import { Link } from 'react-router-dom'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
class RegeisterForm extends React.Component {
    state = {
        dup: false
    }
    handleFinish = (values) => {
        console.log(values);
        const password = values.password;
        const password2 = values.repassword;
        if (password !== password2) {
            message.error("Two password are not the same!");
            return;
        }
        userService.register({username: values.username, password: values.password, email: values.email});
    }

    handleChange = (e) => {
        console.log(e.target.value);
        const callback = (data) => {
            console.log(data);
            if (data.status < 0) {
                this.setState({dup:true});
            } else
                this.setState({dup: false});
        }
        userService.tryRegister({username: e.target.value}, callback);
    }

    render() {
        var du = null;
        if (this.state.dup == true) {
            du = <p className="p">This username has been used.</p>
        }
        return (
            <div className="register-page">
            <div className="register-container">
                <div className="register-box">
                <Form {...layout} ref={this.formRef} onFinish={this.handleFinish} className="register-form">
                    <h1>Register</h1>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input onChange={this.handleChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    {du}
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item
                        name="repassword"
                        rules={[{ required: true, message: 'Please repeat your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Repeat password again"
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input
                            prefix={<MailOutlined />}
                            type="email"
                            placeholder="Email"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <p className="message">Already registered? <Link to="/login">Sign In</Link></p>
                    </Form.Item>
                </Form>
                </div>
            </div>
            </div>
        )
    }
}

export default RegeisterForm;