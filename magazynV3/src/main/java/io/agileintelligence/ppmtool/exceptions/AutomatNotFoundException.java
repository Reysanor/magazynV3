package io.agileintelligence.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) //format odpowiedzi
//moja klasa wyjątku rozszerza podstawową
public class AutomatNotFoundException extends RuntimeException {

    public AutomatNotFoundException(String message) {
        super(message);
    }
}