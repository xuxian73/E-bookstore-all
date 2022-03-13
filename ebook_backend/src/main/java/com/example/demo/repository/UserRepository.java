package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User,String> {

    @Query("from User where userId = :id")
    public User getUserById(Integer id);

    @Query("from User")
    public List<User> getUser();

    @Query("from User where username = :username")
    public User getUserByName(String username);

    @Query("SELECT MAX(userId) FROM User")
    public Integer getNewUserId();

}
