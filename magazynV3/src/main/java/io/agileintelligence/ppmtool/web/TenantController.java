package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.Tenant;
import io.agileintelligence.ppmtool.services.AutomatService;
import io.agileintelligence.ppmtool.services.MapValidationErrorService;
import io.agileintelligence.ppmtool.services.TenantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;

@RestController
@RequestMapping("/api/tenant")
@CrossOrigin
public class TenantController {
    @Autowired
    private TenantService tenantService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private
    AutomatService automatService;



    @PostMapping("")
    public ResponseEntity<?> createNewTenant(@Valid @RequestBody Tenant tenant, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        Tenant tenant1 = tenantService.saveOrUpdateTenant(tenant);
        return new ResponseEntity<Tenant>(tenant1, HttpStatus.CREATED);
    }

    @GetMapping("/{tenantId}")
    public ResponseEntity<?> getTenantById(@PathVariable Long tenantId) {
        Tenant tenant = tenantService.findById(tenantId);
        System.out.println(tenant.getNip());
        return new ResponseEntity<Tenant>(tenant, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Tenant> getAllTenants() {
        return tenantService.findAllTenants();
    }

    @DeleteMapping("/{tenantId}")
    public ResponseEntity<?> deleteTenant(@PathVariable Long tenantId) {
        tenantService.deleteTenantById(tenantId);
        return new ResponseEntity<String>("Tenant with id: " + tenantId + " was deleted", HttpStatus.OK);
    }



}
