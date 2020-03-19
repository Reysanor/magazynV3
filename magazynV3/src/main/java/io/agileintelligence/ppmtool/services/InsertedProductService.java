package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.AutomatToProduct;
import io.agileintelligence.ppmtool.domain.InsertedProduct;
import io.agileintelligence.ppmtool.repositories.AutomatToProductRepository;
import io.agileintelligence.ppmtool.repositories.InsertedProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InsertedProductService {

    @Autowired
    InsertedProductRepository insertedProductRepository;

    @Autowired
    AutomatToProductRepository automatToProductRepository;

    public InsertedProduct saveOrUpdateInsertedProduct(InsertedProduct insertedProduct, Long automatToProductId) {
        Optional<AutomatToProduct> automatToProduct = automatToProductRepository.findById(automatToProductId);
        insertedProduct.setAutomatToProduct(automatToProduct.get());
        return insertedProductRepository.save(insertedProduct);
    }

    public InsertedProduct findById(Long insertedProductId) {
        Optional<InsertedProduct> insertedProduct = insertedProductRepository.findById(insertedProductId);
        return insertedProduct.get();
    }

    public Iterable<InsertedProduct> findAllInsertedProducts() {

        return insertedProductRepository.findAll();
    }

    public void deleteInsertedProductByName(Long insertedProductId) {
        insertedProductRepository.delete(findById(insertedProductId));

    }
}
