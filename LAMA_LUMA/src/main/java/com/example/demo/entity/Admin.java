package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class Admin {

	@Id
	@Column
	private String adminId;
	public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Column
	private String name;
	@Column
	private String password;
	public Admin(String adminId, String name, String password) {
		super();
		this.adminId = adminId;
		this.name = name;
		this.password = password;
	}
	public String getAdminId() {
		return adminId;
	}
	public void setAdminId(String adminId) {
		this.adminId = adminId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
}