package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Transactions;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.TransactionRepository;

@Service
public class AdminEmployeeServiceImpl implements AdminEmployeeService{
	
	@Autowired
	private AdminRepository adminRepo;
	@Autowired 
	private EmployeeRepository empRepo;
	
	@Autowired
	private TransactionRepository trxRepo;

	@Override
	public ResponseEntity<String> deleteEmployee(String id) {
		Optional<Employee> emp=empRepo.findById(id);
		  if(emp.isPresent()) {
				empRepo.deleteById(id);
				return new ResponseEntity<>("Successfully deleted employee",HttpStatus.OK);
			}
			else{
				
				return new ResponseEntity<>("No such Employee",HttpStatus.BAD_REQUEST);

			}
	}

	@Override
	public ResponseEntity<String> updateEmployee(Employee employee) {
		empRepo.save(employee);
		return new ResponseEntity<>("Successfully updated employee",HttpStatus.OK);
	}

	@Override
	public List<Employee> ShowAllEmployee() {
		// TODO Auto-generated method stub
		return empRepo.findAll();
		
	
	}
	
	public List<Transactions> showEmployeeTransaction(String employeeId){
		 List<Transactions> temp= trxRepo.findByemployeeId(employeeId);
		 return temp;
	}

	@Override
	public Employee addEmployee(Employee emp) {
		// TODO Auto-generated method stub
		
		boolean ifExists=empRepo.existsById(emp.getEmployeeId());
		if(ifExists)
		{
			Employee tempEmp=empRepo.getReferenceById(emp.getEmployeeId());
			return tempEmp;
		}
		else {
			return empRepo.save(emp);
		}
	}
}
