package com.example.demo.service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entity.LoanCards;
import com.example.demo.repository.LoanCardRepository;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class AdminLoanServiceImpl implements AdminLoanService {
	
	@Autowired
	LoanCardRepository lcRepo;

	@Override
	public ResponseEntity<String> createLoanCard(LoanCards loan) {
		boolean exists=lcRepo.existsById(loan.getloanId());
		if(exists)
		{		return new ResponseEntity<>("Loan card with this id already exists!",HttpStatus.BAD_REQUEST);

		}
		else {
			lcRepo.save(loan);
			return new ResponseEntity<>("Successfully added loan card",HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<String> updateLoanCard(LoanCards loan) {
		lcRepo.save(loan);
		return new ResponseEntity<>("Successfully updated loan card",HttpStatus.OK);
	}

	@Override
	public ResponseEntity<LoanCards> getLoanCard(String loanId) {
		boolean exists=lcRepo.existsById(loanId);
		if(!exists) {
			LoanCards temp = null;
			return new ResponseEntity<>(temp,HttpStatus.NOT_FOUND);

		}
		
		LoanCards loanCard = lcRepo.getReferenceById(loanId);
		
		return new ResponseEntity<>(loanCard,HttpStatus.OK);

	}

	@Override
	public ResponseEntity<String> deleteLoanCard(String loanId) {
		boolean exists=lcRepo.existsById(loanId);
		if(!exists) {
			
			return new ResponseEntity<>("No record found with this ID",HttpStatus.NOT_FOUND);

		}
		
		lcRepo.deleteById(loanId);
		
		return new ResponseEntity<>("Successfully deleted record",HttpStatus.OK);
	}

}
