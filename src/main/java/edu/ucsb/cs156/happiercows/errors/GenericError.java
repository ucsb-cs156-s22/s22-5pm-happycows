package edu.ucsb.cs156.happiercows.errors;

import java.util.Map;

public class GenericError {
    /* Explanation for the parameters of the Generic Error Class and their usage:
    Status: Provides an easy way to access the HTTP Response Code for an Error, should always be provided

    Message: Provides specifics on WHAT occured, for example 'id 0 not found', not always necessary, will often be a restatement of the exception
    type but in some cases a message separate from the exception type may be useful

    Exception Type: Supplemental to Message, is name of the Exception that occured, should always be provided

    Reason: Provides specifics on WHY the error occured, for example 'cowPrice must be greater than 0', not always necessary

    Between the last 3 parameters there is a lot of overlap and redundancy, that is on purpose, there may exist scenarios where all 3 are necessary
    and some where none are necessary. It is up to the discretion of the user of this class on how detailed they want their errors to be,
    these are guidelines and not rules.
    */
    private final String status;
    private final String message;
    private final String exceptionType;
    private final String reason;

    public GenericError(final String status, final String message, final String exceptionType, final String reason){
        this.status = status;
        this.message = message;
        this.exceptionType = exceptionType;
        this.reason = reason;
    }

    public Map<String, Object> toAttributeMap() {
        return Map.of(
          "status", status,
          "message", message,
          "exceptionType", exceptionType,
          "reason", reason
        );
    }

    public String getStatus(){
        return this.status;
    }

    public String getMessage(){
        return this.message;
    }

    public String getExceptionType(){
        return this.exceptionType;
    }

    public String getReason(){
        return this.reason;
    }
}

