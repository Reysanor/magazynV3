package io.agileintelligence.ppmtool.exceptions;

public class ProductIdExceptionResponse {
    private String automatNotFound;

    public String getAutomatNotFound() {
        return automatNotFound;
    }

    public void setAutomatNotFound(String automatNotFound) {
        this.automatNotFound = automatNotFound;
    }

    public ProductIdExceptionResponse(String automatNotFound) {
        this.automatNotFound = automatNotFound;


    }
}
