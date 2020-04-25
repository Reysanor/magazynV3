package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.InsertedProduct;
import io.agileintelligence.ppmtool.services.InsertedProductService;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/inserted")
@CrossOrigin
public class InsertedProductController {

    @Autowired
    private InsertedProductService insertedProductService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("{automat_id}/{product_id}")
    public ResponseEntity<?> createNewInsertedProduct(@PathVariable String automat_id, @PathVariable Long product_id,@Valid @RequestBody InsertedProduct insertedProduct,BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;

        InsertedProduct insertedProduct1 = insertedProductService.saveOrUpdateInsertedProduct(insertedProduct,automat_id,product_id);
        return new ResponseEntity<InsertedProduct>(insertedProduct1, HttpStatus.CREATED);
    }

    @GetMapping("/{insertedProductId}")
    public ResponseEntity<?> getInsertedProductById(@PathVariable Long insertedProductId, Principal principal) {
        InsertedProduct insertedProduct = insertedProductService.findById(insertedProductId);
        return new ResponseEntity<InsertedProduct>(insertedProduct, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<InsertedProduct> getAllInsertedProducts(Principal principal) {
        return insertedProductService.findAllInsertedProducts();
    }

    @DeleteMapping("/{insertedProductId}")
    public ResponseEntity<?> deleteInsertedProduct(@PathVariable Long insertedProductId, Principal principal) {
        insertedProductService.deleteInsertedProductByName(insertedProductId);
        return new ResponseEntity<String>("Inserted Product with id " + insertedProductId + " was deleted", HttpStatus.OK);
    }
}
