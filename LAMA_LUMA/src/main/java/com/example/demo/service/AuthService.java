package com.example.demo.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Employee;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.EmployeeRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AuthService {
    private String secret = "lamaLumaApplication";

    // Authorities
    private SimpleGrantedAuthority roleUser = new SimpleGrantedAuthority("USER");
    private SimpleGrantedAuthority roleAdmin = new SimpleGrantedAuthority("ADMIN");
    private SimpleGrantedAuthority roleAnonymous = new SimpleGrantedAuthority("ANONYMOUS");

    @Autowired
    AdminRepository adminRepo;

    @Autowired
    EmployeeRepository empRepo;

    public SimpleGrantedAuthority checkUserRole(String empId) {
        SimpleGrantedAuthority curr;
        if (adminRepo.existsById(empId))
            curr = roleAdmin;
        else if (empRepo.existsById(empId))
            curr = roleUser;
        curr = roleAnonymous;
        return curr;
    }

    public String generateToken(String empId) throws Exception {
        Map<String, Object> claims = new HashMap<>();
        Optional<Employee> _emp = empRepo.findById(empId);

        String currRole = checkUserRole(empId).getAuthority();

        if (currRole == roleUser.getAuthority() && _emp.isPresent()) {
            Employee emp = _emp.get();
            claims.put("dept", emp.getDept());
            claims.put("designation", emp.getDesignation());
            claims.put("empId", emp.getEmployeeId());
            claims.put("name", emp.getName());
        }

        claims.put("role", currRole);
        return createToken(claims, empId);
    }

    public String createToken(Map<String, Object> claims, String empId) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(empId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 5000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    // Utils
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}
