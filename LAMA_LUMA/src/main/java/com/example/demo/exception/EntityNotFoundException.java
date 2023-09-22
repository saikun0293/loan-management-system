package com.example.demo.exception;

import com.example.demo.exception.GlobalErrorCode;

public class EntityNotFoundException  extends GlobalException{

    public EntityNotFoundException(){
        super("exception.user.not.found", GlobalErrorCode.ERROR_ENTITY_NOT_FOUND);
    }

    public EntityNotFoundException(String message, Long code) {
        super(message, code);
    }

}
