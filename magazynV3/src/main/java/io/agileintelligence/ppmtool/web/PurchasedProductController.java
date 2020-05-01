package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.PurchasedProduct;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.PurchasedProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/purchased")
@CrossOrigin
public class PurchasedProductController {


    @Autowired
    private PurchasedProductService purchasedProductService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("{productId}")
    public ResponseEntity<?> createOrUpdatePurchasedProduct(@Valid @RequestBody PurchasedProduct purchasedProduct,BindingResult result, @PathVariable Long productId, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        PurchasedProduct purchasedProduct1 = purchasedProductService.createOrUpdatePurchasedProduct(purchasedProduct,productId);
        return new ResponseEntity<PurchasedProduct>(purchasedProduct1, HttpStatus.CREATED);
    }

    @PostMapping("/remove/{productId}")
    public ResponseEntity<?> removePurchasedProduct(@Valid @RequestBody PurchasedProduct purchasedProduct,BindingResult result, @PathVariable Long productId, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        PurchasedProduct purchasedProduct1 = purchasedProductService.removePurchasedProduct(purchasedProduct,productId);
        return new ResponseEntity<PurchasedProduct>(purchasedProduct1, HttpStatus.CREATED);
    }

    @GetMapping("/{purchasedId}")
    public ResponseEntity<?> getPurchaseById(@PathVariable Long purchasedId, Principal principal) {
        PurchasedProduct purchasedProduct1 = purchasedProductService.findById(purchasedId);
        return new ResponseEntity<PurchasedProduct>(purchasedProduct1, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<PurchasedProduct> getAllPurchases(Principal principal) {
        return purchasedProductService.findAllPurchasedProducts();
    }

    @GetMapping("/all/per")
    public Iterable<PurchasedProduct> getAllPurchasesPer() {
        return purchasedProductService.findAllPurchasedProductsPer();
    }

    @GetMapping("/per/{product_id}")
    public PurchasedProduct getPurchasesPer(@PathVariable Long product_id) {
        return purchasedProductService.findPurchasedProductsPer(product_id);
    }

    @DeleteMapping("/{purchasedId}")
    public ResponseEntity<?> deleteAutomat(@PathVariable Long purchasedId, Principal principal) {
        purchasedProductService.deletePurchasedProductById(purchasedId);
        return new ResponseEntity<String>("Purchase with Id: " + purchasedId + " was deleted", HttpStatus.OK);
    }
}
