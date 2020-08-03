package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Automat;
import io.agileintelligence.ppmtool.domain.InsertedProduct;
import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.ProductToAutomat;
import io.agileintelligence.ppmtool.exceptions.AutomatNotFoundException;
import io.agileintelligence.ppmtool.exceptions.InsertedProductIdException;
import io.agileintelligence.ppmtool.exceptions.InsertedProductNotFoundException;
import io.agileintelligence.ppmtool.repositories.AutomatRepository;
import io.agileintelligence.ppmtool.repositories.InsertedProductRepository;
import io.agileintelligence.ppmtool.repositories.ProductToAutomatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
public class InsertedProductService {

    @Autowired
    InsertedProductRepository insertedProductRepository;

    @Autowired
    ProductService productService;

    @Autowired
    AutomatService automatService;

    @Autowired
    AutomatRepository automatRepository;

    @Autowired
    ProductToAutomatRepository productToAutomatRepository;


    public InsertedProduct saveOrUpdateInsertedProduct(InsertedProduct insertedProduct, String automat_id, Long product_id) {
        Automat automat = automatService.findBySerialNumber(automat_id);
        Product product = productService.findById(product_id);
        insertedProduct.setAutomat(automat);
        insertedProduct.setProduct(product);
        Date date = new Date();
        insertedProduct.setDateOfInsert(date);
        automat.addInsertedProduct(insertedProduct);
        automatRepository.save(automat);
        return insertedProduct;
    }


    public InsertedProduct findById(Long insertedProductId) {
        Optional<InsertedProduct> insertedProduct = insertedProductRepository.findById(insertedProductId);
        if (!insertedProduct.isPresent()) {
            throw new InsertedProductNotFoundException("Inserted Product with Id: " + insertedProductId + " doesn't exists");
        }
        return insertedProduct.get();
    }

    public Iterable<InsertedProduct> findAllInsertedProducts() {
        return insertedProductRepository.findAll();
    }

    //return list of insterted of all product to one automat
    public Iterable<InsertedProduct> findAllInsertedProductsByAutomat(String automat_id) {
        return insertedProductRepository.findByAutomat(automatService.findBySerialNumber(automat_id));

    }

    //return list of inserted for one product to one automat
    public Iterable<InsertedProduct> findInsertedOneProductsByAutomat(String automat_id, Long product_id) {
        Automat automat = automatService.findBySerialNumber(automat_id);
        Product product = productService.findById(product_id);
        return insertedProductRepository.findAllByAutomatAndProduct(automat, product);
    }


    public void deleteInsertedProductByName(Long insertedProductId) {
        insertedProductRepository.delete(findById(insertedProductId));

    }

    //List of calculated profit for all automats in selected tenant
    public Iterable<InsertedProduct> allAutomatsInTenantProfit(Long id){
        Iterable<Automat> all = automatService.findAllAutomatsToTenant(id);
        List<InsertedProduct> list = new ArrayList<>();
        for(Automat a: all){
            list.add(findInsertedPriceToAutomatTotalProfit(a.getSerialNumber()));
        }
        return list;

    }


    //calculate profit from automat for all products
    public InsertedProduct findInsertedPriceToAutomatTotalProfit(String automat_id) {
        Automat automat = automatService.findBySerialNumber(automat_id);
        InsertedProduct insertedProduct = new InsertedProduct();

        try {
            Iterable<InsertedProduct> insertedProducts = insertedProductRepository.findAllByAutomat(automat);
            double average = 0.0;
            int count = 0;
            for (InsertedProduct ip : insertedProducts) {
                average = average + ip.getProfit() * ip.getNumber();
                count = count + ip.getNumber();
            }
            insertedProduct.setAutomat(automat);
            insertedProduct.setProfit(round(average));
        } catch (Exception e) {
            insertedProduct.setProfit(0.0);

        }
        return insertedProduct;

    }
    //calculate profit for selected product in automat
    public InsertedProduct findAllInsertedByAutomatandProduct(String automat_id, Long product_id) {
        Automat automat = automatService.findBySerialNumber(automat_id);
        Product product = productService.findById(product_id);
        InsertedProduct insertedProduct = new InsertedProduct();


        try {
            Iterable<InsertedProduct> insertedProducts = insertedProductRepository.findAllByAutomatAndProduct(automat, product);
            double average = 0.0;
            int count = 0;
            for (InsertedProduct ip : insertedProducts) {
                average = average + ip.getProfit() * ip.getNumber();
                count = count + ip.getNumber();
            }
            insertedProduct.setAutomat(automat);
            insertedProduct.setProduct(product);
            insertedProduct.setProfit(round(average / count));
            insertedProduct.setNumber(count);
        } catch (Exception e) {
            insertedProduct.setProfit(0.0);

        }
        return insertedProduct;

    }


    public Iterable<InsertedProduct> findInsertedPriceByAutomat(String automat_id) {
        Iterable<ProductToAutomat> productToAutomats = productToAutomatRepository.findAllByAutomat(automatService.findBySerialNumber(automat_id));
        List<InsertedProduct> avarageProfit = new ArrayList<>();

        for (ProductToAutomat ip : productToAutomats) {
            avarageProfit.add(findAllInsertedByAutomatandProduct(automat_id, ip.getProduct().getId()));
        }
        return avarageProfit;
    }



    //średnia cena sprzedaży i średni zysk
    public Iterable<InsertedProduct> findInsertedProductsInfo() {
        Iterable<InsertedProduct> productToAutomats = insertedProductRepository.findAll();

        Map<Long, ArrayList<InsertedProduct>> map2 = new HashMap<>();

        for (InsertedProduct ip : productToAutomats) {
            map2.computeIfAbsent(ip.getProduct().getId(), k -> new ArrayList<>()).add(ip);
        }
        ArrayList<InsertedProduct> toReturn = new ArrayList<>();

        for (Long key : map2.keySet()) {
            int number = 0;
            double profit = 0.00;
            double currentPrice = 0.0;
            for (InsertedProduct ip : map2.get(key)) {
                number += ip.getNumber();
                profit += ip.getNumber() * ip.getProfit();
                currentPrice += ip.getNumber() * ip.getCurrentPrice();
            }
            InsertedProduct temp = new InsertedProduct();
            temp.setNumber(number);
            temp.setProfit(round(profit/number));
            temp.setCurrentPrice(round(currentPrice/number));
            temp.setProduct(productService.findById(key));
            toReturn.add(temp);
        }

        return toReturn;
    }
    private static double round(double value) {
        if (2 < 0) throw new IllegalArgumentException();

        BigDecimal bd = new BigDecimal(Double.toString(value));
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }
}