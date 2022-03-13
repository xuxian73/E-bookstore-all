package com.example.demo.utils.msgutils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * @ClassName Msg
 * @Description TODO
 * @Author thunderBoy
 * @Date 2019/11/7 14:32
 */
public class MsgUtil {

    public static final int SUCCESS = 0;
    public static final int ERROR = -1;
    public static final int LOGIN_USER_ERROR = -100;
    public static final int NOT_LOGGED_IN_ERROR = -101;

    public static final String SUCCESS_MSG = "Success！";
    public static final String LOGIN_SUCCESS_MSG = "Success: Log in！";
    public static final String LOGOUT_SUCCESS_MSG = "Success: Log out！";
    public static final String LOGOUT_ERR_MSG = "Failed: Log out error！";
    public static final String ERROR_MSG = "Error！";
    public static final String LOGIN_USER_ERROR_MSG = "用户名或密码错误，请重新输入！";
    public static final String NOT_LOGGED_IN_ERROR_MSG = "Failed to log in, log in again！";



    public static com.example.demo.utils.msgutils.Msg makeMsg(com.example.demo.utils.msgutils.MsgCode code, JSONObject data){
        return new com.example.demo.utils.msgutils.Msg(code, data);
    }

    public static com.example.demo.utils.msgutils.Msg makeMsg(com.example.demo.utils.msgutils.MsgCode code, String msg, JSONObject data){
        return new com.example.demo.utils.msgutils.Msg(code, msg, data);
    }

    public static com.example.demo.utils.msgutils.Msg makeMsg(com.example.demo.utils.msgutils.MsgCode code){
        return new com.example.demo.utils.msgutils.Msg(code);
    }

    public static com.example.demo.utils.msgutils.Msg makeMsg(com.example.demo.utils.msgutils.MsgCode code, String msg){
        return new com.example.demo.utils.msgutils.Msg(code, msg);
    }

    public static com.example.demo.utils.msgutils.Msg makeMsg(int status, String msg, JSONObject data){
        return new com.example.demo.utils.msgutils.Msg(status, msg, data);
    }

    public static com.example.demo.utils.msgutils.Msg makeMsg(int status, String msg){
        return new com.example.demo.utils.msgutils.Msg(status, msg);
    }

    public static Msg makeMsg(int status, String msg, JSONArray array) {
        return new Msg(status, msg, array);
    }
}
