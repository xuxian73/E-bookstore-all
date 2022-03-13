package com.example.demo.service;
import com.example.demo.entity.User;
import com.example.demo.entity.UserAuth;
import com.example.demo.entity.UserResponse;
import com.example.demo.utils.msgutils.Msg;

import java.util.List;

public interface UserService {

    UserAuth checkUser(String username, String password);

    List<UserResponse> getUser();

    Msg ChangeEnable(Integer user_id, Integer enable);

    Msg register(String username, String password, String email);

    Msg tryRegister(String username);

    User getUserById(Integer id);
}
