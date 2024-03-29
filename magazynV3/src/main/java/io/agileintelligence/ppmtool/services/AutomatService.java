package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.*;
import io.agileintelligence.ppmtool.exceptions.*;
import io.agileintelligence.ppmtool.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
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
    ProductToAutomatRepository productToAutomatRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    @Autowired
    AutomatToTenantHistoryRepository automatToTenantHistoryRepository;



    public Automat saveOrUpdateAutomat(Automat automat) {
        String automatSerialNumberGet = automat.getSerialNumber().toUpperCase();

        if (automat.getId() != null) {
            Automat existingAutomat = automatRepository.findBySerialNumber(automat.getSerialNumber());

            if (existingAutomat == null) {
                throw new AutomatNotFoundException("Automat with Serial Number: " + automat.getSerialNumber() + " doesn't exists");
            }
        }
        try {
            return automatRepository.save(automat);
        } catch (Exception e) {
            throw new AutomatIdException("Automat with Serial Number  '" + automatSerialNumberGet + "' already exists");
        }
    }

    public Automat findBySerialNumber(String serialNumber) {

        Automat automat = automatRepository.findBySerialNumber(serialNumber);
        if (automat == null) {
            throw new AutomatNotFoundException("Automat with serial number " + serialNumber + " does not exist");
        }

        return automat;
    }

    public Iterable<Automat> findAllAutomats() {
        return automatRepository.findAllByDeleted(0);
    }


    public void deleteAutomatBySerialNumber(String serialNumber) {
        Automat automat = automatRepository.findBySerialNumber(serialNumber);
        automat.setDeleted(1);

        automatRepository.save(automat);
    }

    ///////////////////////////////////////////////////////////////////
    public ProductToAutomat addPtA(String automatId, Long productId, ProductToAutomat productToAutomat) {
        Automat automat = findBySerialNumber(automatId);
        Product product = productService.findById(productId);
        productToAutomat.setAutomat(automat);
        productToAutomat.setProduct(product);

        automat.addProductToAutomats(productToAutomat);
        automatRepository.save(automat);
        return productToAutomat;
    }

    public ProductToAutomat findPta(String automatId, Long productId) {
        Automat automat = findBySerialNumber(automatId);
        Product product = productService.findById(productId);
        ProductToAutomat productToAutomat = productToAutomatRepository.findByAutomatAndProduct(automat,product);
        if (productToAutomat == null) {
            throw new ProductToAutomatNotFoundException("Product to automat with serial number " + automatId + " and product id " + productId  +" doesn't exists ");
        }

        return productToAutomat;
    }

    public Iterable<ProductToAutomat> getAllPta(String automatId) {
        Automat automat = findBySerialNumber(automatId);
        return productToAutomatRepository.findAllByAutomat(automat);
    }

    public void deletePta(String automatId, Long productId){
        productToAutomatRepository.delete(findPta(automatId,productId));
    }
    public void deleteAllPta(String automatId) {
        Automat automat = findBySerialNumber(automatId);
        productToAutomatRepository.deleteByAutomat(automat);
    }


    public ProductToAutomat UpdatePtA(String automat_id, Long product_id, ProductToAutomat updatedProductToAutomat) {
        ProductToAutomat productToAutomat = findPta(automat_id,product_id);
        productToAutomat=updatedProductToAutomat;
        return productToAutomatRepository.save(productToAutomat);
    }

    public Iterable<Automat> findAllAutomatsToTenant(Long tenantId) {
        //Tenant tenant = tenantService.findByNip(tenantId);

        return automatRepository.findAllByTenant(tenantService.findById(tenantId));

    }

    public Iterable<Automat> findAllAutomatsToTenantFree() {

        return automatRepository.findAllByTenantAndDeleted(null, 0);

    }

    public Automat setTenant(Long tenant_id, String automat_id) {
        Automat automatGet = findBySerialNumber(automat_id);
        if (automatGet == null) {
            throw new AutomatNotFoundException("Cannot add tenant - Automat with Serial Number: " + automat_id + " doesn't exists");
        }
        if (automatGet.getId() != null) {
            Automat existingAutomat = automatRepository.findBySerialNumber(automatGet.getSerialNumber());
            if (existingAutomat == null) {
                throw new AutomatNotFoundException("Cannot add tenant - Automat with Serial Number: " + automatGet.getSerialNumber() + " doesn't exists");
            }
        }

        if (automatGet.getTenant() != null) {
            throw new AutomatIdException("Automat with Serial Number'" + automat_id + "'is used already");
        }
        //czy istnieje tenant
        Tenant tenant = tenantService.findById(tenant_id);
        if (tenant == null) {
            throw new TenantNotFoundException(" Tenant with ID: " + tenant_id + "  does not exist ");
        }
        AutomatToTenantHistory automatToTenantHistory = new AutomatToTenantHistory();
        automatToTenantHistory.setAutomat(automatGet);
        automatToTenantHistory.setTenant(tenant);
        Date date = new Date();
        automatToTenantHistory.setInsertDate(date);
        automatGet.setTenant(tenant);
        automatToTenantHistoryRepository.save(automatToTenantHistory);
        return automatRepository.save(automatGet);
    }

    public Automat removeTenant(String automat_id) {
        Automat automat = findBySerialNumber(automat_id);
        automat.setTenant(null);
        saveOrUpdateAutomat(automat);
        return automatRepository.save(automat);
    }


    public AutomatToTenantHistory findTenantToAutomatBySerialNumber(String automatId) {
        AutomatToTenantHistory att = automatToTenantHistoryRepository.findFirstByAutomatOrderByIdDesc(findBySerialNumber(automatId));

        return att;

    }
}