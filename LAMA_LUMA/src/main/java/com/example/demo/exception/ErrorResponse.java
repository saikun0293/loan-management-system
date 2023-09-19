package com.example.demo.exception;

public class ErrorResponse {
	private String errorMessage;
	private int statusCode;
	
	public ErrorResponse(int code, String str) {
		this.errorMessage=str;
		this.statusCode=code;
	}
	public String getErrorMessage() {
		return errorMessage;
	}
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	public int getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(int statusCode) {
		this.statusCode = statusCode;
	}
	
	

}
