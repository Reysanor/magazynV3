package io.agileintelligence.ppmtool;

import io.agileintelligence.ppmtool.domain.*;
import io.agileintelligence.ppmtool.exceptions.*;
import io.agileintelligence.ppmtool.repositories.FundsDrawnRepository;
import io.agileintelligence.ppmtool.repositories.InsertedProductRepository;
import io.agileintelligence.ppmtool.repositories.ProductToAutomatRepository;
import io.agileintelligence.ppmtool.repositories.TenantRepository;
import io.agileintelligence.ppmtool.services.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class PpmtoolApplicationTests {

    @Test
    public void contextLoads() {
    }


    @Autowired
    private PurchasedProductService purchasedProductService;

    @Autowired
    private ProductService productService;

    @Autowired
    private AutomatService automatService;

    @Autowired
    private TenantService tenantService;

    @Autowired
    private TenantRepository tenantRepository;

    @Autowired
    private InsertedProductService insertedProductService;

    @Autowired
    private FundsDrawnService fundsDrawnService;

    @Autowired
    private FundsDrawnRepository fundsDrawnRepository;

    @Autowired
    private ProductToAutomatRepository productToAutomatRepository;

    // @Autowired
    //  private PurchasedProductService purchasedProductService;
    @Test
    public void roundToDecimal() {
        double one = 2.34343;
        assertEquals(2.34, purchasedProductService.round(one));
    }

    @Test
    public void checkProductName() {
        assertEquals("pepsi", productService.findById(3L).getName());
    }

    @Test
    public void checkNotExistingProductName() {
        assertThrows(ProductNotFoundException.class, () -> {
            productService.findById(434L);
        });
    }


    @Test
    public void checkAutomatName() {
        assertEquals("Automat nr 1", automatService.findBySerialNumber("1234567890").getName());
    }

    @Test
    public void checkNotExistingAutomatName() {
        assertThrows(AutomatNotFoundException.class, () -> {
            automatService.findBySerialNumber("222");
        });
    }

    @Test
    public void checkTenantName() {
        assertEquals("PLATI", tenantService.findById(1L).getName());
    }

    @Test
    public void checkNotExistingTenantName() {
        assertThrows(TenantNotFoundException.class, () -> {
            tenantService.findById(555L);
        });
    }

    @Transactional
    @Test
    public void checkAddAutomatToTenant() {
        Optional<Tenant> tenant = tenantRepository.findById(1L);
        Automat automat = automatService.setTenant(tenant.get().getId(), "321321321");
        assertEquals(tenant.get(), automat.getTenant());
    }


    @Transactional
    @Test
    public void checkAddAutomatToProduct() {
        Product product = productService.findById(1L);
        Automat automat = automatService.findBySerialNumber("321321321");
ProductToAutomat pta = new ProductToAutomat();
        pta.setPrice(3.33);
        pta.setProduct(product);
        pta.setAutomat(automat);

        automatService.addPtA("321321321", 1L,pta);

        assertEquals(productToAutomatRepository.findByAutomatAndProduct(automat,product), pta);
    }


    @Test
    public void checkUsedAddAutomatToTenant() {
        assertThrows(AutomatIdException.class, () -> {
            Automat automat = automatService.setTenant(1L, "3232323232");
            Optional<Tenant> tenant = tenantRepository.findById(1L);
            assertEquals(tenant.get(), automat.getTenant());
        });

    }

    @Test
    public void checkFindPurchasedProduct() {
        assertEquals(1.5, purchasedProductService.findById(2L).getPrice());
    }

    @Transactional
    @Test
    public void checkLackOfPurchasedProductByProduct() {
        assertNull(purchasedProductService.findAllPurchasedProductsPer(productService.findById(2L)).getId());
    }


    @Test
    public void notNegativeFundsDrawn() {
        assertThrows(NullPointerException.class, () -> {

            assertEquals(-1.0,fundsDrawnRepository.findAllByAmountLessThan(1.0).getAmount());

        });
    }

    @Test
    public void checkInsertedProduct(){
        Product product = productService.findById(1L);
        Automat automat = automatService.findBySerialNumber("3232323232");
        assertEquals(3.5,insertedProductService.findAllInsertedByAutomatAndProduct(automat.getSerialNumber(),product.getId()).getProfit());
    }


    @Test
    public void checkLackOfInsertedProduct(){
        Product product = productService.findById(2L);
        Automat automat = automatService.findBySerialNumber("1234567890");
        assertEquals(0.0,insertedProductService.findAllInsertedByAutomatAndProduct(automat.getSerialNumber(),product.getId()).getProfit());
    }


}
