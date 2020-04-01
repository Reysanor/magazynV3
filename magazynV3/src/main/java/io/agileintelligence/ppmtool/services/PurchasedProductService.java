package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.PurchasedProduct;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.exceptions.PurchasedProductNotFoundException;
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

    public PurchasedProduct createOrUpdatePurchasedProduct(PurchasedProduct purchasedProduct, Long productId) {
        Long purchasedProductIdGet = purchasedProduct.getId();
        if (purchasedProduct.getId() != null) {
            Optional<PurchasedProduct> existingPurchasedProduct = purchasedProductRepository.findById(productId);
            if (!existingPurchasedProduct.isPresent()) {
                throw new PurchasedProductNotFoundException("Funds drawn with Id: " + purchasedProductIdGet + " doesn't exists");
            }
        }

        Optional<Product> product = productRepository.findById(productId);
        if (!product.isPresent()) {
            throw new ProjectNotFoundException("Product with id: " + productId + " doesn't exists");
        }
        try {
            purchasedProduct.setId(purchasedProductIdGet);
            purchasedProduct.setProduct(product.get());
            return purchasedProductRepository.save(purchasedProduct);

        } catch (Exception e) {
            throw new PurchasedProductNotFoundException("Funds drawn with Id: " + purchasedProductIdGet + " doesn't exists");

        }
    }

    public PurchasedProduct findById(Long purchasedId) {
        Optional<PurchasedProduct> purchasedProduct = purchasedProductRepository.findById(purchasedId);
        if(!purchasedProduct.isPresent()){
            throw new PurchasedProductNotFoundException("Funds drawn with Id: " + purchasedId + " doesn't exists");
        }
        return purchasedProduct.get();
    }

    public Iterable<PurchasedProduct> findAllPurchasedProducts() {
        return purchasedProductRepository.findAll();
    }

    public void deletePurchasedProductById(Long purchasedId) {
        purchasedProductRepository.delete(findById(purchasedId));
    }
}