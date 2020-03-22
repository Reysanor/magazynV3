package io.agileintelligence.ppmtool.exceptions;

public class AutomatToProductNotFoundExceptionResponse {
    private String AutomatToProductNotFound;

    public AutomatToProductNotFoundExceptionResponse(String automatToProductNotFound) {
        AutomatToProductNotFound = automatToProductNotFound;
    }

    public String getAutomatToProductNotFound() {
        return AutomatToProductNotFound;
    }

    public void setAutomatToProductNotFound(String automatToProductNotFound) {
        AutomatToProductNotFound = automatToProductNotFound;
    }
}
