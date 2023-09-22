package com.example.demo.exception;

import java.util.Date;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ErrorResponse {
  private int statusCode;
  private Date timestamp;
  private String message;
  private String description;
  private long code;
}


//   public ErrorResponse(int statusCode, Date timestamp, String message, String description) {
//     this.statusCode = statusCode;
//     this.timestamp = timestamp;
//     this.message = message;
//     this.description = description;
// 	this.code = code;
//   }

//   public int getStatusCode() {
//     return statusCode;
//   }

//   public Date getTimestamp() {
//     return timestamp;
//   }

//   public String getMessage() {
//     return message;
//   }

//   public String getDescription() {
//     return description;
//   }

  
//   public int getCode() {
//     return code;
//   }
// }

