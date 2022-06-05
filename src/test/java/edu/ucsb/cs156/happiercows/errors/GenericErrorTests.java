package edu.ucsb.cs156.happiercows.errors;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Test;

public class GenericErrorTests {
    @Test
    public void validGenericErrorConstruct(){
        String testStatus = "400";
        String testMessage = "Request has an invalid parameter";
        String testExceptionType = "Illegal Argument Exception";
        String testReason = "Cow Price must be an Integer";

        GenericError testError = new GenericError("400", 
            "Request has an invalid parameter", 
            "Illegal Argument Exception", 
            "Cow Price must be an Integer");

        assertEquals(testError.getStatus(),testStatus);
        assertEquals(testError.getMessage(),testMessage);
        assertEquals(testError.getExceptionType(),testExceptionType);
        assertEquals(testError.getReason(),testReason);
    }
}
