package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;

@RestController
public class AdminController {
	@Autowired
	private AdminRepository adminRepo;
	
	@GetMapping("/")
	public String sayHEllo() {
		return "Hello deer";
	}
	@PostMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin) {
		return (Admin) adminRepo.save(admin) ;
	}

	@PostMapping("/login")
	public String validateLogin(@RequestBody Admin admin) {
		Admin tempAdmin=adminRepo.getReferenceById(admin.getAdminId());
		if(tempAdmin.getPassword().equals(admin.getPassword()))
			return "Successful Login";
		else
			return "Failed to Log In! Please Try Again";
	}

}
