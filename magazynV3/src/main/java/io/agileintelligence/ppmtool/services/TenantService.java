package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Tenant;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.TenantIdException;
import io.agileintelligence.ppmtool.exceptions.TenantNotFoundException;
import io.agileintelligence.ppmtool.repositories.TenantRepository;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TenantService {
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    UserRepository userRepository;

    public Tenant saveOrUpdateTenant(Tenant tenant, String username) {
        String tenantNipGet = tenant.getNip().toUpperCase();
        if (tenant.getId() != null) {
            Tenant existingTenant = tenantRepository.findByNip(tenant.getNip());
            if (existingTenant != null && (!existingTenant.getTenantLeader().equals(username))) {
                throw new TenantNotFoundException(" Tenant is not your ");
            } else
                if (existingTenant == null) {
                throw new TenantNotFoundException(" Tenant with ID: " + tenant.getId() + "  does not exist ");
            }
        }
        try {
            //set owner
            User user = userRepository.findByUsername(username);
            tenant.setTenantLeader(user.getUsername());
            tenant.setNip(tenantNipGet);
            //Logi
            return tenantRepository.save(tenant);
        } catch (Exception e) {
            throw new TenantIdException(" Tenant with Nip: " + tenantNipGet + "  does not exist ");
        }
    }

    public Tenant findByNip(String nip){

        Tenant tenant = tenantRepository.findByNip(nip);

        if(tenant == null){
            throw new TenantNotFoundException("Tenant with Nip "+ nip + "does not exist");
        }
        //if(!tenant.getTenantLeader().equals(username)){
        //    throw  new TenantNotFoundException("Tenant is not your");
        //}
        return tenant;
    }

    public  Iterable<Tenant> findAllTenants(String username){
        return tenantRepository.findAll();
    }

    public void deleteTenantByNip(String nip, String username){
        tenantRepository.delete(findByNip(nip));
    }
}
