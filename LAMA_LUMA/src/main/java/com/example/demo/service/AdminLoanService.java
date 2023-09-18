package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.demo.entity.LoanCards;

public interface AdminLoanService {
	public ResponseEntity<String> createLoanCard(LoanCards loan);
	public ResponseEntity<String> updateLoanCard(LoanCards loan);
	public ResponseEntity<String> deleteLoanCard(String loanId);
	public ResponseEntity<LoanCards> getLoanCard(String loanId);
	public List<LoanCards> showAllLoanCards();

}
