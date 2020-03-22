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
    public final ResponseEntity<Object> handleProjectIdException(ProjectIdException ex, WebRequest request) {
        //Przyjęta odpowiedź z (Services) - tu ProjectService
        ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException ex, WebRequest request) {
        ProjectNotFoundExceptionResponse exceptionResponse = new ProjectNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameAlreadyExistsException(UsernameAlreadyExistsException ex, WebRequest request) {
        UsernameAlreadyExistsResponse exceptionResponse = new UsernameAlreadyExistsResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler                                          //Parametry to wyjątek i WebRequest (HttpStatus)
    public final ResponseEntity<Object> handleAutomatIdException(AutomatIdException ex, WebRequest request) {
        AutomatIdExceptionResponse exceptionResponse = new AutomatIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleAutomatNotFoundException(AutomatNotFoundException ex, WebRequest request) {
        AutomatNotFoundExceptionResponse exceptionResponse = new AutomatNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleTenantIdException(TenantIdException ex, WebRequest request) {
        TenantIdExceptionResponse exceptionResponse = new TenantIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleTenantNotFoundException(TenantNotFoundException ex, WebRequest request) {
        TenantNotFoundExceptionResponse exceptionResponse = new TenantNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProductIdException(ProductIdException ex, WebRequest request) {
        ProductIdExceptionResponse exceptionResponse = new ProductIdExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProductNotFoundException(ProductNotFoundException ex, WebRequest request) {

        ProductNotFoundExceptionResponse exceptionResponse = new ProductNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleFundsDrawnNotFoundException(FundsDrawnNotFoundException ex, WebRequest request) {

        FundsDrawnNotFoundExceptionResponse exceptionResponse = new FundsDrawnNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleFundsDrawnIdException(FundsDrawnIdException ex, WebRequest request) {
        FundsDrawnIdException exceptionResponse = new FundsDrawnIdException(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handlePurchasedProductNotFoundException(PurchasedProductNotFoundException ex, WebRequest request) {

        PurchasedProductNotFoundExceptionResponse exceptionResponse = new PurchasedProductNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handlePurchasedProductIdException(PurchasedProductIdException ex, WebRequest request) {
        PurchasedProductIdException exceptionResponse = new PurchasedProductIdException(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleInsertedProductNotFoundException(InsertedProductNotFoundException ex, WebRequest request) {

        InsertedProductNotFoundExceptionResponse exceptionResponse = new InsertedProductNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleInsertedProductIdException(InsertedProductIdException ex, WebRequest request) {
        InsertedProductIdException exceptionResponse = new InsertedProductIdException(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleAutomatToProductNotFoundException(AutomatToProductNotFoundException ex, WebRequest request) {

        AutomatToProductNotFoundExceptionResponse exceptionResponse = new AutomatToProductNotFoundExceptionResponse(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleAutomatToProductIdException(AutomatToProductIdException ex, WebRequest request) {
        AutomatToProductIdException exceptionResponse = new AutomatToProductIdException(ex.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

}
