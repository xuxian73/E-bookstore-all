package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "cart")
@IdClass(CartId.class)
@JsonIgnoreProperties(value = {"handler","hibernateLazyInitializer","fieldHandler"})
public class Cart {

    @Id
    private Integer book_id;
    @Id
    private Integer user_id;

    private Integer quantity;

    public CartId getCartId() {
        return new CartId(book_id, user_id);
    }
    public Integer getUserId() {
        return user_id;
    }

    public void setUserId(Integer userId) {
        this.user_id = userId;
    }

    public Integer getBookId() {
        return book_id;
    }

    public void setBookId(Integer bookId) {
        this.book_id = bookId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

}
