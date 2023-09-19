package com.example.demo.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.example.demo.entity.AuthRequest;
import com.example.demo.entity.AuthResponse;
import com.example.demo.entity.Employee;
import com.example.demo.service.AuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    AuthResponse authRes;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> loginUser(
            @RequestBody AuthRequest request) {
        UsernamePasswordAuthenticationToken newToken = new UsernamePasswordAuthenticationToken(
                request.getUserName(),
                request.getPassword());
        Authentication authentication = authenticationManager.authenticate(newToken);

        if (authentication.isAuthenticated()) {
            String accessToken = service.generateToken(request.getUserName());
            authRes.setAccessToken(accessToken);
            return ResponseEntity.ok(authRes);
        }
        return ResponseEntity.badRequest().body(null);
    }
}
