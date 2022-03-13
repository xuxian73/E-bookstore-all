package com.example.demo.dao;

import com.example.demo.entity.Book;
import com.example.demo.utils.msgutils.Msg;

import java.util.List;

public interface BookDao {
    Book findOne(Integer id);

    List<Book> getBooks();

    Boolean addBook(Book book);

    Boolean deleteBook(Integer id);

    Msg updateBook(Book book);
}
