package com.example.demo.dao;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartResponse;
import com.example.demo.utils.msgutils.Msg;

import java.util.List;
import java.util.Map;

public interface CartDao {
    public List<CartResponse> getCart(Integer id);

    public Msg addCart(Cart data);

    public Msg deleteCart(Map<String , String> params);
}
