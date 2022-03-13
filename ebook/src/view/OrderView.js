import React from 'react'
import { Layout, Menu, Breadcrumb, Pagination } from 'antd';
import Navbar from '../component/Navbar'
import '../css/ProfileView.css'
import OrderTable from '../component/OrderTable';
import SideBar from '../component/SideBar'

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class OrderView extends React.Component {
    render() {
        return (
                <Layout>
                    <Navbar path="/order" />
                    <Content style={{ padding: '0 50px' }}>
                        <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                            <SideBar path="/order" />
                            <Content style={{ padding: '20px 24px', minHeight: '650px', backgroundColor: '#fff' }}>
                                <OrderTable />
                            </Content>
                        </Layout>
                    </Content>
                    {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
                </Layout>
            
        )
    }
}


export default OrderView;