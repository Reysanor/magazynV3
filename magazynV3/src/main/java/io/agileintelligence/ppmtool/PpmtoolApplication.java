package io.agileintelligence.ppmtool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

//https://kobietydokodu.pl/09-spring-mvc/
@SpringBootApplication
public class PpmtoolApplication {
    //do szyfrowania hasła
    @Bean
    BCryptPasswordEncoder bCryptPasswordEncoder(){
        return  new BCryptPasswordEncoder();
    }

    public static void main(String[] args) {
        SpringApplication.run(PpmtoolApplication.class, args);
    }
}
