package io.agileintelligence.ppmtool.services;


import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.ProductToAutomat;
import io.agileintelligence.ppmtool.exceptions.ProductIdException;
import io.agileintelligence.ppmtool.exceptions.ProductNotFoundException;
import io.agileintelligence.ppmtool.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private ProductToAutomatRepository productToAutomatRepository;
    @Autowired
    private AutomatRepository automatRepository;


    public Product saveOrUpdateProduct(Product product) {
        Long productGetId = product.getId();
        String productGetName = product.getName();
        if (product.getId() != null) {
            Optional<Product> optionalExistingProduct = productRepository.findById(productGetId);
            if (!optionalExistingProduct.isPresent()) {
                throw new ProductNotFoundException("Product with Name: " + product.getName() + " doesn't exists");
            }
        }
        try {
            return productRepository.save(product);
        } catch (Exception e) {
            throw new ProductIdException("Product with name: " + productGetName + " already exists");
        }
    }

    public Product findById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {

            return product.get();

        } else {
            throw new ProductNotFoundException("Product with id: " + id + " doesn't exists");
        }
    }

    public Iterable<Product> findAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProductById(Long id) {
        productRepository.delete(findById(id));
    }


    public Iterable<Product> findAllProductsNotInAutomat(String automatId) {
        List<Product> userProducts = new ArrayList<>();
        Iterable<ProductToAutomat> list = productToAutomatRepository.findAllByAutomat(automatRepository.findBySerialNumber(automatId));
        List<Product> freeProducts = new ArrayList<>();

        for (ProductToAutomat productToAutomat : list) {
            userProducts.add(productToAutomat.getProduct());
        }

        for (Product product : findAllProducts()) {
            if (!userProducts.contains(product)) {
                freeProducts.add(product);
            }
        }
        return freeProducts;
    }
}
