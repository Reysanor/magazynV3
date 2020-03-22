package io.agileintelligence.ppmtool.exceptions;

public class PurchasedProductIdExceptionResponse {
    private String PurchasedProductId;

    public PurchasedProductIdExceptionResponse(String purchasedProductId) {
        PurchasedProductId = purchasedProductId;
    }

    public String getPurchasedProductId() {
        return PurchasedProductId;
    }

    public void setPurchasedProductId(String purchasedProductId) {
        PurchasedProductId = purchasedProductId;
    }
}
