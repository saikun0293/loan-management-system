package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableAutoConfiguration
@EnableJpaRepositories("com.example.demo.repository")
@EntityScan("com.example.demo.entity")
public class LamaLumaApplication {

	public static void main(String[] args) {
		SpringApplication.run(LamaLumaApplication.class, args);
	}

}
