import React from 'react'
import {Layout, Menu, Breadcrumb, Pagination} from 'antd';
import Navbar from '../component/Navbar'
import '../css/ProfileView.css'
import AdminOrderTable from '../component/AdminOrderTable'
import AdminSidebar from '../component/AdminSidebar'

const {Header, Content, Footer, Sider} = Layout;

class OrderManage extends React.Component {
    render() {
        return (

            <Layout>
                <Navbar/>
                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <AdminSidebar path="/ordermanage"/>
                        <Content style={{padding: '20px 24px', minHeight: '560px', backgroundColor: '#fff'}}>
                            <AdminOrderTable/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}


export default OrderManage;