import React from 'react'
import {Layout, Menu,} from 'antd';
import {Router, Route, Link,} from 'react-router-dom'
import {
    BarsOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    RollbackOutlined,
    TeamOutlined
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;

class SideBar extends React.Component {

    render() {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user.userType == 0)
        return (
            <Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    selectedKeys={this.props.path}
                    style={{height: '100%'}}
                >
                    <Menu.Item key="/profile" icon={<UserOutlined/>} title="My Profile">
                        <Link to='/profile'>
                            My Profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/order" icon={<BarsOutlined/>} as={Link} to='/order' title="My Order">
                        <Link to='/order'>
                            My Order
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/cart" icon={<ShoppingCartOutlined/>} title="My Cart">
                        <Link to='/cart'>
                            My Cart
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="book" icon={<RollbackOutlined/>} as={Link} exact to='/book' title="Go Back">
                        <Link to='/'>
                            Go Back
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
        else return(
            <Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    selectedKeys={this.props.path}
                    style={{height: '100%'}}
                >
                    <Menu.Item key="/profile" icon={<UserOutlined/>} title="My Profile">
                        <Link to='/profile'>
                            My Profile
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/order" icon={<BarsOutlined/>} as={Link} to='/order' title="My Order">
                        <Link to='/order'>
                            My Order
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/cart" icon={<ShoppingCartOutlined/>} title="My Cart">
                        <Link to='/cart'>
                            My Cart
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="manage" icon={<TeamOutlined/>} as={Link} exact to='/usermanage' title="Manage Page">
                        <Link to='/usermanage'>
                            Manage Page
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="book" icon={<RollbackOutlined/>} as={Link} exact to='/book' title="Go Back">
                        <Link to='/'>
                            Go Back
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default SideBar;