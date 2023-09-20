package com.example.demo.service;

import java.util.Arrays;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Admin;
import com.example.demo.entity.Employee;
import com.example.demo.repository.AdminRepository;
import com.example.demo.repository.EmployeeRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    EmployeeRepository empRepo;

    @Autowired
    AdminRepository adminRepo;

    // Authorities
    private SimpleGrantedAuthority roleUser = new SimpleGrantedAuthority("USER");
    private SimpleGrantedAuthority roleAdmin = new SimpleGrantedAuthority("ADMIN");

    @Transactional
    public UserDetails loadUserByUserId(String userId) throws UsernameNotFoundException {
        Optional<Employee> _emp = empRepo.findById(userId);
        Optional<Admin> _admin = adminRepo.findById(userId);

        // either admin or user not both
        if (_admin.isPresent()) {
            Admin admin = _admin.get();
            return User.builder()
                    .username(admin.getAdminId())
                    .password(admin.getPassword())
                    .authorities(Arrays.asList(roleAdmin))
                    .build();
        }

        if (_emp.isPresent()) {
            Employee emp = _emp.get();
            return User.builder()
                    .username(emp.getEmployeeId())
                    .password(emp.getPassword())
                    .authorities(Arrays.asList(roleUser))
                    .build();
        }

        throw new UsernameNotFoundException("User not found, is neither a valid user nor admin");
    }
}
