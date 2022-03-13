import React from 'react'
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import * as userService from '../services/userService'
import LoginForm from '../component/LoginForm'
import '../css/Login.css'

class LoginView extends React.Component {
    state = {
        isLogin: true,
    }
    
    handleLogin = () => {
        let tmp =
        {
            username: document.forms["login-form"]["username"].value,
            password: document.forms["login-form"]["password"].value,
        };
        console.log(tmp);
        userService.login(tmp);
    }

    handleRegister = () => {
        if (document.forms["register-form"]["password"].value != document.forms["register-form"]["password2"].value) {
            alert("Two passwords do not match");
            return;
        }
        const tmp = {
            username: document.forms["register-form"]["username"].value,
            password: document.forms["register-form"]["password"].value,
            email: document.forms["register-form"]["email"].value,
        }
        console.log(tmp);
        userService.register(tmp);
    }

    render() {
        return (
            // <div className="login-page">
            //     <div className="form">
            //         <Form onSubmit={this.handleRegister} className="register-form">
            //             <h1>Register</h1>
            //             <Form.Item>
            //                 {getFieldDecorator('username', {
            //                     rules: [{ required: true, message: 'Please input your username!' }],
            //                 })(
            //                     <Input
            //                         prefix={<UserOutlined/>}
            //                         placeholder="Username"
            //                     />,
            //                 )}
            //             </Form.Item>
            //             <Form.Item>
            //                 {getFieldDecorator('password', {
            //                     rules: [{ required: true, message: 'Please input your password!' }],
            //                 })(
            //                     <Input
            //                         prefix={<LockOutlined/>}
            //                         type="password"
            //                         placeholder="Password"
            //                     />
            //                 )}
            //             </Form.Item>
            //             <Form.Item>
            //                 {getFieldDecorator('re-password', {
            //                     rules: [{ required: true, message: 'Please repeat your password!' }],
            //                 })(
            //                     <Input
            //                         prefix={<LockOutlined/>}
            //                         type="password"
            //                         placeholder="Password"
            //                     />
            //                 )}
            //             </Form.Item>
            //             <Form.Item>
            //                 {getFieldDecorator('email', {
            //                     rules: [{ required: true, message: 'Please input your email!' }],
            //                 })(
            //                     <Input
            //                         prefix={<MailOutlined/>}
            //                         type="email"
            //                         placeholder="Email"
            //                     />
            //                 )}
            //             </Form.Item>
            //             <p className="message">Already registered? <a href="#" onClick={this.handleLogClick}>Sign In</a></p>
            //         </Form>
            //     </div>
            // </div>
            
            <div className="login-page">
                <div className="login-container">
                    <div className="login-box">
                        <h1 className="page-title">Login</h1>
                        <div className="login-content">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginView);