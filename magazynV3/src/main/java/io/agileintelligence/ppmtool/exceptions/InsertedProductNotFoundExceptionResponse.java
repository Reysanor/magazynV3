package io.agileintelligence.ppmtool.exceptions;

public class InsertedProductNotFoundExceptionResponse {

    private String InsertedProductNotFound;

    public InsertedProductNotFoundExceptionResponse(String insertedProductNotFound) {
        InsertedProductNotFound = insertedProductNotFound;
    }

    public String getInsertedProductNotFound() {
        return InsertedProductNotFound;
    }

    public void setInsertedProductNotFound(String insertedProductNotFound) {
        InsertedProductNotFound = insertedProductNotFound;
    }
}
