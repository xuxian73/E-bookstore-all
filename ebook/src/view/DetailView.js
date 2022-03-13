import React from 'react'
import {Layout, Menu, Breadcrumb, Pagination} from 'antd';
import Navbar from '../component/Navbar'
import '../css/ProfileView.css'
import SideBar from '../component/SideBar'
import BookDetail from '../component/BookDetail';
import {getBook} from '../services/bookService'
const {Header, Content, Footer, Sider} = Layout;

class DetailView extends React.Component {
    state = {
        data: [],
    }
    componentDidMount(){
        const callback = (data) => {
            this.setState({data:data});
        }
        const query = this.props.location.search;
        const arr = query.split('&');
        const bookId = arr[0].substr(4);
        getBook(bookId, callback);
    }
    render() {
        return (
            <Layout>
                <Navbar/>
                <Content style={{padding: '0 50px'}}>
                    <Layout className="site-layout-background" style={{padding: '24px 0'}}>
                        <SideBar/>
                        <Content style={{padding: '20px 24px', minHeight: '560px', backgroundColor: '#fff'}}>
                            <BookDetail info={this.state.data}/>
                        </Content>
                    </Layout>
                </Content>
                <Footer style={{textAlign: 'center'}}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default DetailView;