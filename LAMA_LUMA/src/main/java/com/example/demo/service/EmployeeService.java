package com.example.demo.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entity.LoanCards;
import com.example.demo.entity.Transactions;
import com.example.demo.entity.Item;


@Service
public interface EmployeeService {
	
	public ResponseEntity<String> applyForLoan(String employeeId, String ItemId);
	public List<Item> getAllAvailableItems();
	//public List<Item> getAllAppliedItems();
	public List<Map<String, Object>> getAllAppliedItems(String employeeId);
	public Set<LoanCards> getAllAppliedLoans(String employeeId);
	

}
