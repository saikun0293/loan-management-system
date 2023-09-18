package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entity.Transactions;


@Repository
public interface TransactionRepository  extends JpaRepository<Transactions, String>{
	List <Transactions> findByemployeeId(String employeeId);
	List <Transactions> findByItemId(String itemId);
	

}
