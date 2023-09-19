package com.example.demo.service;

import com.example.demo.entity.Admin;

public interface AdminLoginService {

	public String login(Admin admin);

	public boolean checkIfAdminExists(String adminId);
}
