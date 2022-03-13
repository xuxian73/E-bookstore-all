package com.example.demo.repository;

import com.example.demo.entity.Cart;
import com.example.demo.entity.CartId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Integer> {

    @Query("from Cart where user_id = :id")
    List<Cart> getCartById(Integer id);

    @Query("from Cart where book_id = :book_id and user_id = :user_id")
    Cart getCartByCartId(Integer book_id, Integer user_id);


}
