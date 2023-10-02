package com.example.demo.serviceTest;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.example.demo.entity.Admin;
import com.example.demo.repository.AdminRepository;
import com.example.demo.service.AdminLoginServiceImplemented;

@RunWith(SpringRunner.class)
@SpringBootTest(
  webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureMockMvc
public class adminLoginTest {
	@Autowired
	AdminLoginServiceImplemented adminLoginService;
	@MockBean
	AdminRepository adminRepo;
	
	@Test
	public void loginWhenExistsCorrectPassword() {
		Admin a = createNewAdmin("pass1");
		Mockito.when(adminRepo.existsById(Mockito.anyString())).thenReturn(true);
		Mockito.when(adminRepo.getReferenceById(Mockito.anyString())).thenReturn(a);
		String response = adminLoginService.login(a);
		assertEquals(response,"pass");
		
	}
	
	@Test
	public void loginWhenExistsWrongPassword() {
		Admin a1 = createNewAdmin("pass1");
		Admin a2 = createNewAdmin("pass2");
		Mockito.when(adminRepo.existsById(Mockito.anyString())).thenReturn(true);
		Mockito.when(adminRepo.getReferenceById(Mockito.anyString())).thenReturn(a2);
		String response = adminLoginService.login(a1);
		assertEquals(response,"fail");
		
	}
	
	@Test
	public void loginWhenNotExists() {
		Admin a1 = createNewAdmin("pass1");
		Mockito.when(adminRepo.existsById(Mockito.anyString())).thenReturn(false);
		String response = adminLoginService.login(a1);
		assertEquals(response,"no such user");
		
	}
	
	public Admin createNewAdmin(String pass) {
		Admin e = new Admin();
		e.setAdminId("123");
		e.setPassword(pass);
		return e;
	}

}
