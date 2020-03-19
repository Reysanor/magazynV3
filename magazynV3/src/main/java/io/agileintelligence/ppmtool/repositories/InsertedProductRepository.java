package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.InsertedProduct;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface InsertedProductRepository extends CrudRepository<InsertedProduct, Long> {



}
