package com.example.demo.entity;

import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

public class Item {
	
	@Id
	@NotBlank
	public String itemId;
	public String itemDesc;
	public char itemStatus;
	public String itemMake;
	public String itemCategory;
	public int itemValue;

	
	public Item() {
		super();
		// TODO Auto-generated constructor stub
	}


	public String getItemId() {
		return itemId;
	}


	public void setItemId(String itemId) {
		this.itemId = itemId;
	}


	public String getItemDesc() {
		return itemDesc;
	}


	public void setItemDesc(String itemDesc) {
		this.itemDesc = itemDesc;
	}


	public char getItemStatus() {
		return itemStatus;
	}


	public void setItemStatus(char itemStatus) {
		this.itemStatus = itemStatus;
	}


	public String getItemMake() {
		return itemMake;
	}


	public void setItemMake(String itemMake) {
		this.itemMake = itemMake;
	}


	public String getItemCategory() {
		return itemCategory;
	}


	public void setItemCategory(String itemCategory) {
		this.itemCategory = itemCategory;
	}


	public int getItemValue() {
		return itemValue;
	}


	public void setItemValue(int itemValue) {
		this.itemValue = itemValue;
	}
	
	
	
	

}
