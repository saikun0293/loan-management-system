package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table
public class LoanCards { // db for the admin creating loan cards

	@Id
	@NotBlank
	@Column(unique=true)
	private String loanId;
	
	@Column
	private String loanType;
	
	@Column
	private int duration;

	public String getloanId() {
		return loanId;
	}

	public void setloanId(String loanId) {
		this.loanId = loanId;
	}

	public String getloanType() {
		return loanType;
	}

	public void setloanType(String loanType) {
		this.loanType = loanType;
	}

	public int getDuration() {
		return duration;
	}

	public void setDuration(int duration) {
		this.duration = duration;
	}
	
}