package com.lwk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class OnlineRecipeBookApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineRecipeBookApplication.class, args);
	}

    @GetMapping("/")
    public String Hello(){
        return "Hello";
    }
}
