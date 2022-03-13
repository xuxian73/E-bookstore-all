import React from 'react'
import {Layout, Menu} from 'antd';
import SearchBar from '../component/SearchBar'
import BookCarousel from '../component/BookCarousel'
import BookList from '../component/BookList'
import Navbar from '../component/Navbar'
import '../css/BookView.css'
import {withRouter} from "react-router-dom";
import {getBooks} from "../services/bookService";

import {
    BookOutlined,
    CodeOutlined,
    EllipsisOutlined,
    ExperimentOutlined,
    MenuOutlined,
    SmileOutlined,
} from '@ant-design/icons';

const {Header, Content, Footer, Sider} = Layout;

class BookView extends React.Component {
    state = {
        filterText: '',
        type: '',
        data: []
    }

    componentDidMount() {
        const callback =  (data) => {
            console.log(data);
            this.setState({data:data});
        };

        getBooks({"search" : null}, callback);
    }
    handleFilterTextChanged = (text) => {
        console.log(text);
        this.setState(
            {filterText: text}
        )
    }
    onAll = () => {
        this.setState(
            {type: ''}
        )
    }
    onCode = () => (
        this.setState(
            {type: 'Code'}
        )
    )
    onEducation = () => (
        this.setState(
            {type: 'Education'}
        )
    )
    onLiterature = () => (
        this.setState(
            {type: 'Literature'}
        )
    )
    onScience = () => (
        this.setState(
            {type: 'Science'}
        )
    )
    onOther = () => (
        this.setState(
            {type: 'Other'}
        )
    )

    render() {
        return (
            <Layout>
                <Navbar/>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <Menu.Item key="1" icon={<MenuOutlined/>} onClick={this.onAll}>
                                All
                            </Menu.Item>
                            <Menu.Item key="2" icon={<CodeOutlined/>} onClick={this.onCode}>
                                Code
                            </Menu.Item>
                            <Menu.Item key="3" icon={<SmileOutlined/>} onClick={this.onEducation}>
                                Education
                            </Menu.Item>
                            <Menu.Item key="4" icon={<BookOutlined/>} onClick={this.onLiterature}>
                                Literature
                            </Menu.Item>
                            <Menu.Item key="5" icon={<ExperimentOutlined/>} onClick={this.onScience}>
                                Science
                            </Menu.Item>
                            <Menu.Item key="6" icon={<EllipsisOutlined/>} onClick={this.onOther}>
                                Other
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 700,
                            }}
                        >
                            <SearchBar filterText={this.state.filterText}
                                       onFilterTextChanged={this.handleFilterTextChanged}/>
                            <BookCarousel/>
                            <div class="book-container">
                                <BookList data={this.state.data} filterText={this.state.filterText} type={this.state.type}/>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
        )
    }
}

export default withRouter(BookView);