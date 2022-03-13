package com.example.demo.service;

import com.example.demo.entity.Order;
import com.example.demo.entity.OrderResponse;
import com.example.demo.entity.Orders;
import com.example.demo.utils.msgutils.Msg;

import java.util.List;

public interface OrderService {

    public List<OrderResponse> getOrder(Integer id);

    public Msg addOrder(Orders order);

    public List<OrderResponse> getOrderAdmin();

    public Msg getUserStastics(Integer id);

    public Msg getHotBook(String date);

    public Msg getHotUser(String date);
}
