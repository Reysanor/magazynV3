package io.agileintelligence.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;
//https://medium.com/@jovannypcg/understanding-springs-controlleradvice-cd96a364033f
@ResponseStatus(HttpStatus.BAD_REQUEST) //format odpowiedzi
//moja klasa wyjątku rozszerza podstawową
public class ProjectIdException extends RuntimeException {

    public ProjectIdException(String message) {
        super(message);
    }
}
