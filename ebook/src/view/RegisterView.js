import React from 'react'
import { withRouter } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import '../css/Login.css'
import * as userService from '../services/userService'
import {
    UserOutlined,
    MailOutlined,
    LockOutlined
} from '@ant-design/icons';
import RegeisterForm from '../component/RegisterForm'
class RegisterView extends React.Component {
    render() {

        return (

            <RegeisterForm />
        )
    }
}
export default RegeisterForm