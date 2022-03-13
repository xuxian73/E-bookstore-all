package com.example.demo.dao;

import com.example.demo.entity.Order;
import com.example.demo.entity.OrderResponse;
import com.example.demo.entity.Orders;
import com.example.demo.utils.msgutils.Msg;

import java.util.List;

public interface OrderDao {

    public List<OrderResponse> getOrder(Integer id);

    public Msg addOrder(Orders data);

    public List<OrderResponse> getOrderAdmin();

    public Msg getUserStastics(Integer id);

    public Msg getHotBook(String value);

    public Msg getHotUser(String value);
}
