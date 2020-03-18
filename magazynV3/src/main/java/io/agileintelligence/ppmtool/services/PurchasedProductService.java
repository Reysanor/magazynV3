package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.PurchasedProduct;
import org.springframework.stereotype.Service;

import java.security.Principal;

@Service

public class PurchasedProductService {
    public PurchasedProduct createNewPurchase(PurchasedProduct purchasedProduct, Principal principal) {

    }

    public PurchasedProduct findById(Long purchasedId, Principal principal) {

    }

    public Iterable<PurchasedProduct> findAllPurchasedProducts(String name) {

    }

    public void deletePurchasedProductById(Long purchasedId, String name) {

    }
}
