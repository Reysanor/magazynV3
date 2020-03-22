package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.AutomatToProduct;
import io.agileintelligence.ppmtool.services.AutomatService;
import io.agileintelligence.ppmtool.services.AutomatToProductService;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
@RestController
@RequestMapping("/api/atp")
@CrossOrigin
public class AutomatToProductController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private AutomatToProductService automatToProductService;


    @PostMapping("/{automatId}/{productId}")
    public ResponseEntity<?> addProductToAutomat(@PathVariable String automatId, @PathVariable Long productId, @Valid @RequestBody AutomatToProduct automatToProduct, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        automatToProductService.addProductToAutomat(automatId, productId, automatToProduct);
        return new ResponseEntity<AutomatToProduct>(automatToProduct, HttpStatus.OK);

    }

    @GetMapping("/{automatId}")
    public Iterable<AutomatToProduct> getAllAutomatsToProducts(@PathVariable String automatId, Principal principal) {
        return automatToProductService.findAllAutomatsToProducts(automatId);
    }

    @GetMapping("/{automatId}/{productId}")
    public AutomatToProduct getAutomatToProduct(@PathVariable String automatId, @PathVariable Long productId,Principal principal) {
        return automatToProductService.findAutomatToProduct(automatId,productId);
    }

    @DeleteMapping("/{automatId}/{productId}")
    public ResponseEntity<?> deleteAutomatToProduct(@PathVariable String automatId, @PathVariable Long productId, Principal principal) {
        automatToProductService.deleteAutomatToProduct(automatId,productId);
        return new ResponseEntity<String>("Connection between automat: " + automatId + " and product" + productId + " was deleted", HttpStatus.OK);
    }


}
