package edu.ucsb.cs156.happiercows.controllers;

import edu.ucsb.cs156.happiercows.ControllerTestCase;
import edu.ucsb.cs156.happiercows.repositories.UserRepository;
import edu.ucsb.cs156.happiercows.repositories.CommonsRepository;
import edu.ucsb.cs156.happiercows.repositories.UserCommonsRepository;
import edu.ucsb.cs156.happiercows.entities.Commons;
import edu.ucsb.cs156.happiercows.entities.User;
import edu.ucsb.cs156.happiercows.entities.UserCommons;
import edu.ucsb.cs156.happiercows.errors.EntityNotFoundException;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.orm.jpa.AutoConfigureDataJpa;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.http.MediaType;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.springframework.beans.factory.annotation.Autowired;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.eq;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Optional;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.time.LocalDateTime;

@WebMvcTest(controllers = UserCommonsController.class)
@AutoConfigureDataJpa
public class UserCommonsControllerTests extends ControllerTestCase {

  @MockBean
  UserCommonsRepository userCommonsRepository;

  @MockBean
  UserRepository userRepository;

  @MockBean
  CommonsRepository commonsRepository;

  @Autowired
  private ObjectMapper objectMapper;

  public static UserCommons dummyUserCommons(long id) {
    UserCommons userCommons = new UserCommons(id,1,1,1,1);
    return userCommons;
  }
  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void test_getUserCommonsById_exists_admin() throws Exception {
  
    UserCommons expectedUserCommons = dummyUserCommons(1);
    when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L),eq(1L))).thenReturn(Optional.of(expectedUserCommons));

    MvcResult response = mockMvc.perform(get("/api/usercommons/?userId=1&commonsId=1"))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L),eq(1L));

    String expectedJson = mapper.writeValueAsString(expectedUserCommons);
    String responseString = response.getResponse().getContentAsString();

    assertEquals(expectedJson, responseString);
  }
  
  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void test_getUserCommonsById_nonexists_admin() throws Exception {
  
    when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L),eq(1L))).thenReturn(Optional.empty());

    MvcResult response = mockMvc.perform(get("/api/usercommons/?userId=1&commonsId=1"))
        .andExpect(status().is(404)).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L),eq(1L));
    
    String responseString = response.getResponse().getContentAsString();
    String expectedString = "{\"message\":\"UserCommons with commonsId 1 and userId 1 not found\",\"type\":\"EntityNotFoundException\"}";

    Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
    Map<String, Object> jsonResponse = responseToJson(response);
    assertEquals(expectedJson, jsonResponse);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void test_getUserCommonsById_exists() throws Exception {
  
    UserCommons expectedUserCommons = dummyUserCommons(1);
    when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L),eq(1L))).thenReturn(Optional.of(expectedUserCommons));

    MvcResult response = mockMvc.perform(get("/api/usercommons/forcurrentuser?commonsId=1"))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L),eq(1L));

    String expectedJson = mapper.writeValueAsString(expectedUserCommons);
    String responseString = response.getResponse().getContentAsString();

    assertEquals(expectedJson, responseString);
  }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void test_getUserCommonsById_nonexists() throws Exception {
  
    when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L),eq(1L))).thenReturn(Optional.empty());

    MvcResult response = mockMvc.perform(get("/api/usercommons/forcurrentuser?commonsId=1"))
        .andExpect(status().is(404)).andReturn();
    
    verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L),eq(1L));
    
    String responseString = response.getResponse().getContentAsString();
    String expectedString = "{\"message\":\"UserCommons with commonsId 1 and userId 1 not found\",\"type\":\"EntityNotFoundException\"}";
    Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
    Map<String, Object> jsonResponse = responseToJson(response);
    assertEquals(expectedJson, jsonResponse);
  }

  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void test_admin_getAllUserCommonsByCommonsId_some_exists_leaderboard_true() throws Exception {

    Commons testCommons = Commons
    .builder()
    .name("test commons")
    .cowPrice(10)
    .milkPrice(2)
    .startingBalance(300)
    .startingDate(LocalDateTime.now())
    .leaderboard(true)
    .build();

    ArrayList<UserCommons> expectedCommons = new ArrayList<>();
    expectedCommons.addAll(Arrays.asList(dummyUserCommons(1), dummyUserCommons(2), dummyUserCommons(3)));
    when(userCommonsRepository.findAllByCommonsId(eq(1L))).thenReturn(expectedCommons);
    when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));

    MvcResult response = mockMvc.perform(get("/api/usercommons/allwithcommonsid?commonsId=1"))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findAllByCommonsId(eq(1L));
    verify(commonsRepository, times(1)).findById(eq(1L));
    String expectedJson = mapper.writeValueAsString(expectedCommons);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }

  // This tests to make sure leaderboard boolean won't affect access for 
  // ADMIN user
  @WithMockUser(roles = { "ADMIN" })
  @Test
  public void test_admin_getAllUserCommonsByCommonsId_some_exists_leaderboard_false() throws Exception {
    Commons testCommons = Commons
    .builder()
    .name("test commons")
    .cowPrice(10)
    .milkPrice(2)
    .startingBalance(300)
    .startingDate(LocalDateTime.now())
    .leaderboard(false)
    .build();

    ArrayList<UserCommons> expectedCommons = new ArrayList<>();
    expectedCommons.addAll(Arrays.asList(dummyUserCommons(1), dummyUserCommons(2), dummyUserCommons(3)));
    when(userCommonsRepository.findAllByCommonsId(eq(1L))).thenReturn(expectedCommons);
    when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));

    MvcResult response = mockMvc.perform(get("/api/usercommons/allwithcommonsid?commonsId=1"))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findAllByCommonsId(eq(1L));
    verify(commonsRepository, times(1)).findById(eq(1L));
    String expectedJson = mapper.writeValueAsString(expectedCommons);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }

  // even if there are no userCommons with a specific commonsId,
  // the backend shouldn't throw an error, just return empty list
  @WithMockUser(roles = { "ADMIN", "USER"})
  @Test
  public void test_getAllUserCommonsByCommonsId_none_exists_leaderboard_true() throws Exception {
    Commons testCommons = Commons
    .builder()
    .name("test commons")
    .cowPrice(10)
    .milkPrice(2)
    .startingBalance(300)
    .startingDate(LocalDateTime.now())
    .leaderboard(true)
    .build();

    ArrayList<UserCommons> expectedCommons = new ArrayList<>();
    when(userCommonsRepository.findAllByCommonsId(eq(1L))).thenReturn(expectedCommons);
    when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));

    MvcResult response = mockMvc.perform(get("/api/usercommons/allwithcommonsid?commonsId=1"))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findAllByCommonsId(eq(1L));
    verify(commonsRepository, times(1)).findById(eq(1L));
    String expectedJson = mapper.writeValueAsString(expectedCommons);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void test_user_getAllUserCommonsByCommonsId_some_exists_leaderboard_true() throws Exception {
    Commons testCommons = Commons
    .builder()
    .name("test commons")
    .cowPrice(10)
    .milkPrice(2)
    .startingBalance(300)
    .startingDate(LocalDateTime.now())
    .leaderboard(true)
    .build();

    ArrayList<UserCommons> expectedCommons = new ArrayList<>();
    expectedCommons.addAll(Arrays.asList(dummyUserCommons(1), dummyUserCommons(2), dummyUserCommons(3)));
    when(userCommonsRepository.findAllByCommonsId(eq(1L))).thenReturn(expectedCommons);
    when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));

    MvcResult response = mockMvc.perform(get("/api/usercommons/allwithcommonsid?commonsId=1"))
        .andExpect(status().isOk()).andReturn();

    verify(userCommonsRepository, times(1)).findAllByCommonsId(eq(1L));
    verify(commonsRepository, times(1)).findById(eq(1L));
    String expectedJson = mapper.writeValueAsString(expectedCommons);
    String responseString = response.getResponse().getContentAsString();
    assertEquals(expectedJson, responseString);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void test_user_getAllUserCommonsByCommonsId_some_exists_leaderboard_false() throws Exception {
    Commons testCommons = Commons
    .builder()
    .name("test commons")
    .cowPrice(10)
    .milkPrice(2)
    .startingBalance(300)
    .startingDate(LocalDateTime.now())
    .leaderboard(false)
    .build();

    ArrayList<UserCommons> expectedCommons = new ArrayList<>();
    expectedCommons.addAll(Arrays.asList(dummyUserCommons(1), dummyUserCommons(2), dummyUserCommons(3)));
    when(userCommonsRepository.findAllByCommonsId(eq(1L))).thenReturn(expectedCommons);
    when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));

    MvcResult response = mockMvc.perform(get("/api/usercommons/allwithcommonsid?commonsId=1"))
        .andExpect(status().is(403)).andReturn();

    verify(userCommonsRepository, times(0)).findAllByCommonsId(eq(1L));
    verify(commonsRepository, times(1)).findById(eq(1L));
  }

  @WithMockUser(roles = { "USER", "ADMIN" })
  @Test
  public void test_getAllUserCommonsByCommonsId_commons_non_exist() throws Exception {
    ArrayList<UserCommons> expectedCommons = new ArrayList<>();
    expectedCommons.addAll(Arrays.asList(dummyUserCommons(1), dummyUserCommons(2), dummyUserCommons(3)));
    when(userCommonsRepository.findAllByCommonsId(eq(1L))).thenReturn(expectedCommons);
    when(commonsRepository.findById(eq(1L))).thenReturn(Optional.empty());

    MvcResult response = mockMvc.perform(get("/api/usercommons/allwithcommonsid?commonsId=1"))
        .andExpect(status().is(404)).andReturn();

    verify(userCommonsRepository, times(0)).findAllByCommonsId(eq(1L));
    verify(commonsRepository, times(1)).findById(eq(1L));
    
    String expectedString = "{\"message\":\"Commons with id 1 not found\",\"type\":\"EntityNotFoundException\"}";

    Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
    Map<String, Object> jsonResponse = responseToJson(response);
    assertEquals(expectedJson, jsonResponse);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void test_BuyCow_commons_exists() throws Exception {
  
      // arrange
  
      UserCommons origUserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      Commons testCommons = Commons
      .builder()
      .name("test commons")
      .cowPrice(10)
      .milkPrice(2)
      .startingBalance(300)
      .startingDate(LocalDateTime.now())
      .build();
  
      UserCommons userCommonsToSend = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      UserCommons correctuserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300-testCommons.getCowPrice())
      .numOfCows(2)
      .build();
  
      String requestBody = mapper.writeValueAsString(userCommonsToSend);
      String expectedReturn = mapper.writeValueAsString(correctuserCommons);
  
      when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L), eq(1L))).thenReturn(Optional.of(origUserCommons));
      when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));
  
      // act
      MvcResult response = mockMvc.perform(put("/api/usercommons/buy?commonsId=1")
          .contentType(MediaType.APPLICATION_JSON)
                      .characterEncoding("utf-8")
                      .content(requestBody)
                      .with(csrf()))
              .andExpect(status().isOk()).andReturn();
  
      // assert
      verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L), eq(1L));
      verify(userCommonsRepository, times(1)).save(correctuserCommons);
      String responseString = response.getResponse().getContentAsString();
      assertEquals(expectedReturn, responseString);
  }

  @WithMockUser(roles = { "USER" })
  @Test
  public void test_BuyCow_commons_exists_user_has_exact_amount_needed() throws Exception {
  
      // arrange
  
      UserCommons origUserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      Commons testCommons = Commons
      .builder()
      .name("test commons")
      .cowPrice(300)
      .milkPrice(2)
      .startingBalance(300)
      .startingDate(LocalDateTime.now())
      .build();
  
      UserCommons userCommonsToSend = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      UserCommons correctuserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(0)
      .numOfCows(2)
      .build();
  
      String requestBody = mapper.writeValueAsString(userCommonsToSend);
      String expectedReturn = mapper.writeValueAsString(correctuserCommons);
  
      when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L), eq(1L))).thenReturn(Optional.of(origUserCommons));
      when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));
  
      // act
      MvcResult response = mockMvc.perform(put("/api/usercommons/buy?commonsId=1")
          .contentType(MediaType.APPLICATION_JSON)
                      .characterEncoding("utf-8")
                      .content(requestBody)
                      .with(csrf()))
              .andExpect(status().isOk()).andReturn();
  
      // assert
      verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L), eq(1L));
      verify(userCommonsRepository, times(1)).save(correctuserCommons);
      String responseString = response.getResponse().getContentAsString();
      assertEquals(expectedReturn, responseString);
  }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void test_SellCow_commons_exists() throws Exception {
  
      // arrange
  
      UserCommons origUserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      Commons testCommons = Commons
      .builder()
      .name("test commons")
      .cowPrice(10)
      .milkPrice(2)
      .startingBalance(300)
      .startingDate(LocalDateTime.now())
      .build();
  
      UserCommons userCommonsToSend = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      UserCommons correctuserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300+testCommons.getCowPrice())
      .numOfCows(0)
      .build();
  
      String requestBody = mapper.writeValueAsString(userCommonsToSend);
      String expectedReturn = mapper.writeValueAsString(correctuserCommons);
  
      when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L), eq(1L))).thenReturn(Optional.of(origUserCommons));
      when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));
  
      // act
      MvcResult response = mockMvc.perform(put("/api/usercommons/sell?commonsId=1")
          .contentType(MediaType.APPLICATION_JSON)
                      .characterEncoding("utf-8")
                      .content(requestBody)
                      .with(csrf()))
              .andExpect(status().isOk()).andReturn();
  
      // assert
      verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L), eq(1L));
      verify(userCommonsRepository, times(1)).save(correctuserCommons);
      String responseString = response.getResponse().getContentAsString();
      assertEquals(expectedReturn, responseString);
  }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void test_BuyCow_commons_for_user_DOES_NOT_exist() throws Exception {
  
      // arrange
  
      UserCommons origUserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      Commons testCommons = Commons
      .builder()
      .name("test commons")
      .cowPrice(10)
      .milkPrice(2)
      .startingBalance(300)
      .startingDate(LocalDateTime.now())
      .build();
  
      UserCommons userCommonsToSend = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      UserCommons correctuserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300-testCommons.getCowPrice())
      .numOfCows(2)
      .build();
  
      String requestBody = mapper.writeValueAsString(userCommonsToSend);
      String expectedReturn = mapper.writeValueAsString(correctuserCommons);
  
      when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L), eq(1L))).thenReturn(Optional.of(origUserCommons));
      when(commonsRepository.findById(eq(234L))).thenReturn(Optional.of(testCommons));
  
      // act
      MvcResult response = mockMvc.perform(put("/api/usercommons/buy?commonsId=234") 
          .contentType(MediaType.APPLICATION_JSON)
                      .characterEncoding("utf-8")
                      .content(requestBody)
                      .with(csrf()))
              .andExpect(status().is(404)).andReturn();
  
      // assert
  
      String responseString = response.getResponse().getContentAsString();
      String expectedString = "{\"message\":\"UserCommons with commonsId 234 and userId 1 not found\",\"type\":\"EntityNotFoundException\"}";
      Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
      Map<String, Object> jsonResponse = responseToJson(response);
      assertEquals(expectedJson, jsonResponse);
  }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void test_SellCow_commons_for_usercommons_DOES_NOT_exist() throws Exception {
  
      // arrange
  
      UserCommons origUserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      Commons testCommons = Commons
      .builder()
      .id(234L)
      .name("test commons")
      .cowPrice(10)
      .milkPrice(2)
      .startingBalance(300)
      .startingDate(LocalDateTime.now())
      .build();
  
      UserCommons userCommonsToSend = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      UserCommons correctuserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300+testCommons.getCowPrice())
      .numOfCows(2)
      .build();
  
      String requestBody = mapper.writeValueAsString(userCommonsToSend);
      String expectedReturn = mapper.writeValueAsString(correctuserCommons);
  
      when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L), eq(1L))).thenReturn(Optional.of(origUserCommons));
      when(commonsRepository.findById(eq(234L))).thenReturn(Optional.of(testCommons));
  
      // act
      MvcResult response = mockMvc.perform(put("/api/usercommons/sell?commonsId=234")
          .contentType(MediaType.APPLICATION_JSON)
                      .characterEncoding("utf-8")
                      .content(requestBody)
                      .with(csrf()))
              .andExpect(status().is(404)).andReturn();
  
      // assert
      String responseString = response.getResponse().getContentAsString();
      String expectedString = "{\"message\":\"UserCommons with commonsId 234 and userId 1 not found\",\"type\":\"EntityNotFoundException\"}";
      Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
      Map<String, Object> jsonResponse = responseToJson(response);
      assertEquals(expectedJson, jsonResponse);
  }
  
  //tests for when the common itself doesn't exist
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void test_SellCow_commons_DOES_NOT_exist() throws Exception {
  
      // arrange
  
      UserCommons origUserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      Commons testCommons = Commons
      .builder()
      .name("test commons")
      .cowPrice(10)
      .milkPrice(2)
      .startingBalance(300)
      .startingDate(LocalDateTime.now())
      .build();
  
      UserCommons userCommonsToSend = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      UserCommons correctuserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300+testCommons.getCowPrice())
      .numOfCows(2)
      .build();
  
      String requestBody = mapper.writeValueAsString(userCommonsToSend);
      String expectedReturn = mapper.writeValueAsString(correctuserCommons);
  
      when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L), eq(1L))).thenReturn(Optional.of(origUserCommons));
      when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));
  
      // act
      MvcResult response = mockMvc.perform(put("/api/usercommons/sell?commonsId=222")
          .contentType(MediaType.APPLICATION_JSON)
                      .characterEncoding("utf-8")
                      .content(requestBody)
                      .with(csrf()))
              .andExpect(status().is(404)).andReturn();
  
      // assert
      String responseString = response.getResponse().getContentAsString();
      String expectedString = "{\"message\":\"Commons with id 222 not found\",\"type\":\"EntityNotFoundException\"}";
      Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
      Map<String, Object> jsonResponse = responseToJson(response);
      assertEquals(expectedJson, jsonResponse);
  }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void test_BuyCow_commons_DOES_NOT_exist() throws Exception {
  
      // arrange
  
      UserCommons origUserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      Commons testCommons = Commons
      .builder()
      .name("test commons")
      .cowPrice(10)
      .milkPrice(2)
      .startingBalance(300)
      .startingDate(LocalDateTime.now())
      .build();
  
      UserCommons userCommonsToSend = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(1)
      .build();
  
      UserCommons correctuserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300+testCommons.getCowPrice())
      .numOfCows(2)
      .build();
  
      String requestBody = mapper.writeValueAsString(userCommonsToSend);
      String expectedReturn = mapper.writeValueAsString(correctuserCommons);
  
      when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L), eq(1L))).thenReturn(Optional.of(origUserCommons));
      when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));
  
      // act
      MvcResult response = mockMvc.perform(put("/api/usercommons/buy?commonsId=222")
          .contentType(MediaType.APPLICATION_JSON)
                      .characterEncoding("utf-8")
                      .content(requestBody)
                      .with(csrf()))
              .andExpect(status().is(404)).andReturn();
  
      // assert
      String responseString = response.getResponse().getContentAsString();
      String expectedString = "{\"message\":\"Commons with id 222 not found\",\"type\":\"EntityNotFoundException\"}";
      Map<String, Object> expectedJson = mapper.readValue(expectedString, Map.class);
      Map<String, Object> jsonResponse = responseToJson(response);
      assertEquals(expectedJson, jsonResponse);
  }
  
  
  
  // Put tests for edge cases (not enough money to buy, or no cow to sell)
  
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void test_BuyCow_commons_exists_not_enough_money() throws Exception {
  
      // arrange
  
      UserCommons origUserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(0)
      .numOfCows(1)
      .build();
  
      Commons testCommons = Commons
      .builder()
      .name("test commons")
      .cowPrice(10)
      .milkPrice(2)
      .startingBalance(0)
      .startingDate(LocalDateTime.now())
      .build();
  
      UserCommons userCommonsToSend = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(0)
      .numOfCows(1)
      .build();
  
      UserCommons correctuserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(0)
      .numOfCows(1)
      .build();
  
      String requestBody = mapper.writeValueAsString(userCommonsToSend);
      String expectedReturn = mapper.writeValueAsString(correctuserCommons);
  
      when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L), eq(1L))).thenReturn(Optional.of(origUserCommons));
      when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));
  
      // act
      MvcResult response = mockMvc.perform(put("/api/usercommons/buy?commonsId=1")
          .contentType(MediaType.APPLICATION_JSON)
                      .characterEncoding("utf-8")
                      .content(requestBody)
                      .with(csrf()))
              .andExpect(status().isOk()).andReturn();
  
      // assert
      verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L), eq(1L));
      verify(userCommonsRepository, times(1)).save(correctuserCommons);
      String responseString = response.getResponse().getContentAsString();
      assertEquals(expectedReturn, responseString);
  }
  
  @WithMockUser(roles = { "USER" })
  @Test
  public void test_SellCow_commons_exists_no_cow_to_sell() throws Exception {
  
      // arrange
  
      UserCommons origUserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(0)
      .build();
  
      Commons testCommons = Commons
      .builder()
      .name("test commons")
      .cowPrice(10)
      .milkPrice(2)
      .startingBalance(300)
      .startingDate(LocalDateTime.now())
      .build();
  
      UserCommons userCommonsToSend = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(0)
      .build();
  
      UserCommons correctuserCommons = UserCommons
      .builder()
      .id(1L)
      .userId(1L)
      .commonsId(1L)
      .totalWealth(300)
      .numOfCows(0)
      .build();
  
      String requestBody = mapper.writeValueAsString(userCommonsToSend);
      String expectedReturn = mapper.writeValueAsString(correctuserCommons);
  
      when(userCommonsRepository.findByCommonsIdAndUserId(eq(1L), eq(1L))).thenReturn(Optional.of(origUserCommons));
      when(commonsRepository.findById(eq(1L))).thenReturn(Optional.of(testCommons));
  
      // act
      MvcResult response = mockMvc.perform(put("/api/usercommons/sell?commonsId=1")
          .contentType(MediaType.APPLICATION_JSON)
                      .characterEncoding("utf-8")
                      .content(requestBody)
                      .with(csrf()))
              .andExpect(status().isOk()).andReturn();
  
      // assert
      verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(eq(1L), eq(1L));
      verify(userCommonsRepository, times(1)).save(correctuserCommons);
      String responseString = response.getResponse().getContentAsString();
      assertEquals(expectedReturn, responseString);
    }

    // regular users should be able to delete commons as well, but only
    // those that match their userid
    @WithMockUser(roles = { "ADMIN" , "USER"})
    @Test
    public void test_admin_can_delete_a_userCommons() throws Exception {
            // arrange
            // NOTE: once averageCowHealth is added, update this test!!
            UserCommons testUserCommons = UserCommons
            .builder()
            .id(1L)
            .userId(42L)
            .commonsId(24L)
            .totalWealth(300)
            .numOfCows(0)
            .build();

            when(userCommonsRepository.findByCommonsIdAndUserId(eq(24L), eq(42L))).thenReturn(Optional.of(testUserCommons));

            // act
            MvcResult response = mockMvc.perform(
                            delete("/api/usercommons?userId=42&commonsId=24")
                                            .with(csrf()))
                            .andExpect(status().isOk()).andReturn();

            // assert
            verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(24L, 42L);
            verify(userCommonsRepository, times(1)).delete(any());

            Map<String, Object> json = responseToJson(response);
            assertEquals("UserCommons with commonsId 24 and userId 42 deleted", json.get("message"));
    }

    @WithMockUser(roles = { "ADMIN", "USER"})
    @Test
    public void test_admin_deletes_non_existant_userCommons_and_gets_right_error_message() throws Exception {
        // arrange

        when(userCommonsRepository.findByCommonsIdAndUserId(eq(24L), eq(42L))).thenReturn(Optional.empty());

        //act
        MvcResult response = mockMvc.perform(
            delete("/api/usercommons?userId=42&commonsId=24").with(csrf())).andExpect(status().isNotFound()).andReturn();

        // assert
        verify(userCommonsRepository, times(1)).findByCommonsIdAndUserId(24L, 42L);
        Map<String, Object> json = responseToJson(response);
        assertEquals("UserCommons with commonsId 24 and userId 42 not found", json.get("message"));
    }


}
