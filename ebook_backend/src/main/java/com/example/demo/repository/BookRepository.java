package com.example.demo.repository;

import com.example.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Map;

public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query("select b from Book b")
    List<Book> getBooks();

    @Query("from Book where bookId = :id")
    Book getBookByBookId(Integer id);

    @Query("select type,sum(sales) from Book group by type order by sum(sales)")
    Map<String, Integer> getHotType();

    @Query("from Book order by sales")
    List<Book> getHotBook();
}
