package com.example.demo.serviceimpl;

import com.example.demo.dao.BookDao;
import com.example.demo.entity.Book;
import com.example.demo.service.BookService;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookDao bookDao;

    @Override
    public Book findBookById(Integer id) { return bookDao.findOne(id); }

    @Override
    public List<Book> getBooks() { return bookDao.getBooks(); }

    @Override
    public Boolean addBook(Book book) { return bookDao.addBook(book); }

    @Override
    public Boolean deleteBook(Integer id) {return bookDao.deleteBook(id); }

    @Override
    public Msg updateBook(Book book) {return bookDao.updateBook(book);}
}
