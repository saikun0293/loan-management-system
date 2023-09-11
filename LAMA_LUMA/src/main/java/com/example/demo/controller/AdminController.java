package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Employee;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.EmployeeRepository;

@RestController
public class AdminController {
	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private EmployeeRepository employeeRepo;
	
	@GetMapping("/")
	public String sayHello() {
		return "Hello!";
	}
	@PostMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin) {
		return (Admin) adminRepo.save(admin) ;
	}

	@PostMapping("/addEmployee")
	public Employee addEmployee(@RequestBody Employee employee) {
		return (Employee) employeeRepo.save(employee) ;
	}

	@PostMapping("/login")
	public String validateLogin(@RequestBody Admin admin , @RequestBody Employee employee) {
		Admin tempAdmin=adminRepo.getReferenceById(admin.getAdminId());
		Employee tempEmployee=employeeRepo.getReferenceById(employee.getEmployeeId());
		if(tempAdmin.getPassword().equals(admin.getPassword()) || tempEmployee.getPassword().equals(employee.getPassword()))
			return "Successful Login";
		else
			return "Failed to Log In! Please Try Again";
	}

}