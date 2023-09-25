package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.AuthRequest;
import com.example.demo.service.AuthService;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService service;

    @Autowired
    AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(
            @RequestBody AuthRequest request) throws Exception {
        UsernamePasswordAuthenticationToken newToken = new UsernamePasswordAuthenticationToken(
                request.getUsername(),
                request.getPassword());
        Authentication authentication = authenticationManager.authenticate(newToken);

        if (authentication.isAuthenticated()) {
            String accessToken = service.generateToken(request.getUsername());
            return ResponseEntity.ok(accessToken);
        }
        return ResponseEntity.badRequest().body(null);
    }
}
