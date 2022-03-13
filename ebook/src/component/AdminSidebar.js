import React from 'react'
import {Layout, Menu,} from 'antd';
import {Link} from 'react-router-dom'
import {
    AreaChartOutlined,
    BarsOutlined,
    BookOutlined,
    UserOutlined,
    RollbackOutlined,
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;

class AdminSidebar extends React.Component {
    render() {
        return (
            <Sider className="site-layout-background" width={200}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{height: '100%'}}
                    selectedKeys={this.props.path}
                >
                    <Menu.Item key="/usermanage" icon={<UserOutlined/>} title="User Manage">
                        <Link to="/usermanage">
                            User Manage
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/bookmanage" icon={<BookOutlined/>} title="Book Manage">
                        <Link to="/bookmanage">
                            Book Manage
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/ordermanage" icon={<BarsOutlined/>} title="Order List">
                        <Link to="/ordermanage">
                            Order List
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/analysis" icon={<AreaChartOutlined/>} title="Analysis">
                        <Link to="/analysis">
                            Analysis
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/" icon={<RollbackOutlined/>} title="Go Back">
                        <Link to="/">
                            Go Back
                        </Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

export default AdminSidebar;