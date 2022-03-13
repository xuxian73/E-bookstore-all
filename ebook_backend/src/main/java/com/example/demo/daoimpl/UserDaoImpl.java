package com.example.demo.daoimpl;

import com.example.demo.dao.UserDao;
import com.example.demo.entity.User;
import com.example.demo.entity.UserResponse;
import com.example.demo.repository.UserAuthRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.entity.UserAuth;

import com.example.demo.utils.msgutils.Msg;
import com.example.demo.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.LinkedList;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {

    @Autowired
    UserAuthRepository userAuthRepository;

    @Autowired
    UserRepository userRepository;

    @Override
    public UserAuth checkUser(String username, String password){

        return userAuthRepository.checkUser(username,password);
    }

    @Override
    public List<UserResponse> getUser() {
        List<UserResponse> responses = new LinkedList<>();
        List<User> userList = userRepository.getUser();
        for (User u: userList
             ) {
            UserAuth userAuth = userAuthRepository.getUserAuthById(u.getUserId());
            UserResponse tmp = new UserResponse();
            tmp.setUser_id(userAuth.getUserId());
            tmp.setUserType(userAuth.getUserType());
            tmp.setEnable(userAuth.getEnable());
            tmp.setUsername(u.getUsername());
            tmp.setEmail(u.getEmail());
            responses.add(tmp);
        }
        return responses;
    }

    @Override
    public Msg ChangeEnable(Integer user_id, Integer enable) {
        if (userAuthRepository.ChangeEnable(user_id, enable) == 1) {
            return MsgUtil.makeMsg(MsgUtil.SUCCESS, "Success: change user state!");
        } else {
            return MsgUtil.makeMsg(MsgUtil.ERROR, "Failed: change user state!");
        }
    }

    @Override
    public Msg register(String username, String password, String email) {
        User user = userRepository.getUserByName(username);
        if (user != null) {
            return MsgUtil.makeMsg(MsgUtil.ERROR, "Failed: duplicate username!");
        } else {
            Integer userId = userRepository.getNewUserId() + 1;
            User tmpUser = new User();
            UserAuth tmpUserAuth = new UserAuth();
            tmpUser.setUserId(userId);
            tmpUser.setUsername(username);
            tmpUser.setEmail(email);
            tmpUserAuth.setUserId(userId);
            tmpUserAuth.setUserType(0);
            tmpUserAuth.setUsername(username);
            tmpUserAuth.setEnable(1);
            tmpUserAuth.setPassword(password);
            userRepository.save(tmpUser);
            userAuthRepository.save(tmpUserAuth);
            return MsgUtil.makeMsg(MsgUtil.SUCCESS, "Success: register a new user!");
        }
    }

    @Override
    public Msg tryRegister(String username) {
        User user = userRepository.getUserByName(username);
        if (user != null) {
            System.out.println("Failed: dup");
            return MsgUtil.makeMsg(MsgUtil.ERROR, "Failed: duplicate username!");

        } else {
            System.out.println("Success: do no dup");
            return MsgUtil.makeMsg(MsgUtil.SUCCESS, "Success: do not duplicate");
        }
    }

    @Override
    public User getUserById(Integer id) {
        return userRepository.getUserById(id);
    }
}
