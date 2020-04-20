package io.agileintelligence.ppmtool.exceptions;

public class ProductToAutomatNotFoundExceptionResponse {
    private String ProductToAutomatNotFound;

    public ProductToAutomatNotFoundExceptionResponse(String productToAutomatNotFound) {
        ProductToAutomatNotFound = productToAutomatNotFound;
    }

    public String getProductToAutomatNotFound() {
        return ProductToAutomatNotFound;
    }

    public void setProductToAutomatNotFound(String productToAutomatNotFound) {
        ProductToAutomatNotFound = productToAutomatNotFound;
    }
}
