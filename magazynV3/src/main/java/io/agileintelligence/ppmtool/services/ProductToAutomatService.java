package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.ProductToAutomat;
import io.agileintelligence.ppmtool.repositories.AutomatRepository;
import io.agileintelligence.ppmtool.repositories.ProductRepository;
import io.agileintelligence.ppmtool.repositories.ProductToAutomatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductToAutomatService {

    @Autowired
    private AutomatRepository automatRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    ProductToAutomatRepository productToAutomatRepository;
    public ProductToAutomat saveOrUpdatePtA(String automatId, Long productId, ProductToAutomat productToAutomat) {
        Automat automat = automatRepository.findBySerialNumber(automatId);
        Product product = productRepository.findById(productId).get();
       //1 productToAutomat.setAutomat(automat);
       //1 productToAutomat.setProduct(product);
        productToAutomat.setAutomat(automat);
        productToAutomat.setProduct(product);
        //automat.getProductToAutomats().add(productToAutomat);
       automat.addProductToAutomats(productToAutomat);
        //product.getProductToAutomats().add(productToAutomat);
        automatRepository.save(automat);
        return productToAutomat;
    }
}
