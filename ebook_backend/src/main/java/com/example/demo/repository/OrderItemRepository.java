package com.example.demo.repository;

import com.example.demo.entity.OrderItem;
import com.example.demo.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;
import java.util.Objects;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    @Query("from OrderItem ")
    List<OrderItem> getOrderItem();

    @Query("select o.book_id,sum(o.quantity) from OrderItem o inner join o.orders s where s.date > :date GROUP BY o.book_id order by sum(o.quantity) DESC ")
    List<Object[]> getHotBook(Date date);

    @Query("select o.book_id,sum(o.quantity) from OrderItem o inner join o.orders s where s.date > :date GROUP BY s.user_id order by sum(o.quantity) DESC")
    List<Object[]> getHotUser(Date date);
}
