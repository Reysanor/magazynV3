package io.agileintelligence.ppmtool.web;

import io.agileintelligence.ppmtool.domain.Tenant;
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

    @PostMapping("")
    public ResponseEntity<?> createNewTenant(@Valid @RequestBody Tenant tenant, BindingResult result, Principal principal){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        Tenant tenant1 = tenantService.saveOrUpdateTenant(tenant,principal.getName());
        return  new ResponseEntity<Tenant>(tenant1, HttpStatus.CREATED);
    }
    @GetMapping("/{tenantId}")
    public  ResponseEntity<?> getTenantById(@PathVariable String tenantId, Principal principal){
        Tenant tenant = tenantService.findByNip(tenantId,principal.getName());
    }

    @GetMapping("/{all}")
    public Iterable<Tenant> getAllTenants(Principal principal){
        return  tenantService.findAllTenants(principal.getName());
    }

    @DeleteMapping("/{tenantId}")
    public ResponseEntity<?> deleteTenant(@PathVariable String tenantId, Principal principal){
        tenantService.deleteTenantByNip(tenantId,principal.getName());
        return new ResponseEntity<String>("Tenant with ID: " + tenantId + " was deleted",HttpStatus.OK);
    }

}
