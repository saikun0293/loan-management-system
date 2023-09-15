package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Item;
import com.example.demo.entity.LoanCards;
import com.example.demo.exception.NoDataFoundException;
import com.example.demo.exception.RecordAlreadyExistsException;
import com.example.demo.exception.ResourceDoesNotExists;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.AdminEmployeeService;
import com.example.demo.service.AdminItemService;
import com.example.demo.service.AdminLoanService;
import com.example.demo.service.AdminLoginService;

@RestController
public class AdminController {
	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private EmployeeRepository empRepo;
	
	@Autowired
	AdminLoginService loginService;
	
	@Autowired
	AdminEmployeeService adminservice;
	
	@Autowired
	AdminLoanService adminloan;
	
	@Autowired
	AdminItemService adminItem;
	
	
	@GetMapping("/")
	public String sayHello() {
		return "Hello!";
	}
	@PostMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin) {
		return (Admin) adminRepo.save(admin) ;
	}

	@PostMapping("/addEmployee")
	public Employee addCustomer(@RequestBody Employee employee) throws RecordAlreadyExistsException {
		Employee temp= adminservice.addEmployee(employee);
		return temp;
	}
	
	@GetMapping("/showAllEmployee")
	public List<Employee> showallcust() throws NoDataFoundException{
		return adminservice.ShowAllEmployee();
	}
	
	 @DeleteMapping("/deleteEmployee/{id}")	
		public ResponseEntity<String> deleteEmployee(@PathVariable("id") String id) throws ResourceDoesNotExists {
		 return adminservice.deleteEmployee(id);
	   
	}
	
	 @PostMapping("/updateEmployee")
		public ResponseEntity<String> updateEmployee(@RequestBody Employee employee) {
				return adminservice.updateEmployee(employee);
			}

	@PostMapping("/login")
	public String login(@RequestBody Admin admin) {
		System.out.println(admin.getAdminId());
		return loginService.login(admin);
	}
	
	
	@PostMapping("/createLoanCard")
	public ResponseEntity<String> createLoanCard(@RequestBody LoanCards loan) {
		return adminloan.createLoanCard(loan);
		
	}
	
	@PostMapping("/updateLoanCard")
	public ResponseEntity<String> updateLoanCard(@RequestBody LoanCards loan) {
		return adminloan.updateLoanCard(loan);
		
	}
	
	@GetMapping("/getLoanCard/{id}")
	public ResponseEntity<LoanCards> getLoanCard(@PathVariable("id") String loan_id) {
		return adminloan.getLoanCard(loan_id);
		
	}
	
	@DeleteMapping("/deleteLoanCard/{id}")
	public ResponseEntity<String> deleteLoanCard(@PathVariable("id") String loan_id) {
		return adminloan.deleteLoanCard(loan_id);
		
	}
	
	//Item CRUD Calls

	@PostMapping("/createItem")
	public ResponseEntity<String> createItem(@RequestBody Item item) {
		return adminItem.createItem(item);
		
	}
	
	@PostMapping("/updateItem")
	public ResponseEntity<String> updateItem(@RequestBody Item item) {
		return adminItem.updateItem(item);
		
	}
	
	@GetMapping("/getItem/{id}")
	public ResponseEntity<Item> getItem(@PathVariable("id") String itemId) {
		return adminItem.getItem(itemId);
		
	}
	
	@DeleteMapping("/deleteItem/{id}")
	public ResponseEntity<String> deleteItem(@PathVariable("id") String itemId) {
		return adminItem.deleteItem(itemId);
		
	}
	

}
