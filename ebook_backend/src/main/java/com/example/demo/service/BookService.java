package com.example.demo.service;

import com.example.demo.entity.Book;
import com.example.demo.utils.msgutils.Msg;

import java.util.List;

public interface BookService {

    Book findBookById(Integer id);

    List<Book> getBooks();

    Boolean addBook(Book book);

    Boolean deleteBook(Integer id);

    Msg updateBook(Book book);
}
