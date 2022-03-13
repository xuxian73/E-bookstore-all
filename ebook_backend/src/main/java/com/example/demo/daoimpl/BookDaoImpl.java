package com.example.demo.daoimpl;

import com.example.demo.dao.BookDao;
import com.example.demo.entity.Book;
import com.example.demo.repository.BookRepository;
import com.example.demo.utils.msgutils.Msg;
import com.example.demo.utils.msgutils.MsgUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookDaoImpl implements BookDao {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public Book findOne(Integer id) { return bookRepository.getOne(id); }

    @Override
    public List<Book> getBooks() {
        return bookRepository.getBooks();
    }

    @Override
    public Boolean addBook(Book book) {
        Book b = bookRepository.getBookByBookId(book.getBookId());
        if (b != null) {
            return false;
        } else {
            bookRepository.save(book);
            return true;
        }
    }

    @Override
    public Boolean deleteBook(Integer id) {
        Book b = bookRepository.getBookByBookId(id);
        if (b == null) {
            return false;
        } else {
            bookRepository.deleteById(id);
            return true;
        }
    }

    @Override
    public Msg updateBook(Book book) {
        Book b = bookRepository.getBookByBookId(book.getBookId());
        if (b == null) {
            return MsgUtil.makeMsg(MsgUtil.ERROR, "Failed: No such book in database!");
        } else {
            bookRepository.saveAndFlush(book);
            return MsgUtil.makeMsg(MsgUtil.SUCCESS, "Success: update book!");
        }
    }
}
