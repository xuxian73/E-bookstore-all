package com.example.demo.entity;

import java.io.Serializable;
import java.util.Objects;

public class OrderId implements Serializable {
    private Integer order_id;
    private Integer book_id;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != getClass()) {
            return false;
        }
        OrderId id = (OrderId) o;
        return Objects.equals(order_id, id.order_id) && Objects.equals(book_id, id.book_id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(order_id, book_id);
    }
}
