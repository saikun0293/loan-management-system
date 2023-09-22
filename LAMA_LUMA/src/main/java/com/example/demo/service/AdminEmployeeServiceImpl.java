package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Transactions;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.TransactionRepository;

@Service
public class AdminEmployeeServiceImpl implements AdminEmployeeService {

	@Autowired
	private EmployeeRepository empRepo;

	@Autowired
	private TransactionRepository trxRepo;

	@Autowired
	private PasswordEncoder encoder;

	@Override
	public ResponseEntity<String> deleteEmployee(String id) {
		Optional<Employee> emp = empRepo.findById(id);
		if (emp.isPresent()) {
			empRepo.deleteById(id);
			return new ResponseEntity<>("Successfully deleted employee", HttpStatus.OK);
		} else {

			return new ResponseEntity<>("No such Employee", HttpStatus.BAD_REQUEST);

		}
	}

	@Override
	public Employee getEmployeeById(String id) {
		Optional<Employee> emp = empRepo.findById(id);
		if (emp.isPresent())
			return emp.get();
		return null;
	}

	@Override
	public ResponseEntity<String> updateEmployee(Employee employee) {
		empRepo.save(employee);
		return new ResponseEntity<>("Successfully updated employee", HttpStatus.OK);
	}

	@Override
	public List<Employee> ShowAllEmployee() {
		return empRepo.findAll();
	}

	public List<Transactions> showEmployeeTransaction(String employeeId) {
		List<Transactions> temp = trxRepo.findByemployeeId(employeeId);
		return temp;
	}

	// encode password for auth purposes
	@Override
	public Employee addEmployee(Employee emp) {
		boolean ifExists = empRepo.existsById(emp.getEmployeeId());
		if (ifExists) {
			Employee tempEmp = empRepo.getReferenceById(emp.getEmployeeId());
			return tempEmp;
		} else {
			emp.setPassword(encoder.encode(emp.getPassword()));
			return empRepo.save(emp);
		}
	}
}
