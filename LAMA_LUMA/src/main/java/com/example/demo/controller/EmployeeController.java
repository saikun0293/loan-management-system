package com.example.demo.controller;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Item;
import com.example.demo.entity.LoanCards;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.LoanCardRepository;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.service.EmployeeService;

@RestController
@PreAuthorize("hasAuthority('EMPLOYEE')")
@RequestMapping("/employee")
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

	@GetMapping("/getAllAppliedItems") // need to be checked and tested again
	public List<Map<String, Object>> getAllAppliedItems(@RequestParam(name = "empId") String empId) {
		return empService.getAllAppliedItems(empId);
	}

	@PostMapping("/applyForLoan")
	public ResponseEntity<String> applyForLoan(@RequestParam(name = "empId") String empId,
			@RequestParam(name = "itemId") String itemId) {
		return empService.applyForLoan(empId, itemId);
	}

	@GetMapping("/getAllAvailableItems")
	public List<Item> getAllAvailableItems() {
		return empService.getAllAvailableItems();
	}

	@GetMapping("/getAllAppliedLoans") // need to be checked and tested again
	public Set<LoanCards> getAllAppliedLoans(@RequestParam(name = "empId") String empId) {
		return empService.getAllAppliedLoans(empId);
	}
}
