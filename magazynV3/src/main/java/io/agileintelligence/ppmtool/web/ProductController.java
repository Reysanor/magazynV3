package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/product")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;


    @PostMapping("")
    public ResponseEntity<?> createNewProduct(@Valid @RequestBody Product product, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        Product product1 = productService.saveOrUpdateProduct(product);
        return new ResponseEntity<Product>(product1, HttpStatus.CREATED);
    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId) {
        Product product = productService.findById(productId);
       // Product product = productService (productId, principal.getName());
        return new ResponseEntity<Product>(product, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Product> getAllProducts(Principal principal) {
        return productService.findAllAutomats(principal.getName());
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId) {
        productService.deleteProductById(productId);
        return new ResponseEntity<String>("Product with id " + productId + " was deleted", HttpStatus.OK);
    }
}
