package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Tenant;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.TenantIdException;
import io.agileintelligence.ppmtool.exceptions.TenantNotFoundException;
import io.agileintelligence.ppmtool.repositories.TenantRepository;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TenantService {
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    UserRepository userRepository;

    public Tenant saveOrUpdateTenant(Tenant tenant) {
        Long tenantIdGet = tenant.getId();
        if (tenantIdGet != null) {
            Tenant existingTenant = findById(tenantIdGet);
            if (existingTenant == null) {
                throw new TenantNotFoundException(" Tenant with id: " + tenant.getId() + "  does not exist ");
            }
        }
        try {
            return tenantRepository.save(tenant);
        } catch (Exception e) {
            throw new TenantIdException(" Tenant with id: " + tenantIdGet + "  does already exist ");
        }
    }




    public Tenant findById(Long id) {
        Optional<Tenant> tenant = tenantRepository.findById(id);

        if (!tenant.isPresent()) {
            throw new TenantNotFoundException("Tenant with id " + id + " does not exist");
        }

        return tenant.get();
    }

    public Iterable<Tenant> findAllTenants() {
        return tenantRepository.findAllByDeleted(0);
    }

    public void deleteTenantById(Long id) {
        Tenant tenant = findById(id);
        tenant.setDeleted(1);
        tenantRepository.save(tenant);
    }
}
