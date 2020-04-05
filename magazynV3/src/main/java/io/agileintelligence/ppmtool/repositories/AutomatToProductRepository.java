package io.agileintelligence.ppmtool.repositories;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.AutomatToProduct;
import io.agileintelligence.ppmtool.domain.Product;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AutomatToProductRepository extends CrudRepository<AutomatToProduct, Long> {

   // List<AutomatToProduct> findByAutomat(Automat automat_id);

 //   AutomatToProduct findByAutomatAndProduct(Automat automat, Product product);
}
