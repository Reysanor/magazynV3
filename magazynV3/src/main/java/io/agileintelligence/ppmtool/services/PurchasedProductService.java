package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.PurchasedProduct;
import io.agileintelligence.ppmtool.repositories.ProductRepository;
import io.agileintelligence.ppmtool.repositories.PurchasedProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.Optional;

@Service

public class PurchasedProductService {

    @Autowired
    PurchasedProductRepository purchasedProductRepository;

    @Autowired
    ProductRepository productRepository;

    public PurchasedProduct createNewPurchase(PurchasedProduct purchasedProduct, Long productId) {
        Optional<Product> product = productRepository.findById(productId);
        purchasedProduct.setProduct(product.get());
        return purchasedProductRepository.save(purchasedProduct);

    }

    public PurchasedProduct findById(Long purchasedId) {
        Optional<PurchasedProduct> purchasedProduct = purchasedProductRepository.findById(purchasedId);
        return purchasedProduct.get();
    }

    public Iterable<PurchasedProduct> findAllPurchasedProducts() {
        return purchasedProductRepository.findAll();
    }

    public void deletePurchasedProductById(Long purchasedId) {
        purchasedProductRepository.delete(findById(purchasedId));
    }
}
