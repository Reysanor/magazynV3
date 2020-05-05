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
    public ResponseEntity<?> getInsertedProductById(@PathVariable Long insertedProductId) {
        InsertedProduct insertedProduct = insertedProductService.findById(insertedProductId);
        return new ResponseEntity<InsertedProduct>(insertedProduct, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<InsertedProduct> getAllInsertedProducts(Principal principal) {
        return insertedProductService.findAllInsertedProducts();
    }

    @GetMapping("/all/{automat_id}")
    public Iterable<InsertedProduct> getAllInsertedProductsByAutomat(@PathVariable String automat_id) {
        return insertedProductService.findAllInsertedProductsByAutomat(automat_id);
    }
    @GetMapping("/all/{automat_id}/{product_id}")
    public Iterable<InsertedProduct> getInsertedOneProductByAutomat(@PathVariable String automat_id,@PathVariable Long product_id) {
        return insertedProductService.findInsertedOneProductsByAutomat(automat_id, product_id);
    }


    @DeleteMapping("/{insertedProductId}")
    public ResponseEntity<?> deleteInsertedProduct(@PathVariable Long insertedProductId) {
        insertedProductService.deleteInsertedProductByName(insertedProductId);
        return new ResponseEntity<String>("Inserted Product with id " + insertedProductId + " was deleted", HttpStatus.OK);
    }

    @GetMapping("/profit/{automat_id}/{product_id}")
    public InsertedProduct getInsertedProductAvaragePriceByAutomat(@PathVariable String automat_id, @PathVariable Long product_id) {
        return insertedProductService.findAllInsertedByAutomatandProduct(automat_id,product_id);
    }

    @GetMapping("/profit/{automat_id}")
    public Iterable<InsertedProduct> getInsertedProductsAvaragePriceByAutomat(@PathVariable String automat_id) {
        return insertedProductService.findInsertedPriceByAutomat(automat_id);
    }

    @GetMapping("/profit/all/{automat_id}")
    public InsertedProduct getInsertedProductsToAutomatTotalProfit(@PathVariable String automat_id) {
        return insertedProductService.findInsertedPriceToAutomatTotalProfit(automat_id);
    }
    //inserted product infor by product
    @GetMapping("/profit/all")
    public Iterable<InsertedProduct> getInsertedProductsInfo() {
        return insertedProductService.findInsertedProductsInfo();
    }


}
