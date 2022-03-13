import React from 'react'
import {Layout, Menu, Breadcrumb, Pagination} from 'antd';
import Navbar from '../component/Navbar'
import '../css/ProfileView.css'
import SideBar from '../component/SideBar'
import Profile from '../component/Profile'

const {Header, Content, Footer, Sider} = Layout;

class ProfileView extends React.Component {
    info = {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        username: 'Newcomer',
        email: 'blabla@sjtu.edu.cn',
    }

    render() {
        return (
            <Layout>
                <Navbar path="/profile"/>
                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <SideBar path="/profile"/>
                        <Content style={{padding: '20px 24px', minHeight: '560px', backgroundColor: '#fff'}}>
                            <Profile info={this.info}/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default ProfileView;