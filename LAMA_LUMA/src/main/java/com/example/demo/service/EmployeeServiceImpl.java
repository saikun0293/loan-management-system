package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.demo.entity.Item;
import com.example.demo.entity.LoanCards;

public class EmployeeServiceImpl implements EmployeeService{

	@Override
	public ResponseEntity<String> applyForLoan(String employeeId, String ItemId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Item> getAllAvailableItems() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<LoanCards> getAllAppliedLoans() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Item> getAllAppliedItems() {
		// TODO Auto-generated method stub
		return null;
	}

}
