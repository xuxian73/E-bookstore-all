package com.example.demo.serviceimpl;

import com.example.demo.dao.OrderDao;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderResponse;
import com.example.demo.entity.Orders;
import com.example.demo.service.OrderService;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderDao orderDao;

    @Override
    public List<OrderResponse> getOrder(Integer id) {
        return orderDao.getOrder(id);
    }

    @Override
    public Msg addOrder(Orders data) {return orderDao.addOrder(data);}

    @Override
    public List<OrderResponse> getOrderAdmin() {
        return orderDao.getOrderAdmin();
    }

    @Override
    public Msg getUserStastics(Integer id) { return orderDao.getUserStastics(id); }

    @Override
    public Msg getHotBook(String date) { return orderDao.getHotBook(date); }

    @Override
    public Msg getHotUser(String date) { return orderDao.getHotUser(date); }
}
