package com.example.demo.repository;

import com.example.demo.entity.Order;
import com.example.demo.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Integer> {

    @Query("from Orders ")
    List<Orders> getOrders();

    @Query("from Orders where user_id = :id")
    List<Orders> getOrdersById(Integer id);


}
