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

    @PostMapping("/{tenant_id}/{automat_id}")
    public ResponseEntity<?> addAutomatToTenant(
                                                @PathVariable String tenant_id, @PathVariable String automat_id, Principal principal) {
       // ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        //if (errorMap != null) return errorMap;

        Automat automat1 = automatService.setTenant(tenant_id, automat_id);

        return new ResponseEntity<Automat>(automat1, HttpStatus.CREATED);
    }


    @PostMapping("")
    public ResponseEntity<?> createNewTenant(@Valid @RequestBody Tenant tenant, BindingResult result, Principal principal) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if (errorMap != null) return errorMap;
        Tenant tenant1 = tenantService.saveOrUpdateTenant(tenant, principal.getName());
        return new ResponseEntity<Tenant>(tenant1, HttpStatus.CREATED);
    }

    @GetMapping("/{tenantId}")
    public ResponseEntity<?> getTenantById(@PathVariable String tenantId, Principal principal) {
        Tenant tenant = tenantService.findByNip(tenantId);
        System.out.println(tenant.getNip());
        return new ResponseEntity<Tenant>(tenant, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Tenant> getAllTenants(Principal principal) {
        return tenantService.findAllTenants(principal.getName());
    }

    @DeleteMapping("/{tenantId}")
    public ResponseEntity<?> deleteTenant(@PathVariable String tenantId, Principal principal) {
        tenantService.deleteTenantByNip(tenantId, principal.getName());
        return new ResponseEntity<String>("Tenant with Nip: " + tenantId + " was deleted", HttpStatus.OK);
    }

}
