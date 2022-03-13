package com.example.demo.controller;

import com.example.demo.dao.StasticsDao;
import com.example.demo.service.OrderService;
import com.example.demo.service.StasticsService;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class StasticsController {

    @Autowired
    private StasticsService stasticsService;

    @Autowired
    private OrderService orderService;

    @RequestMapping("/userStastics")
    public Msg getUserStastics(@RequestParam("id") Integer id) { return orderService.getUserStastics(id); }

    @RequestMapping("/getHotBook")
    public Msg getHotBook(@RequestBody Map<String, String> params) {
        String date = params.get("date");
        System.out.println(date);
        return orderService.getHotBook(date);
    }

    @RequestMapping("/getHotUser")
    public Msg getHotUser(@RequestBody Map<String, String> params) {
        String date = params.get("date");
        System.out.println(date);
        return orderService.getHotUser(date);
    }
}
