package com.example.demo.serviceimpl;

import com.example.demo.dao.CartDao;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartResponse;
import com.example.demo.service.CartService;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartDao cartDao;

    @Override
    public List<CartResponse> getCart(Integer id) {return cartDao.getCart(id);}

    @Override
    public Msg addCart(Cart data) {
        return cartDao.addCart(data);
    }

    @Override
    public Msg deleteCart(Map<String , String> params) {
        return cartDao.deleteCart(params);
    }
}
