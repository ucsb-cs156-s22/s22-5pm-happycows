package edu.ucsb.cs156.happiercows.errors;

public class EntityNameTakenException extends RuntimeException {

  public EntityNameTakenException(Class<?> entityType, String name) {
    super("%s with name %s already exists"
    .formatted(entityType.getSimpleName(), name));
  }
  
}