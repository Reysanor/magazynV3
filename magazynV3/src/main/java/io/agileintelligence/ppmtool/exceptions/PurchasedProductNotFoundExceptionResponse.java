package io.agileintelligence.ppmtool.exceptions;

public class PurchasedProductNotFoundExceptionResponse {
    private String purchasedProductNotFound;

    public PurchasedProductNotFoundExceptionResponse(String purchasedProductNotFound) {
        this.purchasedProductNotFound = purchasedProductNotFound;
    }

    public String getPurchasedProductNotFound() {
        return purchasedProductNotFound;
    }

    public void setPurchasedProductNotFound(String purchasedProductNotFound) {
        this.purchasedProductNotFound = purchasedProductNotFound;
    }
}
