package com.example.demo.serviceTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import com.example.demo.entity.LoanCards;
import com.example.demo.repository.LoanCardRepository;
import com.example.demo.service.AdminLoanServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest(
  webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class adminLoanTest {

	@Autowired
	private MockMvc mvc;
	@Autowired
	private AdminLoanServiceImpl adminLoanService;
	@MockBean
	private LoanCardRepository LoanRepo;
	
	@Test
	public void deleteLoanWhenExists()
	{
		//Optional<Loan> i = createLoan();
		Mockito.when(LoanRepo.existsById(Mockito.anyString())).thenReturn(true);
		Mockito.doNothing()
	       .when(LoanRepo)
	       .deleteById(Mockito.anyString());
		ResponseEntity<String> r = adminLoanService.deleteLoanCard("123");
		assertEquals(HttpStatus.OK,r.getStatusCode());
	}
	
	@Test
	public void deleteLoanWhenDoesNotExist()
	{
		Mockito.when(LoanRepo.existsById(Mockito.anyString())).thenReturn(false);
		
		ResponseEntity<String> r = adminLoanService.deleteLoanCard("123");
		assertEquals(HttpStatus.NOT_FOUND,r.getStatusCode());
	}
	
	@Test
	public void updateLoan()
	{		

		LoanCards e = createNewLoan();
		Mockito.when(LoanRepo.save(e)).thenReturn(e);
		ResponseEntity<String> r = adminLoanService.updateLoanCard(e);
		assertEquals(HttpStatus.OK,r.getStatusCode());
	}
	
	@Test
	public void addLoanAlreadyExists()
	{
		LoanCards e = createNewLoan();
		Mockito.when(LoanRepo.existsById(Mockito.anyString())).thenReturn(true);
		ResponseEntity<String> r= adminLoanService.createLoanCard(e);
		assertEquals(HttpStatus.BAD_REQUEST,r.getStatusCode());
	}
	

	@Test
	public void addLoanWhenDoesNotExist()
	{
		LoanCards e = createNewLoan();
		Mockito.when(LoanRepo.existsById(Mockito.anyString())).thenReturn(false);
		Mockito.when(LoanRepo.save(e)).thenReturn(e);
		ResponseEntity<String> r = adminLoanService.createLoanCard(e);
		assertEquals(HttpStatus.OK,r.getStatusCode());

	}
	
	@Test
	public void showLoans()
	{
		List<LoanCards> LoanList = createLoanList();
		Mockito.when(LoanRepo.findAll()).thenReturn(LoanList);
		List<LoanCards> temp = adminLoanService.showAllLoanCards();
		assertNotNull(temp);
	}
	
	@Test
	public void getLoanWhenExists()
	{
		LoanCards e = createNewLoan();
		Mockito.when(LoanRepo.existsById(Mockito.anyString())).thenReturn(true);
		Mockito.when(LoanRepo.getReferenceById(Mockito.anyString())).thenReturn(e);
		ResponseEntity<LoanCards> r= adminLoanService.getLoanCard(Mockito.anyString());
		assertEquals(HttpStatus.OK,r.getStatusCode());
	}
	

	@Test
	public void getLoanWhenNotExists()
	{
		LoanCards e = createNewLoan();
		Mockito.when(LoanRepo.existsById(Mockito.anyString())).thenReturn(false);
		ResponseEntity<LoanCards> r= adminLoanService.getLoanCard(Mockito.anyString());
		assertEquals(HttpStatus.NOT_FOUND,r.getStatusCode());
	}

	
	public LoanCards createNewLoan() {
		LoanCards e = new LoanCards();
		e.setloanId("123");
		return e;
	}
	
	public List<LoanCards> createLoanList() {
		// TODO Auto-generated method stub
		List<LoanCards> list = new ArrayList<LoanCards>();
		for(int i=0;i<4;i++) {
			LoanCards e = new LoanCards();
			e.setloanId("123"+i);
			list.add(e);
		}
		return list;
	}
}
