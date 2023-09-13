package com.example.demo.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.example.demo.entity.Employee;

public interface AdminEmployeeService {
	public ResponseEntity<String> deleteEmployee(String id);
	public ResponseEntity<String> updateEmployee(Employee emp);
	public List<Employee> ShowAllEmployee();
	public Employee addEmployee(Employee emp);
	

}
