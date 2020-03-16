package io.agileintelligence.ppmtool.web;


import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.AutomatToProduct;
import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.repositories.AutomatToProductRepository;
import io.agileintelligence.ppmtool.services.AutomatService;
import io.agileintelligence.ppmtool.services.AutomatToProductService;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/automat")
@CrossOrigin
public class AutomatController {

    @Autowired
    private AutomatService automatService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private AutomatToProductService automatToProductService;

    @PostMapping("")
    public ResponseEntity<?> createNewAutomat(@Valid @RequestBody Automat automat, BindingResult result, Principal principal) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        Automat automat1 = automatService.saveOrUpdateAutomat(automat, principal.getName());
        return new ResponseEntity<Automat>(automat1, HttpStatus.CREATED);

    }


    @GetMapping("/{automatId}")
    public ResponseEntity<?> getAutomatById(@PathVariable String automatId, Principal principal) {
        Automat automat = automatService.findBySerialNumber(automatId, principal.getName());
        return new ResponseEntity<Automat>(automat, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Automat> getAllAutomats(Principal principal) {
        return automatService.findAllAutomats(principal.getName());
    }

    @DeleteMapping("/{automatId}")
    public ResponseEntity<?> deleteAutomat(@PathVariable String automatId, Principal principal) {
        automatService.deleteAutomatBySerialNumber(automatId, principal.getName());
        return new ResponseEntity<String>("Automat with SerialNumber: " + automatId + " was deleted", HttpStatus.OK);
    }

    @PostMapping("/{automatId}/{productId}")
    public ResponseEntity<?> addProductToAutomat(@PathVariable String automatId, @PathVariable Long productId, @Valid @RequestBody AutomatToProduct automatToProduct, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        automatToProductService.addProductToAutomat(automatId, productId, automatToProduct, principal.getName());
        return new ResponseEntity<AutomatToProduct>(automatToProduct, HttpStatus.OK);

    }

    @GetMapping("/products/{automatId}")
    public Iterable<AutomatToProduct> getAllAutomatsToProducts(@PathVariable String automatId, Principal principal) {
        return automatToProductService.findAllAutomatsToProducts(automatId,principal.getName());
    }

    @DeleteMapping("/products/{automatId}/{productId}")
    public ResponseEntity<?> deleteAutomatToProduct(@PathVariable String automatId, @PathVariable Long productId, Principal principal) {
        automatToProductService.deleteAutomatToProduct(automatId,productId, principal.getName());
        return new ResponseEntity<String>("Connection between automat: " + automatId + " and product" + productId + " was deleted", HttpStatus.OK);
    }

}
