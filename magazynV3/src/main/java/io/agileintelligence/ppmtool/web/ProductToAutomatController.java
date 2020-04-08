package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.ProductToAutomat;
import io.agileintelligence.ppmtool.services.AutomatService;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.ProductToAutomatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/pta")
@CrossOrigin
public class ProductToAutomatController {


    @Autowired
    private ProductToAutomatService productToAutomatService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    @PostMapping("/{automatId}/{productId}")
    public ResponseEntity<?> createNewAutomat(@PathVariable String automatId, @PathVariable Long productId, @Valid @RequestBody ProductToAutomat productToAutomat, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        ProductToAutomat productToAutomat1 = productToAutomatService.saveOrUpdatePtA(automatId,productId,productToAutomat);
        return new ResponseEntity<ProductToAutomat>(productToAutomat1, HttpStatus.CREATED);

    }


}
