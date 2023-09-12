package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="admin")
public class Admin {

	@Id
	@Column(name="admin_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)

	private int adminId;
//	public Admin() {
//
//		super();
//		this.adminId= "";
//		// TODO Auto-generated constructor stub
//	}
	@Column(name="name")
	private String name;
	
	@Column(name="password")
	private String password;
	
	public Admin(int adminId, String name, String password) {
		super();
		this.adminId = adminId;
		this.name = name;
		this.password = password;
	}
	public int getAdminId() {
		return adminId;
	}
	public void setAdminId(int adminId) {
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
