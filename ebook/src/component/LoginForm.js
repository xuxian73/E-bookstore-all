import React from 'react'
import { Form, Text, Input, Button, Select, Checkbox } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom'
import * as userService from '../services/userService'

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

class LoginForm extends React.Component {
    formRef = React.createRef();

    onFinish = (values) => {
        userService.login(values);
    };

    render() {
        return (
            <Form className="login-form" initialValues={{ remember: true }}
                {...layout} ref={this.formRef} name="control-ref" onFinish={this.onFinish}>
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
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
                <Form.Item name="remember" valuePropName="checked" >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
                <Form.Item>
                    <p>Or <Link to="/register">register now!</Link></p>
                </Form.Item>
            </Form>
        );
    }
}

export default LoginForm