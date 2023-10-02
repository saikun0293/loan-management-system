package com.example.demo.serviceTest;



import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
//import org.mockito.Mockito;
import org.mockito.Mockito.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Transactions;

import com.example.demo.repository.EmployeeRepository;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.service.AdminEmployeeServiceImpl;
import com.example.demo.service.EmployeeService;
import static org.junit.Assert.*;

import jakarta.annotation.PostConstruct;

@RunWith(SpringRunner.class)
@SpringBootTest(
  webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc

public class adminEmployeeTest {
	
	@Autowired
	private MockMvc mvc;
	@Autowired
	private AdminEmployeeServiceImpl adminEmpService;
	@MockBean
	private EmployeeRepository empRepo;
	@MockBean
	private TransactionRepository trxRepo;
	
	
	@Test
	public void deleteEmployeeWhenExists()
	{
		Optional<Employee> e = createOptionalEmployee();
		Mockito.when(empRepo.findById(Mockito.anyString())).thenReturn(e);
		Mockito.doNothing()
	       .when(empRepo)
	       .deleteById(Mockito.anyString());
		ResponseEntity<String> r = adminEmpService.deleteEmployee("123");
		assertEquals(HttpStatus.OK,r.getStatusCode());
	}
	
	@Test
	public void deleteEmployeeWhenDoesNotExist()
	{
		Mockito.when(empRepo.findById(Mockito.anyString())).thenReturn(Optional.empty());
		
		ResponseEntity<String> r = adminEmpService.deleteEmployee("123");
		assertEquals(HttpStatus.BAD_REQUEST,r.getStatusCode());
	}
	
	@Test
	public void updateEmployee()
	{		

		Employee e = createNewEmployee();
		Mockito.when(empRepo.save(e)).thenReturn(e);
		ResponseEntity<String> r = adminEmpService.updateEmployee(e);
		assertEquals(HttpStatus.OK,r.getStatusCode());
	}
	
	@Test
	public void addEmployeeAlreadyExists()
	{
		Employee e = createNewEmployee();
		Mockito.when(empRepo.existsById(Mockito.anyString())).thenReturn(true);
		Mockito.when(empRepo.getReferenceById(Mockito.anyString())).thenReturn(e);
		Employee temp = adminEmpService.addEmployee(e);
		assertNotNull(temp);
	}
	

	@Test
	public void addEmployeeWhenDoesNotExist()
	{
		Employee e = createNewEmployee();
		Mockito.when(empRepo.existsById(Mockito.anyString())).thenReturn(false);
		Mockito.when(empRepo.save(e)).thenReturn(e);
		Employee temp = adminEmpService.addEmployee(e);
		assertNotNull(temp);
	}
	
	@Test
	public void showEmployees()
	{
		List<Employee> empList = createEmpList();
		Mockito.when(empRepo.findAll()).thenReturn(empList);
		List<Employee> temp = adminEmpService.ShowAllEmployee();
		assertNotNull(temp);
	}
	
	@Test
	public void showEmployeeTransactions()
	{
		List<Transactions> transactionList = createTransactionList();
		Mockito.when(trxRepo.findByemployeeId(Mockito.anyString())).thenReturn(transactionList);
		List<Transactions> temp = adminEmpService.showEmployeeTransaction(Mockito.anyString());
		assertNotNull(temp);
	}
	
	
	public List<Employee> createEmpList() {
		// TODO Auto-generated method stub
		List<Employee> list = new ArrayList<Employee>();
		for(int i=0;i<4;i++) {
			Employee e = new Employee();
			e.setEmployeeId("123"+i);
			list.add(e);
		}
		return list;
	}
	public List<Transactions> createTransactionList() {
		// TODO Auto-generated method stub
		List<Transactions> list = new ArrayList<Transactions>();
		for(int i=0;i<4;i++) {
			Transactions t = new Transactions();
			t.setTransactionId("123"+i);
			list.add(t);
		}
		return list;
	}

	public Optional<Employee> createOptionalEmployee() {
		Employee e = new Employee();
		e.setEmployeeId("123");
		return Optional.of(e);
	}
	
	public Employee createNewEmployee() {
		Employee e = new Employee();
		e.setEmployeeId("123");
		return e;
	}
    
}
