package com.example.demo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name="employee_details")
public class Employee {

	@Id
	@Column(name="emp_id")
	private String employeeId;
	public Employee() {
		super();
		// TODO Auto-generated constructor stub
	}
	@Column(name="name")
	private String name;
	@Column(name="password")
	private String password;
	public Employee(String employeeId, String name, String password) {
		super();
		this.employeeId = employeeId;
		this.name = name;
		this.password = password;
	}
	public String getEmployeeId() {
		return employeeId;
	}
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
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
