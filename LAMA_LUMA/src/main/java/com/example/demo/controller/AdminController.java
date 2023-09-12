package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Employee;
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
	public String addEmployee(@RequestBody Employee employee) {
		boolean ifExists=empRepo.existsById(employee.getEmployeeId());
		if(ifExists)
		{return "Employee with this id already exists!";
		}
		else {
			empRepo.save(employee);
			return "Successfully created employee";
		}
	}

}
