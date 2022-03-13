import React from 'react'
import {List, Card} from 'antd';
import {Link} from 'react-router-dom'
import { Typography, Switch } from 'antd';
const { Paragraph, Text } = Typography;

const {Meta} = Card;

class BookList extends React.Component {
    state = {
        filteredData: [],
    }

    render() {
        this.state.filteredData = [];
        this.props.data.forEach(element => {
            if (element.name.indexOf(this.props.filterText) != -1
                && element.type.indexOf(this.props.type) != -1)
                this.state.filteredData.push(element);
        });
        console.log(this.state.filteredData);
        return (
            <List
                style={{width: '100%'}}
                grid={{gutter: 16, column: 4}}
                dataSource={this.state.filteredData}
                renderItem={item => (
                    <List.Item>
                        <Link to={{
                                pathname: '/Detail',
                                search: '?id=' + item.bookId}}>
                            <Card
                                hoverable
                                style={{width: '100%'}}
                                cover={<img alt="example" src={item.image}/>}
                            >
                                <Meta title={item.name} description={item.author}/>
                                <Paragraph ellipsis={{rows: 2}}>{item.description}</Paragraph>
                            </Card>
                        </Link>
                    </List.Item>
                )
                }
            />
        )
    }
}

export default BookList;