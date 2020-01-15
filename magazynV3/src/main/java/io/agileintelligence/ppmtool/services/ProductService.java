package io.agileintelligence.ppmtool.services;


import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.exceptions.ProductIdException;
import io.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import io.agileintelligence.ppmtool.repositories.ProductRepository;
import io.agileintelligence.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Product saveOrUpdateProduct(Product product, String username) {
        String productNameGet = product.getName().toUpperCase();

        if (product.getId() != null) {
            Product existingProduct = productRepository.findByName(product.getName());
            if (existingProduct != null && (!existingProduct.getProductLeader().equals(username))) {
                throw new ProjectNotFoundException(" Product is not your ");
            } else if (existingProduct == null) {
                throw new ProjectNotFoundException("Product with Name: " + product.getName() + " doesn't exists");

            }
        }

        try {
            //set owner
            //Logi
            //zapis do bazy
            return productRepository.save(product);
        } catch (Exception e) {
            throw new ProductIdException("Product with Name: " + productNameGet + " doesn't exists");
        }
    }

    public Product findByName(String name, String username) {
        Product product = productRepository.findByName(name);
        if (product == null) {
            throw new ProjectNotFoundException("Product with Name: " + product.getName() + " doesn't exists");

        }
        if (!product.getProductLeader().equals(username)) {
            throw new ProjectNotFoundException(" Product is not your ");

        }
        return product;
    }

    public Iterable<Product> findAllAutomats(String username){
        return  productRepository.findAll();
    }

    public void deleteProductByName(String name, String username){
        productRepository.delete(findByName(name,username));
    }
}
