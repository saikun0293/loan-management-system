package com.example.demo.exception;

public class GlobalException extends RuntimeException {

    private Long code;

    public GlobalException (String message, Long code) {
        super(message);
        this.code = code;
    }

    public Long getCode() {
        return code;
    }

}
