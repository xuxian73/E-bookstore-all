package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartResponse;
import com.example.demo.service.CartService;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class CartController {

    @Autowired
    private CartService cartService;

    @RequestMapping("/getCart")
    public List<CartResponse> getCart(@RequestParam("id") Integer id) {
        return cartService.getCart(id);
    }

    @RequestMapping("/addCart")
    public Msg addCart(@RequestBody Cart data) {
        return cartService.addCart(data);
    }

    @RequestMapping("/deleteCart")
    public Msg deleteCart(@RequestBody Map<String, String> params) {
        return cartService.deleteCart(params);
    }
}
