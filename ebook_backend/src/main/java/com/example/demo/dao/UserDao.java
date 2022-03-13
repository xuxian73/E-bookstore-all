package com.example.demo.dao;

import com.example.demo.entity.OrderResponse;
import com.example.demo.entity.User;
import com.example.demo.entity.UserAuth;
import com.example.demo.entity.UserResponse;
import com.example.demo.utils.msgutils.Msg;

import java.util.List;

public interface UserDao {

    public UserAuth checkUser(String username, String password);

    public List<UserResponse> getUser();

    public Msg ChangeEnable(Integer user_id, Integer enable);

    public Msg register(String username, String password, String email);

    public Msg tryRegister(String username);

    public User getUserById(Integer id);
}
