package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import com.example.demo.service.UserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired  
    UserDetailsService 

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(requests -> requests
                .requestMatchers("/", "/api/auth/**").permitAll()
                .requestMatchers("/api/user/**").hasAuthority("USER")
                .requestMatchers("/api/admin/**").hasAuthority("ADMIN")
                )
                .userDetailsService(null)
                .csrf(csrf -> csrf.disable());
        return http.build();
    }

    // @Autowired
    // private CustomUserDetailsService userDetailsService;

    // @Autowired
    // private JwtFilter jwtFilter;

    // @Override
    // protected void configure(AuthenticationManagerBuilder auth) throws Exception
    // {
    // auth.userDetailsService(userDetailsService);
    // }

    // @Bean
    // public PasswordEncoder passwordEncoder() {
    // return NoOpPasswordEncoder.getInstance();
    // }

    // @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    // @Override
    // public AuthenticationManager authenticationManagerBean() throws Exception {
    // return super.authenticationManagerBean();
    // }

    // @Override
    // protected void configure(HttpSecurity http) throws Exception {
    // http.csrf().disable().authorizeRequests()
    // .antMatchers("/authenticate").permitAll()
    // // .antMatchers("/home").permitAll()
    // .anyRequest().authenticated()
    // .and().exceptionHandling().and().sessionManagement()
    // .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    // http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
    // ;
    // }
}
