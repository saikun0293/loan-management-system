package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Employee;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;

@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
	@Autowired
	private AdminRepository adminRepo;
	@Autowired
	private EmployeeRepository empRepo;
	
	@GetMapping("/")
	public String sayHello() {
		return "Hello!";
	}
	@PostMapping("/addAdmin")
	public Admin addAdmin(@RequestBody Admin admin) {
		return (Admin) adminRepo.save(admin) ;
	}

	@PostMapping("/addCustomer")
	public Employee addCustomer(@RequestBody Employee employee) {
		boolean ifExists=empRepo.existsById(employee.getEmployeeId());
		if(ifExists)
		{
			Employee tempEmp=empRepo.getReferenceById(employee.getEmployeeId());
			return tempEmp;
		}
		else {
			return empRepo.save(employee);
		}
	}

	 @DeleteMapping("/employee/{id}")	
	public ResponseEntity<String> deleteEmployee(@RequestBody Employee employee, @PathVariable("id") int id) { {
      boolean ifExists=empRepo.existsById(employee.getEmployeeId());
	  if(!ifExists) {
			return new ResponseEntity<>("No such Employee",HttpStatus.BAD_REQUEST);
		}
		else{
			empRepo.deleteById(id+"");
			return new ResponseEntity<>("Successfully deleted employee",HttpStatus.OK);
		}

   }
}
}

