import React from 'react'
import '../css/Navbar.css'
import Logo from '../asserts/logo.svg'
import { Layout, Menu, Dropdown } from 'antd';
import thumbnail from '../asserts/thumbnail.jpg'
import '../css/Navbar.css'
import { Link } from 'react-router-dom'
import {
    BarsOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import * as userService from '../services/userService'

const { Header, Content, Footer } = Layout;

class Navbar extends React.Component {
    
    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        const menu = (
            <Menu>
                <Menu.Item onClick={userService.logout}>
                    <a target="_blank" rel="noopener noreferrer" >
                        Logout
                    </a>
                </Menu.Item>
            </Menu>
        )
        return (
            <Layout>
                <Header className="header">
                    <div className="logo">
                        <Link to='/'><img src={Logo} id="Logo" alt="logo" /></Link>
                    </div>
                    <p id="bookstore">Book Store</p>
                    <Menu theme="dark" mode="horizontal" selectedKeys={this.props.path}>
                        <Menu.Item key="/order" icon={<BarsOutlined />}><Link to='/order'>Order</Link></Menu.Item>
                        <Menu.Item key="/cart" icon={<ShoppingCartOutlined />}><Link to='/cart'>Cart</Link></Menu.Item>
                        <Menu.Item key="/profile" icon={<UserOutlined />}><Link to='/profile'>Profile</Link></Menu.Item>
                    </Menu>

                    <div className="header-right">
                        <Link to="/profile"><p id="greet">Hi, {user.username}</p></Link>
                        <div style={{marginTop:15}}>
                            <Dropdown overlay={menu}>
                                <img id="thumbnail" src={thumbnail} />
                            </Dropdown>
                        </div>
                    </div>

                </Header>
            </Layout>
        )
    }
}

export default Navbar