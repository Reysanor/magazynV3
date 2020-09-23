package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.*;
import io.agileintelligence.ppmtool.services.*;
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


    @PostMapping("")
    public ResponseEntity<?> createNewAutomat(@Valid @RequestBody Automat automat, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        Automat automat1 = automatService.saveOrUpdateAutomat(automat);
        return new ResponseEntity<Automat>(automat1, HttpStatus.CREATED);
    }

    @GetMapping("/{automatId}")
    public ResponseEntity<?> getAutomatById(@PathVariable String automatId, Principal principal) {
        Automat automat = automatService.findBySerialNumber(automatId);
        return new ResponseEntity<Automat>(automat, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Automat> getAllAutomats() {
        return automatService.findAllAutomats();
    }

    @GetMapping("/all/{tenantId}")
    public Iterable<Automat> getAllAutomatsToTenant(@PathVariable Long tenantId) {
        return automatService.findAllAutomatsToTenant(tenantId);
    }

    @GetMapping("/all/free")
    public Iterable<Automat> getAllAutomatsToTenantFree() {
        return automatService.findAllAutomatsToTenantFree();
    }


    @DeleteMapping("/{automatId}")
    public ResponseEntity<?> deleteAutomat(@PathVariable String automatId, Principal principal) {
        automatService.deleteAutomatBySerialNumber(automatId);
        return new ResponseEntity<String>("Automat with SerialNumber: " + automatId + " was deleted", HttpStatus.OK);
    }

//////////////////////automat to product


    @PostMapping("/{automat_id}/pta/{product_id}")
    public ResponseEntity<?> addProductToAutomat(@PathVariable String automat_id, @PathVariable Long product_id, @Valid @RequestBody ProductToAutomat productToAutomat, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        ProductToAutomat productToAutomat1 = automatService.addPtA(automat_id,product_id,productToAutomat);
        return new ResponseEntity<ProductToAutomat>(productToAutomat1, HttpStatus.CREATED);
    }


    @GetMapping("/{automatId}/pta/{productId}")
    public ResponseEntity<?> getProductToAutomat(@PathVariable String automatId, @PathVariable Long productId) {
        ProductToAutomat productToAutomat1 = automatService.findPta(automatId,productId);
        return new ResponseEntity<ProductToAutomat>(productToAutomat1, HttpStatus.OK);
    }

    @GetMapping("/{automat_id}/pta/all")
    public Iterable<ProductToAutomat> getAllPta(@PathVariable String automat_id){
        return automatService.getAllPta(automat_id);
    }


    @DeleteMapping("/{automatId}/pta/{productId}")
    public ResponseEntity<?> deletePta(@PathVariable String automatId, @PathVariable Long productId) {
        automatService.deletePta(automatId,productId);
        return new ResponseEntity<String>("Automat with SerialNumber: " + automatId + " to product " + productId +" was deleted", HttpStatus.OK);
    }

    @DeleteMapping("/{automatId}/pta/all/delete")
    public ResponseEntity<?> deleteAllPta(@PathVariable String automatId) {
        automatService.deleteAllPta(automatId);
        return new ResponseEntity<String>("All product to automat has been deleted " + automatId + " was deleted", HttpStatus.OK);
    }


    @PatchMapping("/{automat_id}/pta/{product_id}")
    public ResponseEntity<?> updateProductToAutomat(@PathVariable String automat_id, @PathVariable Long product_id, @Valid @RequestBody ProductToAutomat productToAutomat, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        ProductToAutomat updatedProductToAutomat1 = automatService.UpdatePtA(automat_id,product_id,productToAutomat);
        return new ResponseEntity<ProductToAutomat>(updatedProductToAutomat1, HttpStatus.OK);
    }



    //zmienic na patch
    @PostMapping("/att/{tenant_id}/{automat_id}")
    public ResponseEntity<?> addAutomatToTenant(
            @PathVariable Long tenant_id, @PathVariable String automat_id) {
        // ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        //if (errorMap != null) return errorMap;
        Automat automat1 = automatService.setTenant(tenant_id, automat_id);
        return new ResponseEntity<Automat>(automat1, HttpStatus.CREATED);
    }

    @PatchMapping("/att/{automat_id}")
    public ResponseEntity<?> deleteAutomatfromTenant(@PathVariable String automat_id) {
        // ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        //if (errorMap != null) return errorMap;
        Automat automat1 = automatService.removeTenant(automat_id);
        return new ResponseEntity<Automat>(automat1, HttpStatus.OK);
    }

    @GetMapping("/att/{automatId}")
    public ResponseEntity<?> getTenantToAutomat(@PathVariable String automatId, Principal principal) {
        System.out.println("hi");
       // AutomatToTenantHistory automatToTenantHistory = automatService.findTenantToAutomatBySerialNumber(automatId);
        Automat automat = automatService.findBySerialNumber(automatId);

        return new ResponseEntity<String>("automat", HttpStatus.OK);
    }
}
