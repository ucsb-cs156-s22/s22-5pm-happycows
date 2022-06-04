package edu.ucsb.cs156.happiercows.services;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.models.CurrentUser;

public abstract class CurrentUserService {
  public abstract User getUser();
  public abstract CurrentUser getCurrentUser();
  public abstract Collection<? extends GrantedAuthority> getRoles();
  public boolean hasRole(String role){
    for(GrantedAuthority auth : getRoles()){
      if(auth.getAuthority().contains(role)){
        return true;
      }
    }

    return false;
  }
  public boolean isAdmin(){
    return hasRole("ROLE_ADMIN");
  }
  public boolean isRegularUser(){
    return hasRole("ROLE_USER");
  }

  public final boolean isLoggedIn() {
    return getUser() != null;
  }

}
