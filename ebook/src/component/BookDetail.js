import React from 'react'
import {Descriptions, Button, InputNumber, message} from 'antd';
import {Link} from 'react-router-dom'
import '../css/BookDetail.css'
import {
    ShoppingCartOutlined,
    PayCircleOutlined,
} from '@ant-design/icons';
import { addCart } from '../services/cartService'
import {history} from '../util/history';

class BookDetail extends React.Component {
    book_id = this.props.bookId; 
    state = {
        quantity: 1
    }

    handleChange = (cnt) => {
        this.setState({quantity: cnt});
    }

    handleAddCart = (bookId) => {
        console.log(this.state.quantity);
        const user = JSON.parse(localStorage.getItem("user"));
        const tmp = {
            book_id: bookId,
            user_id: user.userId,
            quantity: this.state.quantity
        }
        const callback = (data) => {
            if (data.status >= 0) {
                message.success(data.msg);
            } else {
                message.error(data.msg);
            }
        }
        addCart(tmp, callback);
    }

    handleBuyNow = (bookId) => {
        console.log(this.state.quantity);
        const user = JSON.parse(localStorage.getItem("user"));
        const tmp = {
            book_id: bookId,
            user_id: user.userId,
            quantity: this.state.quantity
        }
        const callback = (data) => {
            if (data.status >= 0) {
                history.push("/cart");
                message.success(data.msg);
            } else {
                message.error(data.msg);
            }
        }
        addCart(tmp, callback);
    }

    render() {

        const {info} = this.props;

        if (info == null) {
            return null;
        }
        return (
            <div className={"content"}>
                <div className={"book-detail"} style={{height:"450px"}}>
                    <div className={"book-image"}><img alt="image" src={info.image}
                                                       style={{width: "350px", height: "350px"}}/></div>
                    <div className={"descriptions"}>
                        <Descriptions>
                            <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                            <Descriptions.Item label={"作者"} span={3}>{info.author}</Descriptions.Item>
                            <Descriptions.Item label={"分类"} span={3}>{info.type}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={3}>{<span
                                className={"price"}>{'¥' + info.price}</span>}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>{info.inventory !== 0 ?
                                <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> :
                                <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"作品简介"} span={3}>{info.description}</Descriptions.Item>
                            <Descriptions.Item label={"数量"} span={3}><InputNumber min={1} name="input-number" onChange={this.handleChange}
                                                                                  defaultValue={1}/></Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div className={"button-groups"}>
                    
                        <Button type="danger" icon={<ShoppingCartOutlined/>} size={"large"} onClick={()=>this.handleAddCart(info.bookId)}>
                            Add to Cart
                        </Button>
                    
                    <Link to='cart'>
                        <Button type="danger" icon={<PayCircleOutlined/>} size={"large"} onClick={()=>this.handleBuyNow(info.bookId)} style={{marginLeft: "15%"}}
                                ghost>
                            Buy it Now
                        </Button>
                    </Link>
                </div>
            </div>


        )

    }
}

export default BookDetail;