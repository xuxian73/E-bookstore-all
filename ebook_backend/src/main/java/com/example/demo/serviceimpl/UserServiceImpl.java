package com.example.demo.serviceimpl;
import com.example.demo.entity.User;
import com.example.demo.entity.UserResponse;
import com.example.demo.service.UserService;
import com.example.demo.entity.UserAuth;
import com.example.demo.dao.UserDao;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserDao userDao;

    @Override
    public UserAuth checkUser(String username, String password){
        return userDao.checkUser(username,password);
    }

    @Override
    public List<UserResponse> getUser() { return userDao.getUser(); }

    @Override
    public Msg ChangeEnable(Integer user_id, Integer enable) {
        return userDao.ChangeEnable(user_id, enable);
    }

    @Override
    public Msg register(String username, String password, String email) {
        return userDao.register(username, password,email);
    }

    @Override
    public Msg tryRegister(String username) {
        return userDao.tryRegister(username);
    }

    @Override
    public User getUserById(Integer id) {
        return userDao.getUserById(id);
    }
}
