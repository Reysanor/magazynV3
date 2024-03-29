package io.agileintelligence.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST) //format odpowiedzi

public class InsertedProductIdException extends RuntimeException {

    public InsertedProductIdException(String message) {
        super(message);
    }
}
