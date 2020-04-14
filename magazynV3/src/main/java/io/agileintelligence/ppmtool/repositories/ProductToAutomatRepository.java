package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.ProductToAutomat;
import org.springframework.data.repository.CrudRepository;

public interface ProductToAutomatRepository extends CrudRepository<ProductToAutomat,Long> {
    ProductToAutomat findByAutomatAndProduct(Automat automat, Product product);

    Iterable<ProductToAutomat> findAllByAutomat(Automat automat);


}
