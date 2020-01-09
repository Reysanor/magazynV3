package io.agileintelligence.ppmtool.exceptions;

public class AutomatNotFoundExceptionResponse {

    private String automatNotFound;

    public AutomatNotFoundExceptionResponse(String automatNotFound) {
        this.automatNotFound = automatNotFound;
    }

    public String getAutomatNotFound() {
        return automatNotFound;
    }

    public void setAutomatNotFound(String automatNotFound) {
        this.automatNotFound = automatNotFound;
    }
}
