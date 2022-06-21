package edu.ucsb.cs156.happiercows.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.errors.EntityNotFoundException;
import edu.ucsb.cs156.happiercows.models.CurrentUser;
import edu.ucsb.cs156.happiercows.controllers.ApiController;
import edu.ucsb.cs156.happiercows.services.CurrentUserService;
import edu.ucsb.cs156.happiercows.services.CurrentUserServiceImpl;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

import org.springframework.http.ResponseEntity;

import org.springframework.security.access.AccessDeniedException;

import javax.validation.Valid;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Api(description = "User Commons")
@RequestMapping("/api/usercommons")
@RestController
public class UserCommonsController extends ApiController {

  @Autowired
  private UserCommonsRepository userCommonsRepository;

  @Autowired
  private CommonsRepository commonsRepository;

  @Autowired
  ObjectMapper mapper;

  @ApiOperation(value = "Get a specific user commons (admin only)")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @GetMapping("")
  public UserCommons getUserCommonsById(
      @ApiParam("userId") @RequestParam Long userId,
      @ApiParam("commonsId") @RequestParam Long commonsId) throws JsonProcessingException {

    UserCommons userCommons = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId)
        .orElseThrow(
            () -> new EntityNotFoundException(UserCommons.class, "commonsId", commonsId, "userId", userId));
    return userCommons;
  }

  @ApiOperation(value = "Get all user commons with a specific commonsId")
  @GetMapping("/allwithcommonsid")
  public Iterable<UserCommons> getAllUserCommonsByCommonsId(
    @ApiParam("commonsId") @RequestParam Long commonsId) throws JsonProcessingException {
      // method inherited from ApiController
      boolean isAdmin = hasRole("ROLE_ADMIN");

      Commons commons = commonsRepository.findById(commonsId)
        .orElseThrow(() -> new EntityNotFoundException(Commons.class, commonsId));

      if(!isAdmin && !commons.getLeaderboard()){
        throw new AccessDeniedException("Non admin users are not authorized to see the leaderboard for this commons");
      }
    
      // we purposely don't check for a throw here, similar to UCSBDiningCommonsController
      Iterable<UserCommons> userCommons = userCommonsRepository.findAllByCommonsId(commonsId);
      return userCommons;
  }

  @ApiOperation(value = "Get a user commons for current user")
  @PreAuthorize("hasRole('ROLE_USER')")
  @GetMapping("/forcurrentuser")
  public UserCommons getUserCommonsById(
      @ApiParam("commonsId") @RequestParam Long commonsId) throws JsonProcessingException {

    User u = getCurrentUser().getUser();
    Long userId = u.getId();
    UserCommons userCommons = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId)
        .orElseThrow(
            () -> new EntityNotFoundException(UserCommons.class, "commonsId", commonsId, "userId", userId));
    return userCommons;
  }

  @ApiOperation(value = "Delete a UserCommons")
  @PreAuthorize("hasRole('ROLE_ADMIN')")
  @DeleteMapping("")
  public Object deleteUserCommons(
      @ApiParam("userId") @RequestParam Long userId,
      @ApiParam("commonsId") @RequestParam Long commonsId) throws JsonProcessingException{
    UserCommons userCommons = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId)
        .orElseThrow(
          () -> new EntityNotFoundException(UserCommons.class, "commonsId", commonsId, "userId", userId));

    Commons c = commonsRepository.findById(commonsId).orElseThrow( ()->new EntityNotFoundException(Commons.class, commonsId));

    c.setTotalPlayers(c.getTotalPlayers() - 1);
    commonsRepository.save(c);
    
    userCommonsRepository.delete(userCommons);
    return genericMessage("UserCommons with commonsId %s and userId %s deleted".formatted(commonsId, userId));
  }

  @ApiOperation(value = "Buy a cow, totalWealth updated")
  @PreAuthorize("hasRole('ROLE_USER')")
  @PutMapping("/buy")
  public ResponseEntity<String> putUserCommonsByIdBuy(
          @ApiParam("commonsId") @RequestParam Long commonsId) throws JsonProcessingException {

        User u = getCurrentUser().getUser();
        Long userId = u.getId();

        Commons commons = commonsRepository.findById(commonsId).orElseThrow( 
          ()->new EntityNotFoundException(Commons.class, commonsId));
        UserCommons userCommons = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId)
        .orElseThrow(
            () -> new EntityNotFoundException(UserCommons.class, "commonsId", commonsId, "userId", userId));

        if(userCommons.getTotalWealth() >= commons.getCowPrice() ){
          userCommons.setTotalWealth(userCommons.getTotalWealth() - commons.getCowPrice());
          userCommons.setNumOfCows(userCommons.getNumOfCows() + 1);
        }
        userCommonsRepository.save(userCommons);

        String body = mapper.writeValueAsString(userCommons);
        return ResponseEntity.ok().body(body);
    }

  @ApiOperation(value = "Sell a cow, totalWealth updated")
  @PreAuthorize("hasRole('ROLE_USER')")
  @PutMapping("/sell")
  public ResponseEntity<String> putUserCommonsByIdSell(
          @ApiParam("commonsId") @RequestParam Long commonsId) throws JsonProcessingException {
        User u = getCurrentUser().getUser();
        Long userId = u.getId();

        Commons commons = commonsRepository.findById(commonsId).orElseThrow( 
          ()->new EntityNotFoundException(Commons.class, commonsId));
        UserCommons userCommons = userCommonsRepository.findByCommonsIdAndUserId(commonsId, userId)
        .orElseThrow(
            () -> new EntityNotFoundException(UserCommons.class, "commonsId", commonsId, "userId", userId));


        if(userCommons.getNumOfCows() >= 1 ){
          userCommons.setTotalWealth(userCommons.getTotalWealth() + commons.getCowPrice());
          userCommons.setNumOfCows(userCommons.getNumOfCows() - 1);
        }
        userCommonsRepository.save(userCommons);

        String body = mapper.writeValueAsString(userCommons);
        return ResponseEntity.ok().body(body);
    }

    
}
