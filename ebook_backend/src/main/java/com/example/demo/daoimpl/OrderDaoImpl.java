package com.example.demo.daoimpl;

import com.example.demo.dao.OrderDao;
import com.example.demo.entity.*;
import com.example.demo.repository.*;
import com.example.demo.utils.msgutils.Msg;
import com.example.demo.utils.msgutils.MsgUtil;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.*;

@Repository
public class OrderDaoImpl implements OrderDao {

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrdersRepository ordersRepository;

    @Override
    public List<OrderResponse> getOrder(Integer id) {
        List<OrderResponse> responses = new LinkedList<>();
//        List<Order> orderList = orderRepository.getOrderById(id);
//        System.out.println(orderList);
//        for (Order order: orderList
//             ) {
//            OrderResponse tmp = new OrderResponse();
//            Book book = bookRepository.getBookByBookId(order.getBookId());
//            tmp.setBook_id(book.getBookId());
//            tmp.setBook(book);
//            tmp.setAuthor(book.getAuthor());
//            tmp.setDescription(book.getDescription());
//            tmp.setImage(book.getImage());
//            tmp.setName(book.getName());
//            tmp.setPrice(book.getPrice());
//            tmp.setDate(order.getDate());
//            tmp.setQuantity(order.getQuantity());
//            responses.add(tmp);
//        }
        List<Orders> ordersList = ordersRepository.getOrdersByUserId(id);
        System.out.println(ordersList);
        for (Orders orders : ordersList) {
            User user = userRepository.getUserById(orders.getUser_id());
            for (OrderItem orderItem : orders.getOrderItems()) {
                OrderResponse tmp = new OrderResponse();
                Book book = bookRepository.getBookByBookId(orderItem.getBook_id());
                tmp.setBook_id(book.getBookId());
                tmp.setBook(book);
                tmp.setAuthor(book.getAuthor());
                tmp.setDescription(book.getDescription());
                tmp.setImage(book.getImage());
                tmp.setName(book.getName());
                tmp.setPrice(book.getPrice());
                tmp.setDate(orders.getDate());
                tmp.setQuantity(orderItem.getQuantity());
                tmp.setUsername(user.getUsername());
                responses.add(tmp);
            }
        }
        return responses;
    }

    @Override
    public List<OrderResponse> getOrderAdmin() {
        List<OrderResponse> responses = new LinkedList<>();
        List<OrderItem> orderItemList = orderItemRepository.getOrderItem();
        List<Orders> ordersList = ordersRepository.getOrders();

        for (OrderItem orderItem:
             orderItemList) {
            User user = userRepository.getUserById(orderItem.getOrders().getUser_id());
            OrderResponse tmp = new OrderResponse();
            Book book = bookRepository.getBookByBookId(orderItem.getBook_id());
            tmp.setBook_id(book.getBookId());
            tmp.setAuthor(book.getAuthor());
            tmp.setDescription(book.getDescription());
            tmp.setImage(book.getImage());
            tmp.setName(book.getName());
            tmp.setPrice(book.getPrice());
            tmp.setDate(orderItem.getOrders().getDate());
            tmp.setQuantity(orderItem.getQuantity());
            tmp.setUsername(user.getUsername());
            responses.add(tmp);
        }
        return responses;
    }

    @Override
    public Msg addOrder(Orders data) {
        System.out.println(data.getOrderItems().size());
        List<OrderItem> orderItemList = data.getOrderItems();
        data.setOrderItems(new ArrayList<>());
        for (OrderItem orderItem: orderItemList
             ) {
            data.addOrderItem(orderItem);
        }
        ordersRepository.save(data);
        return MsgUtil.makeMsg(MsgUtil.SUCCESS, "Success: place an order!");
    }

    @Override
    public Msg getUserStastics(Integer id) {
        List<Orders> ordersList = ordersRepository.getOrdersByUserId(id);
        Integer num = ordersRepository.getUserTotalNum(id);
        BigDecimal money = ordersRepository.getUserTotalMoney(id);
        System.out.println(money);
        JSONObject data = new JSONObject();
        data.put("num", num);
        data.put("money", money);
        Integer code = 0, literature = 0, education = 0, science = 0, others = 0;
        BigDecimal mcode = BigDecimal.ZERO, mliterature = BigDecimal.ZERO, meducation = BigDecimal.ZERO, mscience = BigDecimal.ZERO, mothers = BigDecimal.ZERO;
        for (Orders orders: ordersList
             ) {
            for (OrderItem orderItem: orders.getOrderItems()
                 ) {
                Book book = bookRepository.getBookByBookId(orderItem.getBook_id());
                if (book == null) continue;
                BigDecimal quantity = new BigDecimal(orderItem.getQuantity());
                switch (book.getType()) {
                    case "Code" :
                        code += orderItem.getQuantity();
                        mcode = mcode.add(book.getPrice().multiply(quantity)) ;
                        break;
                    case "Literature" :
                        literature += orderItem.getQuantity();
                        mliterature = mliterature.add(quantity.multiply(book.getPrice())) ;
                        break;
                    case "Science" :
                        science += orderItem.getQuantity();
                        mscience = mscience.add(quantity.multiply(book.getPrice())) ;
                        break;
                    case "Education":
                        education += orderItem.getQuantity();
                        meducation = meducation.add(quantity.multiply(book.getPrice()));
                        break;
                    default:
                        others += orderItem.getQuantity();
                        mothers = mothers.add(quantity.multiply(book.getPrice()));
                }
            }
        }
        JSONObject Code = new JSONObject(), Literature = new JSONObject(), Education = new JSONObject(), Science = new JSONObject(), Others = new JSONObject();
        Code.put("type", "Code"); Code.put("num", code); Code.put("money", mcode);
        Literature.put("type", "Literature");Literature.put("num", literature); Literature.put("money", mliterature);
        Education.put("type", "Education"); Education.put("num", education); Education.put("money", meducation);
        Science.put("type", "Science"); Science.put("num", science); Science.put("money", mscience);
        Others.put("type", "Others"); Others.put("num", others); Others.put("money", mothers);
        JSONArray array = new JSONArray();
        array.add(Code); array.add(Literature); array.add(Education); array.add(Science); array.add(Others);
        data.put("details", array);
        return MsgUtil.makeMsg(MsgUtil.SUCCESS, "Success: get user stastics", data);
    }

    @Override
    public Msg getHotBook(String value) {
        long minus = 0;
        String t = "last-week";
        if (value.equals(t)){
            System.out.println("Last-week");
            minus = 604800000l;
        }
        else if (value.equals("last-month")) minus = 2592000000l;
        else if (value.equals("last-three-month")) minus = 7776000000l;
        else if (value.equals("last-half-year")) minus = 15552000000l;
        else if (value.equals("last-year")) minus = 31536000000l;

        Date date = new Date();
        System.out.println(minus);

        if (minus != 0l)
            date.setTime(date.getTime()-minus);
        else date.setTime(0);
        System.out.println(date);
        List<Object[]> objectList = orderItemRepository.getHotBook(date);
        JSONArray response = new JSONArray();
        for (Object[] object: objectList
        ) {
            for (int i = 0; i < object.length; i += 2) {
                JSONObject tmp = new JSONObject();
                tmp.put("book_id", object[i]);
                tmp.put("quantity", object[i+1]);
                Book book = bookRepository.getBookByBookId(Integer.parseInt(object[i].toString()));
                if (book == null) continue;
                tmp.put("type", book.getType());
                tmp.put("name", book.getName());
                response.add(tmp);
            }
        }
        return MsgUtil.makeMsg(MsgUtil.SUCCESS, "Success", response);
    }

    @Override
    public Msg getHotUser(String value) {
        long minus = 0;
        String t = "last-week";
        if (value.equals(t)){
            System.out.println("Last-week");
            minus = 604800000l;
        }
        else if (value.equals("last-month")) minus = 2592000000l;
        else if (value.equals("last-three-month")) minus = 7776000000l;
        else if (value.equals("last-half-year")) minus = 15552000000l;
        else if (value.equals("last-year")) minus = 31536000000l;

        Date date = new Date();
        System.out.println(minus);

        if (minus != 0l)
            date.setTime(date.getTime()-minus);
        else date.setTime(0);
        System.out.println(date);
        List<Object[]> objectList = ordersRepository.getHotUser(date);
        JSONArray response = new JSONArray();
        for (Object[] object: objectList
        ) {
            for (int i = 0; i < object.length; i += 3) {
                JSONObject tmp = new JSONObject();
                tmp.put("user_id", object[i]);
                tmp.put("money", object[i+2]);
                tmp.put("quantity", object[i+1]);
                User user = userRepository.getUserById(Integer.parseInt(object[i].toString()));
                tmp.put("username", user.getUsername());
                response.add(tmp);
            }
        }
        return MsgUtil.makeMsg(MsgUtil.SUCCESS, "Success", response);
    }
}
