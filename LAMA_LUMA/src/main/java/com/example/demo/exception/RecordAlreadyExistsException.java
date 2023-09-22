package com.example.demo.exception;

public class RecordAlreadyExistsException extends GlobalException {
		public RecordAlreadyExistsException(String message, Long code) {
			super(message, code);
		}
	}
