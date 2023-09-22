package com.example.demo.exception;

import java.util.Date;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import com.example.demo.exception.ErrorResponse;
import com.example.demo.exception.ResourceDoesNotExists;

@ControllerAdvice
public class ControllerExceptionHandler {

  @ExceptionHandler(ResourceDoesNotExists.class)
  public ResponseEntity<ErrorResponse> ResourceDoesNotExists(ResourceDoesNotExists ex, WebRequest request) {
    ErrorResponse message = new ErrorResponse(
        HttpStatus.NOT_FOUND.value(),
        new Date(),
        ex.getMessage(),
        request.getDescription(false));
    
    return new ResponseEntity<ErrorResponse>(message, HttpStatus.NOT_FOUND);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResponse> globalExceptionHandler(Exception ex, WebRequest request) {
    ErrorResponse message = new ErrorResponse(
        HttpStatus.INTERNAL_SERVER_ERROR.value(),
        new Date(),
        ex.getMessage(),
        request.getDescription(false));
    
    return new ResponseEntity<ErrorResponse>(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}