package io.agileintelligence.ppmtool.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
//https://medium.com/@jovannypcg/understanding-springs-controlleradvice-cd96a364033f
@ControllerAdvice //klasa przechwytuje wszystkie wyjątki i zwraca odpowiedzi
// Jest to na poziomie bazy, po errorach
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler                                          //Parametry to wyjątek i WebRequest (HttpStatus)
    public final ResponseEntity<Object> handleProjectIdException(ProjectIdException ex, WebRequest request){
        //Przyjęta odpowiedź z (Services) - tu ProjectService
        ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException ex, WebRequest request){
        ProjectNotFoundExceptionResponse exceptionResponse = new ProjectNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException ex, WebRequest request){
        UsernameAlreadyExistsResponse exceptionResponse = new UsernameAlreadyExistsResponse(ex.getMessage());
        return  new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }


}
