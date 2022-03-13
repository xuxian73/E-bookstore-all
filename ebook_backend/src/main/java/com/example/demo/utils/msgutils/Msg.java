package com.example.demo.utils.msgutils;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class Msg {
    private int status;
    private String msg;
    private JSONObject data;
    private JSONArray array;
    public JSONArray getArray() {
        return array;
    }

    public void setArray(JSONArray array) {
        this.array = array;
    }

    Msg(MsgCode msg, JSONObject data){
        this.status = msg.getStatus();
        this.msg = msg.getMsg();
        this.data = data;
    }

    Msg(MsgCode msg, String extra, JSONObject data){
        this.status = msg.getStatus();
        this.msg = extra;
        this.data = data;
    }

    Msg(MsgCode msg){
        this.status = msg.getStatus();
        this.msg = msg.getMsg();
        this.data = null;
    }

    Msg(MsgCode msg, String extra){
        this.status = msg.getStatus();
        this.msg = extra;
        this.data = null;
    }

    Msg(int status, String extra, JSONObject data){
        this.status = status;
        this.msg = extra;
        this.data = data;
    }

    Msg(int status, String extra){
        this.status = status;
        this.msg = extra;
        this.data = null;
    }

    Msg(int status, String msg, JSONArray array) {
        this.status = status;
        this.msg = msg;
        this.array = array;
        this.data = null;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public JSONObject getData() {
        return data;
    }

    public void setData(JSONObject data) {
        this.data = data;
    }






}
