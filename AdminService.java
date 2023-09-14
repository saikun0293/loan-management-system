package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entity.Loan_cards;
import com.example.demo.repository.LoanCardsRepository;

@Service
public class AdminService {
	@Autowired
	LoanCardsRepository loanCardsRepo;

	public ResponseEntity<String> createLoanCardService( Loan_cards loan){
		boolean exists=loanCardsRepo.existsById(loan.getloanId());
		if(exists)
		{		return new ResponseEntity<>("Loan card with this id already exists!",HttpStatus.BAD_REQUEST);

		}
		else {
			loanCardsRepo.save(loan);
			return new ResponseEntity<>("Successfully added loan card",HttpStatus.OK);
		}
	}
	
	public ResponseEntity<String> updateLoanCardService( Loan_cards loan){
		
			loanCardsRepo.save(loan);
			return new ResponseEntity<>("Successfully updated loan card",HttpStatus.OK);
		
	}
	
	public ResponseEntity<Loan_cards> getLoanCardService( String loan_id){
		boolean exists=loanCardsRepo.existsById(loan_id);
		if(!exists) {
			Loan_cards temp = null;
			return new ResponseEntity<>(temp,HttpStatus.NOT_FOUND);

		}
		
		Loan_cards loanCard = loanCardsRepo.getReferenceById(loan_id);
		
		return new ResponseEntity<>(loanCard,HttpStatus.OK);

		
		
	}
	
	public ResponseEntity<String> deleteLoanCardService( String loan_id){
		boolean exists=loanCardsRepo.existsById(loan_id);
		if(!exists) {
			
			return new ResponseEntity<>("No record found with this ID",HttpStatus.NOT_FOUND);

		}
		
		loanCardsRepo.deleteById(loan_id);
		
		return new ResponseEntity<>("Successfully deleted record",HttpStatus.OK);

		
		
	}
}
