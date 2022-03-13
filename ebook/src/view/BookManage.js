import React from 'react'
import {Layout, Menu, Breadcrumb, Pagination} from 'antd';
import Navbar from '../component/Navbar'
import '../css/ProfileView.css'
import AdminSidebar from '../component/AdminSidebar'
import BookTable from '../component/BookTable'
import EditTable from '../component/EditTable'
import EditableTable from '../component/EditableTable';

const {Header, Content, Footer, Sider} = Layout;

class BookManage extends React.Component {
    render() {
        return (
            <Layout>
                <Navbar/>
                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <AdminSidebar path="/bookmanage"/>
                        <Content style={{padding: '20px 24px', minHeight: '560px', backgroundColor: '#fff'}}>
                            <EditTable/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default BookManage;