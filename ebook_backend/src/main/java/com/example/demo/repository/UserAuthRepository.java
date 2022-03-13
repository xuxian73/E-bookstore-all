package com.example.demo.repository;

import com.example.demo.entity.UserAuth;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;

public interface UserAuthRepository extends JpaRepository<UserAuth,String> {

    @Query(value = "from UserAuth where username = :username and password = :password")
    UserAuth checkUser(@Param("username") String username, @Param("password") String password);

    @Query("from UserAuth where userId = :user_id")
    UserAuth getUserAuthById(Integer user_id);

    @Transactional
    @Modifying
    @Query("update UserAuth a set a.enable = :enable where a.userId = :user_id")
    int ChangeEnable(Integer user_id, Integer enable);
}
