package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.InsertedProduct;
import io.agileintelligence.ppmtool.exceptions.AutomatNotFoundException;
import io.agileintelligence.ppmtool.exceptions.InsertedProductIdException;
import io.agileintelligence.ppmtool.exceptions.InsertedProductNotFoundException;
import io.agileintelligence.ppmtool.repositories.InsertedProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class InsertedProductService {

    @Autowired
    InsertedProductRepository insertedProductRepository;


    public InsertedProduct saveOrUpdateInsertedProduct(InsertedProduct insertedProduct, Long automatToProductId) {
        return new InsertedProduct();
    }


    public InsertedProduct findById(Long insertedProductId) {
        Optional<InsertedProduct> insertedProduct = insertedProductRepository.findById(insertedProductId);
        if(!insertedProduct.isPresent()){
            throw new InsertedProductNotFoundException("Inserted Product with Id: " + insertedProductId + " doesn't exists");
        }
        return insertedProduct.get();
    }

    public Iterable<InsertedProduct> findAllInsertedProducts() {

        return insertedProductRepository.findAll();
    }

    public void deleteInsertedProductByName(Long insertedProductId) {
        insertedProductRepository.delete(findById(insertedProductId));

    }


}
