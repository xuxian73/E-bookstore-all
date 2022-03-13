package com.example.demo.controller;

import com.example.demo.entity.Order;
import com.example.demo.entity.OrderResponse;
import com.example.demo.entity.Orders;
import com.example.demo.service.OrderService;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class OrderController {

    @Autowired
    private OrderService orderService;

    @RequestMapping("/getOrder")
    public List<OrderResponse> getOrder(@RequestParam("id") Integer id) {
        return orderService.getOrder(id);
    }

    @RequestMapping("/addOrder")
    public Msg addOrder(@RequestBody Orders data) {
        return orderService.addOrder(data);
    }

    @RequestMapping("/getOrderAdmin")
    public List<OrderResponse> getOrderAdmin(@RequestBody Map<String, String> params) {
        return orderService.getOrderAdmin();
    }
}
