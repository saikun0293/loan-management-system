package com.example.demo.service;

import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Employee;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.EmployeeRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class AuthService implements UserDetailsService {

    private String secret = "lamaLumaApplication";

    enum Role {
        ADMIN,
        EMPLOYEE
    }

    SimpleGrantedAuthority roleEmp = new SimpleGrantedAuthority(Role.EMPLOYEE.toString());
    SimpleGrantedAuthority roleAdmin = new SimpleGrantedAuthority(Role.ADMIN.toString());

    @Autowired
    EmployeeRepository empRepo;

    @Autowired
    AdminRepository adminRepo;

    public Role identifyUserRole(String username) throws UsernameNotFoundException {
        if (adminRepo.existsById(username))
            return Role.ADMIN;
        else if (empRepo.existsById(username))
            return Role.EMPLOYEE;
        throw new UsernameNotFoundException("User with id " + username + " not found");
    }

    public Object getUserObject(String username) throws UsernameNotFoundException {
        Optional<Employee> _emp = empRepo.findById(username);
        Optional<Admin> _admin = adminRepo.findById(username);

        if (_admin.isPresent())
            return _admin.get();
        else if (_emp.isPresent())
            return _emp.get();

        throw new UsernameNotFoundException("User with id " + username + " not found");
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Role role = identifyUserRole(username);

        if (role.equals(Role.ADMIN)) {
            Admin admin = (Admin) getUserObject(username);
            return User.builder()
                    .username(username)
                    .password(admin.getPassword())
                    .authorities(Collections.singletonList(roleAdmin))
                    .build();
        }

        else if (role.equals(Role.EMPLOYEE)) {
            Employee emp = (Employee) getUserObject(username);
            return User.builder()
                    .username(username)
                    .password(emp.getPassword())
                    .authorities(Collections.singletonList(roleEmp))
                    .build();
        }

        throw new UsernameNotFoundException("User with id " + username + " not found");
    }

    // JWT Utils
    public String generateToken(String username) throws Exception {
        Map<String, Object> claims = new HashMap<>();
        Role role = identifyUserRole(username);

        if (role.equals(Role.ADMIN)) {
            Admin admin = (Admin) getUserObject(username);

            claims.put("empId", admin.getAdminId());
            claims.put("name", admin.getName());
            claims.put("role", roleAdmin.getAuthority());
        }

        else if (role.equals(Role.EMPLOYEE)) {
            Employee emp = (Employee) getUserObject(username);

            claims.put("dept", emp.getDept());
            claims.put("designation", emp.getDesignation());
            claims.put("empId", emp.getEmployeeId());
            claims.put("name", emp.getName());
            claims.put("role", roleEmp.getAuthority());
        }

        return createToken(claims, username);
    }

    public String createToken(Map<String, Object> claims, String empId) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(empId)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 5000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    public Boolean validateToken(String token, UserDetails user) {
        final String username = extractUsername(token);
        return (username.equals(user.getUsername()) && !isTokenExpired(token));
    }

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
