package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.*;
import io.agileintelligence.ppmtool.exceptions.*;
import io.agileintelligence.ppmtool.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static java.lang.Long.parseLong;

@Service
public class AutomatService {

    @Autowired
    private AutomatRepository automatRepository;
    @Autowired
    UserRepository userRepository;

    @Autowired
    TenantRepository tenantRepository;

    @Autowired
    TenantService tenantService;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    AutomatToProductRepository automatToProductRepository;

    public Automat setTenant(String tenant_id, String automat_id, String username) {
        Automat automatGet = automatRepository.findBySerialNumber(automat_id);
        if (automatGet == null) {
            throw new AutomatNotFoundException("Cannot add tenant - Automat with Serial Number: " + automat_id + " doesn't exists");
        }
        if (automatGet.getId() != null) {
            Automat existingAutomat = automatRepository.findBySerialNumber(automatGet.getSerialNumber());
            if (existingAutomat != null && (!existingAutomat.getAutomatLeader().equals(username))) {
                throw new AutomatNotFoundException("Cannot add tenant - Automat is not your ");
            } else if (existingAutomat == null) {
                throw new AutomatNotFoundException("Cannot add tenant - Automat with Serial Number: " + automatGet.getSerialNumber() + " doesn't exists");
            }
        }
        //czy istnieje tenant
        Tenant tenant = tenantService.findByNip(tenant_id, username);
        if (tenant == null) {
            throw new TenantNotFoundException(" Tenant with ID: " + tenant.getId() + "  does not exist ");
        }
        automatGet.setTenant(tenant);
        return automatRepository.save(automatGet);

    }



    public Automat saveOrUpdateAutomat(Automat automat, String username) {
        String automatSerialNumberGet = automat.getSerialNumber().toUpperCase();

        if (automat.getId() != null) {
            Automat existingAutomat = automatRepository.findBySerialNumber(automat.getSerialNumber());
            if (existingAutomat != null && (!existingAutomat.getAutomatLeader().equals(username))) {
                throw new AutomatNotFoundException(" Automat is not your ");
            } else if (existingAutomat == null) {
                throw new AutomatNotFoundException("Automat with Serial Number: " + automat.getSerialNumber() + " doesn't exists");
            }
        }
        try {
            User user = userRepository.findByUsername(username);
            automat.setAutomatLeader(user.getUsername());
            automat.setSerialNumber(automatSerialNumberGet);

            //set owner
            //Logi
            //zapis do bazy
            return automatRepository.save(automat);
        } catch (Exception e) {
            throw new AutomatIdException("Automat with Serial Number  '" + automatSerialNumberGet + "' already exists");
        }
    }

    public Automat findBySerialNumber(String serialNumber, String username) {

        Automat automat = automatRepository.findBySerialNumber(serialNumber);

        if (automat == null) {
            throw new AutomatNotFoundException("Automat with serial number " + serialNumber + " does not exist");
        }
//        if (!automat.getAutomatLeader().equals(username)) {
//            throw new AutomatNotFoundException("Automat is not your");
//        }

        return automat;
    }

    public Iterable<Automat> findAllAutomats(String username) {

        return automatRepository.findAll();
    }


    public void deleteAutomatBySerialNumber(String serialNumber, String username) {
        automatRepository.delete(findBySerialNumber(serialNumber, username));
    }



}