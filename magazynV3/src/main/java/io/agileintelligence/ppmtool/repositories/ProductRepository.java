package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {
    Product findByName (String name);
   // Product findById(Long id);
   // Product findById(Long id);
}
