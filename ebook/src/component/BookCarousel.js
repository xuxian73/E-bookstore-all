import React from 'react'
import {Carousel} from 'antd';
import book1 from '../asserts/carousel/book1.jpg';
import book2 from '../asserts/carousel/book2.jpg';
import book3 from '../asserts/carousel/book3.jpg';
import book4 from '../asserts/carousel/book4.jpg';

const contentStyle = {
    margin: "auto",
    width: "80%",
    height: "220px",
    color: '#fff',
    textAlign: 'center',
    background: '#364d79',
};

class BookCarousel extends React.Component {

    render() {
        return (
            <Carousel autoplay>
                <div className="carousel-container">
                    <img src={book1} style={contentStyle}/>
                </div>
                <div className="carousel-container">
                    <img src={book2} style={contentStyle}/>
                </div>
                <div className="carousel-container">
                    <img src={book3} style={contentStyle}/>
                </div>
                <div className="carousel-container">
                    <img src={book4} style={contentStyle}/>
                </div>
            </Carousel>
        )
    }
}

export default BookCarousel;