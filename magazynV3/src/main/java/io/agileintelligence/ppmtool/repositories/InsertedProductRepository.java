package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.InsertedProduct;
import io.agileintelligence.ppmtool.domain.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface InsertedProductRepository extends CrudRepository<InsertedProduct, Long> {

        Iterable<InsertedProduct> findAllByAutomatAndProduct(Automat automat, Product product);
        Iterable<InsertedProduct> findByAutomat(Automat automat);
        Iterable<InsertedProduct> findAllByAutomat(Automat automat);
}
