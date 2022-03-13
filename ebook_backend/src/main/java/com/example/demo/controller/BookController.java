package com.example.demo.controller;
import com.example.demo.entity.Book;
import com.example.demo.service.BookService;
import com.example.demo.utils.msgutils.Msg;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class BookController {

    @Autowired
    private BookService bookService;

    @RequestMapping("/getBooks")
    public List<Book> getBooks(@RequestBody Map<String, String> params) {
        return bookService.getBooks();
    }

    @RequestMapping("/getBook")
    public Book getBook(@RequestParam("id") Integer id) { return bookService.findBookById(id); }

    @RequestMapping("/addBook")
    public Boolean addBook(@RequestBody Book book) {
        return bookService.addBook(book);
    }

    @RequestMapping("/deleteBook")
    public Boolean deleteBook(@RequestParam("id") Integer id) {
        return bookService.deleteBook(id);
    }

    @RequestMapping("/updateBook")
    public Msg updateBook(@RequestBody Book book) {
        return bookService.updateBook(book);
    }
}
