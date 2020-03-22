package io.agileintelligence.ppmtool.exceptions;


public class FundsDrawnNotFoundExceptionResponse {

    String fundsDrawnNotFound;

    public String getFundsDrawnNotFound() {
        return fundsDrawnNotFound;
    }

    public void setFundsDrawnNotFound(String fundsDrawnNotFound) {
        this.fundsDrawnNotFound = fundsDrawnNotFound;
    }

    public FundsDrawnNotFoundExceptionResponse(String fundsDrawnNotFound) {
        this.fundsDrawnNotFound = fundsDrawnNotFound;
    }
}
