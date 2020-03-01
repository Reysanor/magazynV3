package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.Tenant;
import io.agileintelligence.ppmtool.domain.User;
import io.agileintelligence.ppmtool.exceptions.*;
import io.agileintelligence.ppmtool.repositories.AutomatRepository;
import io.agileintelligence.ppmtool.repositories.ProductRepository;
import io.agileintelligence.ppmtool.repositories.TenantRepository;
import io.agileintelligence.ppmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

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

    public Automat addProduct(String automat_id, Long product_id, String username) {
        Automat existingAutomat = automatRepository.findBySerialNumber(automat_id);
        if (automat_id != null) {
            if (existingAutomat != null && (!existingAutomat.getAutomatLeader().equals(username))) {
                throw new AutomatNotFoundException("Cannot add tenant - Automat is not your ");
            } else if (existingAutomat == null) {
                throw new AutomatNotFoundException("Cannot add tenant - Automat with Serial Number: " + automat_id + " doesn't exists");
            }
        }
        Optional<Product> optionalExistingProduct = productRepository.findById(product_id);
        if (product_id != null) {
            if (optionalExistingProduct.isPresent() && (!optionalExistingProduct.get().getProductLeader().equals(username))) {
                throw new ProductNotFoundException(" Product is not your ");
            } else if (!optionalExistingProduct.isPresent()) {
                throw new ProductNotFoundException("Product with Name: " + product_id + " doesn't exists");
            }
        }
        if (optionalExistingProduct.isPresent()) {
            Product existingProduct = optionalExistingProduct.get();
<<<<<<< HEAD
           // existingAutomat.getProducts().add(existingProduct);
           // existingProduct.getAutomats().add(existingAutomat);
=======
            //existingAutomat.getProducts().add(existingProduct);
            //existingProduct.getAutomats().add(existingAutomat);
>>>>>>> deda832bbb66852305e5f739b3460850a14edd12
        } else {
            throw new ProductNotFoundException("Product with ID: " + product_id + " doesn't exists");
        }
        return automatRepository.save(existingAutomat);
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