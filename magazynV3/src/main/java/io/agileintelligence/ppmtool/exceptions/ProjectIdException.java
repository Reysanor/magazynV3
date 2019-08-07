package io.agileintelligence.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
//http://mojeskrypty.pl/spring-rest-obsluga-wyjatkow/
//https://medium.com/@jovannypcg/understanding-springs-controlleradvice-cd96a364033f
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProjectIdException extends RuntimeException {

    public ProjectIdException(String message) {
        super(message);
    }
}
