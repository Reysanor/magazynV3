package io.agileintelligence.ppmtool.exceptions;

public class ProductIdExceptionResponse {
    private String productNotFound;

    public String getProductNotFound() {
        return productNotFound;
    }

    public void setProductNotFound(String productNotFound) {
        this.productNotFound = productNotFound;
    }

    public ProductIdExceptionResponse(String productNotFound) {
        this.productNotFound = productNotFound;
    }
}
