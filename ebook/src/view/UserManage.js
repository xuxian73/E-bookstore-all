import React from 'react'
import {Layout, Menu, Breadcrumb, Pagination} from 'antd';
import Navbar from '../component/Navbar'
import '../css/ProfileView.css'
import AdminSidebar from '../component/AdminSidebar'
import UserTable from '../component/UserTable'
import { getUser } from '../services/userService'
const {Header, Content, Footer, Sider} = Layout;

class UserManage extends React.Component {
    render() {
        return (
            <Layout>
                <Navbar/>
                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <AdminSidebar path="/usermanage"/>
                        <Content style={{padding: '20px 24px', minHeight: '560px', backgroundColor: '#fff'}}>
                            <UserTable/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default UserManage;