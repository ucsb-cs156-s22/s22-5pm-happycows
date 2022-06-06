package edu.ucsb.cs156.happiercows.advice;

import edu.ucsb.cs156.happiercows.errors.GenericError;
import edu.ucsb.cs156.happiercows.errors.CoffeeException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice

public class HappierCowsAdvice {
    
    @ExceptionHandler({IllegalArgumentException.class})
    public ResponseEntity<GenericError> handleIllegalArgumentException(IllegalArgumentException ex){
        final GenericError error = new GenericError(
            Integer.toString(HttpStatus.BAD_REQUEST.value()), 
            "Request has an illegal argument", 
            "Illegal Argument Exception", 
            ex.getMessage()
            );
        log.error("Exception Handler called for Illegal Argument Exception");  
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CoffeeException.class)
    public ResponseEntity<GenericError> handleCoffeeException(CoffeeException ex){
        final GenericError error = new GenericError(
            "418", 
            "Cannot make commons named Coffee", 
            "Coffee Exception", 
            "I am a teapot"
            );
        log.error("Exception Handler called for Coffee Exception");  
        return new ResponseEntity<>(error, HttpStatus.I_AM_A_TEAPOT);
    }
}
