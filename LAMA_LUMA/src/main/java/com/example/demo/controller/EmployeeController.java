package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Item;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.LoanCardRepository;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.service.EmployeeService;

@RestController
@CrossOrigin("http://localhost:3000")
public class EmployeeController {
	
	@Autowired 
	TransactionRepository trxRepo;
	
	@Autowired
	LoanCardRepository lcRepo;
	
	@Autowired
	ItemRepository itemRepo;
	
	@Autowired
	EmployeeService empService;
	
	@PostMapping("/employee/applyForLoan")
	public ResponseEntity<String> applyForLoan(@RequestParam(name="empId") String empId, @RequestParam(name="itemId") String itemId){
		return empService.applyForLoan(empId, itemId);
		
	}
	
	@GetMapping("/employee/getAllAvailableItems")
	public List<Item> getAllAvailableItems(){
		return empService.getAllAvailableItems();
	}
	

}
