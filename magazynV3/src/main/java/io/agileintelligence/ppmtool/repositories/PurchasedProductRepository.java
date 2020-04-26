package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.PurchasedProduct;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface PurchasedProductRepository extends CrudRepository<PurchasedProduct, Long> {

    Iterable<PurchasedProduct> findAllByProduct(Product product);
}
