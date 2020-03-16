package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.AutomatToProduct;
import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.exceptions.AutomatNotFoundException;
import io.agileintelligence.ppmtool.exceptions.ProductNotFoundException;
import io.agileintelligence.ppmtool.repositories.AutomatRepository;
import io.agileintelligence.ppmtool.repositories.AutomatToProductRepository;
import io.agileintelligence.ppmtool.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class AutomatToProductService {
    @Autowired
    AutomatToProductRepository automatToProductRepository;

    @Autowired
    private AutomatRepository automatRepository;

    @Autowired
    private ProductRepository productRepository;

    public void addProductToAutomat(String automatId, Long productId, AutomatToProduct automatToProduct, String username) {
        Automat existingAutomat = automatRepository.findBySerialNumber(automatId);
        Optional<Product> optionalExistingProduct = productRepository.findById(productId);
        automatRepository.save(existingAutomat);
        if (automatId != null) {
            if (existingAutomat != null && (!existingAutomat.getAutomatLeader().equals(username))) {
                throw new AutomatNotFoundException("Cannot add tenant - Automat is not your ");
            } else if (existingAutomat == null) {
                throw new AutomatNotFoundException("Cannot add tenant - Automat with Serial Number: " + automatId + " doesn't exists");
            }
        }
        if (productId != null) {
            if (optionalExistingProduct.isPresent() && (!optionalExistingProduct.get().getProductLeader().equals(username))) {
                throw new ProductNotFoundException(" Product is not your ");
            } else if (!optionalExistingProduct.isPresent()) {
                throw new ProductNotFoundException("Product with Name: " + productId + " doesn't exists");
            }
        }
        if (optionalExistingProduct.isPresent()) {
            Product existingProduct = optionalExistingProduct.get();
            automatToProduct.setAutomat(existingAutomat);
            automatToProduct.setProduct(existingProduct);
            existingProduct.getAutomatToProducts().add(automatToProduct);
        } else {
            throw new ProductNotFoundException("Product with ID: " + productId + " doesn't exists");
        }
        automatRepository.save(existingAutomat);
    }

    public Iterable<AutomatToProduct> findAllAutomatsToProducts(String automatId, String username) {
        return automatToProductRepository.findByAutomat(automatRepository.findBySerialNumber(automatId));
    }

    public void deleteAutomatToProduct(String automatId, Long productId, String username) {
        Automat existingAutomat = automatRepository.findBySerialNumber(automatId);
        Optional<Product> optionalExistingProduct = productRepository.findById(productId);
        Product existingProduct = optionalExistingProduct.get();
        automatToProductRepository.delete(automatToProductRepository.findByAutomatAndProduct(existingAutomat, existingProduct));
    }
}
