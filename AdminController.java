package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Employee;
import com.example.demo.entity.Loan_cards;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.AdminService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private AdminService adminService;
	@Autowired
	private EmployeeRepository empRepo;
	
	
	
	@PostMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin) {
		return (Admin) adminRepo.save(admin) ;
	}
	//for push
	
	@PostMapping("/adminLogin")
	public ResponseEntity<String> validateAdminLogin(@RequestBody Admin admin) {
		boolean exists=adminRepo.existsById(admin.getAdminId());
		if(!exists) {
			return new ResponseEntity<>("no such admin",HttpStatus.BAD_REQUEST);

		}
		Admin tempAdmin = adminRepo.getReferenceById(admin.getAdminId());
		
		if( tempAdmin.getPassword().equals(admin.getPassword()) ) {
			return new ResponseEntity<>("Successfully logged in",HttpStatus.OK);

		}
		else return new ResponseEntity<>("Incorrect credentials, please try again!",HttpStatus.UNAUTHORIZED);

	}
	
	@PostMapping("/addEmployee")
	public ResponseEntity<String> addEmployee(@RequestBody Employee employee) {
		boolean ifExists=empRepo.existsById(employee.getEmployeeId());
		if(ifExists)
		{		return new ResponseEntity<>("Employee with this id already exists!",HttpStatus.BAD_REQUEST);

		}
		else {
			empRepo.save(employee);
			return new ResponseEntity<>("Successfully added employee",HttpStatus.OK);
		}
	}
	
	@GetMapping("/showAllEmployees")
	public List<Employee> showAllEmployees(){
		return empRepo.findAll();
	}
	
	@PostMapping("/updateEmployee")
	public ResponseEntity<String> updateEmployee(@RequestBody Employee employee) {
			empRepo.save(employee);
			return new ResponseEntity<>("Successfully updated employee",HttpStatus.OK);
		}
	
		/*
		 * @DeleteMapping("/deleteEmployee/{id}") public ResponseEntity<String>
		 * deleteEmployee(@RequestBody Employee employee, @PathVariable("id") String id) {
		 * boolean ifExists=empRepo.existsById(employee.getEmployeeId()); if(!ifExists)
		 * { return new ResponseEntity<>("No such Employee",HttpStatus.BAD_REQUEST); }
		 * else{ empRepo.deleteById(id+""); return new
		 * ResponseEntity<>("Successfully deleted employee",HttpStatus.OK); }
		 * 
		 * }
		 */
	
	@PostMapping("/createLoanCard")
	public ResponseEntity<String> createLoanCard(@RequestBody Loan_cards loan) {
		return adminService.createLoanCardService(loan);
		
	}
	
	@PostMapping("/updateLoanCard")
	public ResponseEntity<String> updateLoanCard(@RequestBody Loan_cards loan) {
		return adminService.updateLoanCardService(loan);
		
	}
	
	@GetMapping("/getLoanCard/{id}")
	public ResponseEntity<Loan_cards> getLoanCard(@PathVariable("id") String loan_id) {
		return adminService.getLoanCardService(loan_id);
		
	}
	
	@DeleteMapping("/deleteLoanCard/{id}")
	public ResponseEntity<String> deleteLoanCard(@PathVariable("id") String loan_id) {
		return adminService.deleteLoanCardService(loan_id);
		
	}
}


