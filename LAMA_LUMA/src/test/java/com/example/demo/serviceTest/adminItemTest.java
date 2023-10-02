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
import org.springframework.test.web.servlet.MockMvc;

import com.example.demo.entity.Item;
import com.example.demo.entity.Item;
import com.example.demo.entity.Item;
import com.example.demo.entity.Item;
import com.example.demo.entity.Transactions;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.ItemRepository;
import com.example.demo.repository.TransactionRepository;
import com.example.demo.service.AdminItemServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest(
  webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class adminItemTest {

	@Autowired
	private MockMvc mvc;
	@Autowired
	private AdminItemServiceImpl adminItemService;
	@MockBean
	private ItemRepository itemRepo;
	
	@Test
	public void deleteItemWhenExists()
	{
		//Optional<Item> i = createItem();
		Mockito.when(itemRepo.existsById(Mockito.anyString())).thenReturn(true);
		Mockito.doNothing()
	       .when(itemRepo)
	       .deleteById(Mockito.anyString());
		ResponseEntity<String> r = adminItemService.deleteItem("123");
		assertEquals(HttpStatus.OK,r.getStatusCode());
	}
	
	@Test
	public void deleteItemWhenDoesNotExist()
	{
		Mockito.when(itemRepo.existsById(Mockito.anyString())).thenReturn(false);
		
		ResponseEntity<String> r = adminItemService.deleteItem("123");
		assertEquals(HttpStatus.NOT_FOUND,r.getStatusCode());
	}
	
	@Test
	public void updateItem()
	{		

		Item e = createNewItem();
		Mockito.when(itemRepo.save(e)).thenReturn(e);
		ResponseEntity<String> r = adminItemService.updateItem(e);
		assertEquals(HttpStatus.OK,r.getStatusCode());
	}
	
	@Test
	public void addItemAlreadyExists()
	{
		Item e = createNewItem();
		Mockito.when(itemRepo.existsById(Mockito.anyString())).thenReturn(true);
		ResponseEntity<String> r= adminItemService.createItem(e);
		assertEquals(HttpStatus.BAD_REQUEST,r.getStatusCode());
	}
	

	@Test
	public void addItemWhenDoesNotExist()
	{
		Item e = createNewItem();
		Mockito.when(itemRepo.existsById(Mockito.anyString())).thenReturn(false);
		Mockito.when(itemRepo.save(e)).thenReturn(e);
		ResponseEntity<String> r = adminItemService.createItem(e);
		assertEquals(HttpStatus.OK,r.getStatusCode());

	}
	
	@Test
	public void showItems()
	{
		List<Item> itemList = createItemList();
		Mockito.when(itemRepo.findAll()).thenReturn(itemList);
		List<Item> temp = adminItemService.showAllItems();
		assertNotNull(temp);
	}
	
	@Test
	public void getItemWhenExists()
	{
		Item e = createNewItem();
		Mockito.when(itemRepo.existsById(Mockito.anyString())).thenReturn(true);
		Mockito.when(itemRepo.getReferenceById(Mockito.anyString())).thenReturn(e);
		ResponseEntity<Item> r= adminItemService.getItem(Mockito.anyString());
		assertEquals(HttpStatus.OK,r.getStatusCode());
	}
	

	@Test
	public void getItemWhenNotExists()
	{
		Item e = createNewItem();
		Mockito.when(itemRepo.existsById(Mockito.anyString())).thenReturn(false);
		ResponseEntity<Item> r= adminItemService.getItem(Mockito.anyString());
		assertEquals(HttpStatus.NOT_FOUND,r.getStatusCode());
	}

	
	public Item createNewItem() {
		Item e = new Item();
		e.setItemId("123");
		return e;
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
