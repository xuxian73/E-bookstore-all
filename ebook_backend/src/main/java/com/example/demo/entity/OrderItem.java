package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Data
@Entity
//@IdClass(OrderId.class)
@Table(name = "orderitem")
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class OrderItem {

    @Id
    @GeneratedValue(generator = "increment")
    @GenericGenerator(name = "increment", strategy = "increment")
    private Integer id;
    private Integer quantity;

    private Integer book_id;
    private Integer user_id;
    @ManyToOne
    @JoinColumn(name="order_id")
    private Orders orders;

//    public Integer getOrder_id() {
//        return order_id;
//    }
//
//    public void setOrder_id(Integer order_id) {
//        this.order_id = order_id;
//    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getBook_id() {
        return book_id;
    }

    public void setBook_id(Integer book_id) {
        this.book_id = book_id;
    }


}
