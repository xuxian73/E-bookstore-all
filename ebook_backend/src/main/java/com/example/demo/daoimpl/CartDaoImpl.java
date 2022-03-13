package com.example.demo.daoimpl;

import com.example.demo.dao.CartDao;
import com.example.demo.entity.Book;
import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import com.example.demo.entity.CartResponse;
import com.example.demo.repository.BookRepository;
import com.example.demo.repository.CartRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.msgutils.Msg;
import com.example.demo.utils.msgutils.MsgCode;
import com.example.demo.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@Repository
public class CartDaoImpl implements CartDao {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<CartResponse> getCart(Integer id) {
        List<CartResponse> responses = new LinkedList<>();
        List<Cart> cartList = cartRepository.getCartById(id);
        System.out.println(cartList);
        for (Cart c: cartList
             ) {
            Book b = bookRepository.getBookByBookId(c.getBookId());
            CartResponse tmp = new CartResponse();
            tmp.setAuthor(b.getAuthor());
            tmp.setDescription(b.getDescription());
            tmp.setImage(b.getImage());
            tmp.setName(b.getName());
            tmp.setUnitprice(b.getPrice());
            tmp.setBook_id(b.getBookId());
            tmp.setQuantity(c.getQuantity());
            BigDecimal quantity = new BigDecimal(tmp.getQuantity());
            tmp.setPrice(tmp.getUnitprice().multiply(quantity));
            responses.add(tmp);
        }
        return responses;
    }

    @Override
    public Msg addCart(Cart data) {
        CartId id = data.getCartId();
        Cart c = cartRepository.getCartByCartId(id.getBook_id(), id.getUser_id());
        if (c == null) {
            cartRepository.save(data);
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "Success: add to cart!");
        } else {
            return MsgUtil.makeMsg(MsgCode.SUCCESS, "Failed: already in cart!");

        }
    }

    @Override
    public Msg deleteCart(Map<String, String> params) {
        Integer user_id = Integer.parseInt(params.get("user_id"));
        Integer book_id = Integer.parseInt(params.get("book_id"));
        System.out.println(user_id);
        System.out.println(book_id);
        Cart c = cartRepository.getCartByCartId(book_id, user_id);
        if (c == null) {
            return MsgUtil.makeMsg(MsgUtil.ERROR, "Failed: do not have this item in database");
        } else {
            cartRepository.delete(cartRepository.getCartByCartId(book_id, user_id));
            return MsgUtil.makeMsg(MsgUtil.SUCCESS, "Success: delete cart from database!");
        }
    }
}
