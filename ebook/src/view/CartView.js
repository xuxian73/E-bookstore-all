import React from 'react'
import {Layout, Menu, Breadcrumb, Pagination} from 'antd';
import Navbar from '../component/Navbar'
import CartTable from '../component/CartTable'
import '../css/ProfileView.css'
import SideBar from '../component/SideBar'

const {Header, Content, Footer, Sider} = Layout;

class CartView extends React.Component {
    render() {
        return (
            <Layout>
                <Navbar path="/cart"/>
                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <SideBar path="/cart"/>
                        <Content style={{padding: '20px 24px', minHeight: '560px', backgroundColor: '#fff'}}>
                            <CartTable/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default CartView;