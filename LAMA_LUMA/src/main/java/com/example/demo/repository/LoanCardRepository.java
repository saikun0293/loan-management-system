package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//import com.example.demo.entity.Employee;
import com.example.demo.entity.LoanCards;
@Repository
public interface LoanCardRepository extends JpaRepository<LoanCards, String>{
	LoanCards findByloanType(String loanType);

}