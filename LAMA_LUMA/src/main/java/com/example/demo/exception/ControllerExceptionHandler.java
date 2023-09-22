package com.example.demo.exception;

import com.example.demo.exception.GlobalException;

import java.util.Date;
import java.util.Locale;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.context.MessageSource;

import com.example.demo.exception.ErrorResponse;
import com.example.demo.exception.ResourceDoesNotExists;

import lombok.RequiredArgsConstructor;


@ControllerAdvice
@RequiredArgsConstructor
public class ControllerExceptionHandler extends ResponseEntityExceptionHandler {

   @ExceptionHandler(GlobalException.class)
    protected ResponseEntity handleGlobalException (GlobalException e, Locale locale) {
        return ResponseEntity
            .badRequest()
            .body(ErrorResponse.builder().code(e.getCode()).message(getMessageSource().getMessage(e.getMessage(),null, locale)).build());
    }

    @ExceptionHandler({Exception.class})
    protected ResponseEntity handleException(Exception e, Locale locale) {
        return ResponseEntity
            .badRequest()
            .body("Exception occured inside API "+e);
    }

  // @ExceptionHandler(ResourceDoesNotExists.class)
  // public ResponseEntity<ErrorResponse> ResourceDoesNotExists(ResourceDoesNotExists ex, WebRequest request) {
  //   ErrorResponse message = new ErrorResponse(
  //       HttpStatus.NOT_FOUND.value(),
  //       new Date(),
  //       ex.getMessage(),
  //       request.getDescription(false), this);
    
  //   return new ResponseEntity<ErrorResponse>(message, HttpStatus.NOT_FOUND);
  // }

  // @ExceptionHandler(Exception.class)
  // public ResponseEntity<ErrorResponse> globalExceptionHandler(Exception ex, WebRequest request) {
  //   ErrorResponse message = new ErrorResponse(
  //       HttpStatus.INTERNAL_SERVER_ERROR.value(),
  //       new Date(),
  //       ex.getMessage(),
  //       request.getDescription(false), this);
    
  //   return new ResponseEntity<ErrorResponse>(message, HttpStatus.INTERNAL_SERVER_ERROR);
  // }
}