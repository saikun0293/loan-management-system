package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Item;
import com.example.demo.repository.ItemRepository;


@Service
public class AdminItemServiceImpl implements AdminItemService {
	
	@Autowired
	ItemRepository itemRepo;

	@Override
	public ResponseEntity<String> createItem(Item item) {
		boolean exists=itemRepo.existsById(item.getItemId());
		if(exists)
		{		return new ResponseEntity<>("Item Already Exists!",HttpStatus.BAD_REQUEST);

		}
		else {
			itemRepo.save(item);
			return new ResponseEntity<>("Successfully added Item",HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<String> updateItem(Item item) {
		itemRepo.save(item);
		return new ResponseEntity<>("Successfully updated item",HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> deleteItem(String itemId) {
		boolean exists=itemRepo.existsById(itemId);
		if(!exists) {
			
			return new ResponseEntity<>("No record found with this ID",HttpStatus.NOT_FOUND);

		}
		
		itemRepo.deleteById(itemId);
		
		return new ResponseEntity<>("Successfully deleted record",HttpStatus.OK);
	}

	@Override
	public ResponseEntity<Item> getItem(String itemId) {
		boolean exists=itemRepo.existsById(itemId);
		if(!exists) {
			Item temp = null;
			return new ResponseEntity<>(temp,HttpStatus.NOT_FOUND);

		}
		
		Item item = itemRepo.getReferenceById(itemId);
		
		return new ResponseEntity<>(item,HttpStatus.OK);
	}

	
}
