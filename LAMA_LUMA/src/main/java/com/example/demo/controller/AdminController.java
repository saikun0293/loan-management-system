package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;
import com.example.demo.service.AdminService;

@RestController
public class AdminController {
	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private AdminService adminService;
	
	
	@PostMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin) {
		return (Admin) adminRepo.save(admin) ;
	}
	//for push
	
	@PostMapping("/adminLogin")
	public String validateAdminLogin(@RequestBody Admin admin) {
		Admin tempAdmin = adminRepo.getReferenceById(admin.getAdminId());
		return tempAdmin.getPassword().equals(admin.getPassword()) ? "pass" : "fail";
	}

}
