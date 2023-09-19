package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;

@Service
public class AdminLoginServiceImpl implements AdminLoginService {

	@Autowired
	private AdminRepository adminRepo;

	public String login(Admin admin) {
		boolean ifExists = checkIfAdminExists(admin.getAdminId());
		if (!ifExists)
			return "User not found";
		Admin tempAdmin = adminRepo.getReferenceById(admin.getAdminId());
		return tempAdmin.getPassword().equals(admin.getPassword()) ? "pass" : "fail";
	}

	public boolean checkIfAdminExists(String adminId) {
		return adminRepo.existsById(adminId);
	}
}
