package io.agileintelligence.ppmtool.services;


import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.ProductIdException;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.ProductRepository;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    public Product saveOrUpdateProduct(Product product, String username) {
        Long productGetId = product.getId();
        String productGetName = product.getName();

        if (product.getId() != null) {
            Optional<Product> optionalExistingProduct = productRepository.findById(productGetId);
            if (optionalExistingProduct.isPresent() && (!optionalExistingProduct.get().getProductLeader().equals(username))) {
                throw new ProjectNotFoundException(" Product is not your ");
            } else
                if (optionalExistingProduct.get() == null) {
                throw new ProjectNotFoundException("Product with Name: " + product.getName() + " doesn't exists");
            }
        }

        try {
            //set owner
            User user = userRepository.findByUsername(username);
            product.setProductLeader(user.getUsername());
            product.setId(productGetId);

            //Logi
            //zapis do bazy
            return productRepository.save(product);

        } catch (Exception e) {
            throw new ProductIdException("Product with name: " + productGetName + " doesn't exists");
        }
    }

    public Product findById(Long id, String username) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isPresent()) {
            Product product1 = product.get();
            if (!product1.getProductLeader().equals(username)) {
                throw new ProjectNotFoundException(" Product is not your ");
            }
            return product1;

        } else {
            throw new ProjectNotFoundException("Product with id: " + id + " doesn't exists");
        }
    }

    public Iterable<Product> findAllAutomats(String username) {
        return productRepository.findAll();
    }

    public void deleteProductByName(Long id, String username) {
        productRepository.delete(findById(id, username));
    }
}
