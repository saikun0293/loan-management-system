package com.example.demo.serviceTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.example.demo.entity.Item;
import com.example.demo.entity.Transactions;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.LoanCardRepository;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.service.EmployeeServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest(
  webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class employeeServiceTest {
	@Autowired
	EmployeeServiceImpl empService;
	@MockBean
	ItemRepository itemRepo;
	
	@MockBean 
	TransactionRepository trxRepo;
	
	@MockBean
	LoanCardRepository lcRepo;
	@MockBean
	Transactions trx;
	

	@Test
	public void getAllItemsAvailableTest()
	{
		List<Item> ItemList = createItemList();
		Mockito.when(itemRepo.findAll()).thenReturn
		(ItemList);
		List<Item> temp = empService.getAllAvailableItems();
		assertNotNull(temp);
	}
	
	@Test
	public void applyForLoanItemPresent() {
		Optional<Item> i = createNewItem();
		Item i2 = new Item();
		i2.setItemId("124");
		Mockito.when(itemRepo.findById(Mockito.anyString())).thenReturn(i);
		Mockito.when(itemRepo.getReferenceById(Mockito.anyString())).thenReturn(i2);
		Mockito.doNothing().when(trx).setLoanId(Mockito.anyString());


		Mockito.when(trxRepo.save(Mockito.any())).thenReturn(null);
		ResponseEntity<String> r = empService.applyForLoan("123","123");
		assertEquals(HttpStatus.OK,r.getStatusCode());

	}
	
	@Test
	public void applyForLoanItemNotPresent() {
		Mockito.when(itemRepo.findById(Mockito.anyString())).thenReturn(Optional.empty());
		ResponseEntity<String> r = empService.applyForLoan("123","123");
		assertEquals(HttpStatus.BAD_REQUEST,r.getStatusCode());

	}
	
	public Optional<Item> createNewItem() {
		Item e = new Item();
		e.setItemId("123");
		return Optional.of(e);
	}
	
	public List<Item> createItemList() {
		// TODO Auto-generated method stub
		List<Item> list = new ArrayList<Item>();
		for(int i=0;i<4;i++) {
			Item e = new Item();
			e.setItemId("123"+i);
			list.add(e);
		}
		return list;
	}

}
