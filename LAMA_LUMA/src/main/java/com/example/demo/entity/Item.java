package com.example.demo.entity;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Table(name = "Item")
@Entity
public class Item implements Serializable{
	@Id
	@NotBlank(message = "Item id cannot be empty.")
	@Column(unique=true)
	private String itemId;
	@Column
	private String itemDesc;
	@Column
	private char itemStatus;
	@Column
	private String itemMake;
	@Column
	private String itemCategory;
	@Column
	private int itemValue;
	@Column
	private String loanId;

	
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
	
	public String getLoanId() {
		return loanId;
	}


	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}	

}
