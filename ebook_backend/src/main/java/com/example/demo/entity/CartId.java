package com.example.demo.entity;

import java.io.Serializable;
import java.util.Objects;

public class CartId implements Serializable{

    public Integer getBook_id() {
        return book_id;
    }

    public void setBook_id(Integer book_id) {
        this.book_id = book_id;
    }

    public Integer getUser_id() {
        return user_id;
    }

    public void setUser_id(Integer user_id) {
        this.user_id = user_id;
    }

    private Integer book_id;
    private Integer user_id;

    public CartId() {}

    public CartId(Integer book, Integer user) {
        book_id = book;
        user_id = user;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != getClass()) {
            return false;
        }
        CartId id = (CartId) o;
        return Objects.equals(book_id, id.book_id) && Objects.equals(user_id, id.user_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(book_id,user_id);
    }
}
