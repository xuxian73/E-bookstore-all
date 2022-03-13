package com.example.demo.repository;

import com.example.demo.entity.Order;
import com.example.demo.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {
    @Query("from Orders")
    List<Orders> getOrders();

    @Query("from Orders where user_id = :id")
    List<Orders> getOrdersByUserId(Integer id);

    @Query("SELECT MAX(order_id) FROM Orders")
    Integer getOrderId();

    @Query("select sum(num) from Orders where user_id = :id")
    Integer getUserTotalNum(Integer id);

    @Query("select sum(money) from Orders where user_id = :id")
    BigDecimal getUserTotalMoney(Integer id);

    @Query("select user_id,sum(num), sum(money) from Orders where date > :date group by user_id order by sum(money) desc ")
    List<Object[]> getHotUser(Date date);
}
