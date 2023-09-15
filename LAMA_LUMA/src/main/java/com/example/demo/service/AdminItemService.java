package com.example.demo.service;

import org.springframework.http.ResponseEntity;

import com.example.demo.entity.Item;

public interface AdminItemService {
	public ResponseEntity<String> createItem(Item item);
	public ResponseEntity<String> updateItem(Item item);
	public ResponseEntity<String> deleteItem(String itemId);
	public ResponseEntity<Item> getItem(String itemId);

}
