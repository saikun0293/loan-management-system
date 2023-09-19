package com.example.demo.entity;

import java.util.Date;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity

@Table
public class Transactions {

	//no field can be blank in this table as they all act as foreign keys for some other table
	@Id
	@Column(unique=true)
	@NotBlank(message="Transaction ID cannot be blank")
	private String transactionId;
	
	@Column
	@NotBlank
	private String employeeId;
	
	@Column
	@NotBlank
	private String itemId;
	
	@Column
	//@NotBlank
	private String loanId;
	
	@Column
	//@NotBlank
	private Date issueDate;
	
	public String getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}

	public String getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}

	public String getItemId() {
		return itemId;
	}

	public void setItemId(String itemId) {
		this.itemId = itemId;
	}

	public String getLoanId() {
		return loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
	}

	public Date getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}

	
}
