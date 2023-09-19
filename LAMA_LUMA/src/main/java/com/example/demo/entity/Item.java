package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity
public class Item {
	
	@Id
	@Column(unique=true)
	@NotBlank
	private String itemId;
	public String getLoanId() {
		return loanId;
	}


	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}


	@Column
	private String name;
	@Column
	private char issueStatus;
	@Column
	private String make;
	@Column
	private String category;
	@Column
	private int value;
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
		return name;
	}


	public void setItemDesc(String name) {
		this.name = name;
	}


	public char getItemStatus() {
		return issueStatus;
	}


	public void setItemStatus(char issueStatus) {
		this.issueStatus = issueStatus;
	}


	public String getItemMake() {
		return make;
	}


	public void setItemMake(String make) {
		this.make = make;
	}


	public String getItemCategory() {
		return category;
	}


	public void setItemCategory(String category) {
		this.category = category;
	}


	public int getItemValue() {
		return value;
	}


	public void setItemValue(int value) {
		this.value = value;
	}
	
	
	
	

}
