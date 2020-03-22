package io.agileintelligence.ppmtool.exceptions;

public class InsertedProductIdExceptionResponse {
    private String InsertedProductId;

    public InsertedProductIdExceptionResponse(String insertedProductId) {
        InsertedProductId = insertedProductId;
    }

    public String getInsertedProductId() {
        return InsertedProductId;
    }

    public void setInsertedProductId(String insertedProductId) {
        InsertedProductId = insertedProductId;
    }
}
