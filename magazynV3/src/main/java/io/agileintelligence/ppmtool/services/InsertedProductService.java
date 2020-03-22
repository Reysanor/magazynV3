package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.AutomatToProduct;
import io.agileintelligence.ppmtool.domain.InsertedProduct;
import io.agileintelligence.ppmtool.exceptions.AutomatNotFoundException;
import io.agileintelligence.ppmtool.exceptions.InsertedProductIdException;
import io.agileintelligence.ppmtool.exceptions.InsertedProductNotFoundException;
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
        Long insertedProductIdGet = insertedProduct.getId();
        if(insertedProduct.getId() !=null){
            Optional<InsertedProduct> existingInsertedProduct = insertedProductRepository.findById(insertedProductIdGet);
            if(!existingInsertedProduct.isPresent()){
                throw new InsertedProductNotFoundException("Inserted Product with Id: " + insertedProductIdGet + " doesn't exists");
            }
        }
        Optional<AutomatToProduct> automatToProduct = automatToProductRepository.findById(automatToProductId);
        if(!automatToProduct.isPresent()){
            throw new AutomatNotFoundException("Cannot add - automat to product with Serial Number: " + automatToProductId + " doesn't exists");
        }
        try{
            insertedProduct.setId(insertedProductIdGet);
            insertedProduct.setAutomatToProduct(automatToProduct.get());
            return insertedProductRepository.save(insertedProduct);

        }catch (Exception e){
            throw new InsertedProductIdException("Inserted Product with Id: " + insertedProductIdGet + " already exists");
        }
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
