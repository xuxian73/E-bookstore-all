package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.UserAuth;
import com.example.demo.entity.UserResponse;
import com.example.demo.service.UserService;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @ClassName UserController
 * @Description the controller of user
 * @Author thunderBoy
 * @Date 2019/11/7 13:47
 */
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/register")
    public Msg register(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");
        String email = params.get("email");
        return userService.register(username, password, email);
    }

    @RequestMapping("/tryRegister")
    public Msg tryRegister(@RequestBody Map<String, String> params) {
        System.out.println("tri");
        String username = params.get("username");
        return userService.tryRegister(username);
    }

    @RequestMapping("/checkUser")
    public UserAuth checkUser(@RequestParam("username") String username,@RequestParam("password") String password){
        return userService.checkUser(username, password);
    }

    @RequestMapping("/getUser")
    public List<UserResponse> getUser(@RequestBody Map<String, String> params) {
        return userService.getUser();
    }

    @RequestMapping("/ChangeEnable")
    public Msg ChangeEnable(@RequestParam("user_id") Integer user_id, @RequestParam("enable") Integer enable) {
        return userService.ChangeEnable(user_id, enable);
    }
}
