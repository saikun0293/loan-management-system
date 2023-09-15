package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
public class Item {
	
	@Id
	@Column(unique=true)
	@NotBlank
	public String itemId;
	@Column
	public String itemDesc;
	@Column
	public char itemStatus;
	@Column
	public String itemMake;
	@Column
	public String itemCategory;
	@Column
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
