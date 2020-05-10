package io.agileintelligence.ppmtool.services;

import io.agileintelligence.ppmtool.domain.Product;
import io.agileintelligence.ppmtool.domain.PurchasedProduct;
import io.agileintelligence.ppmtool.exceptions.ProductNotFoundException;
import io.agileintelligence.ppmtool.exceptions.PurchasedProductNotFoundException;
import io.agileintelligence.ppmtool.repositories.ProductRepository;
import io.agileintelligence.ppmtool.repositories.PurchasedProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service

public class PurchasedProductService {


    @Autowired
    PurchasedProductRepository purchasedProductRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    ProductService productService;

    public PurchasedProduct createOrUpdatePurchasedProduct(PurchasedProduct purchasedProduct, Long productId) {
        Long purchasedProductIdGet = purchasedProduct.getId();
        if (purchasedProduct.getId() != null) {
            Optional<PurchasedProduct> existingPurchasedProduct = purchasedProductRepository.findById(productId);
            if (!existingPurchasedProduct.isPresent()) {
                throw new PurchasedProductNotFoundException("Funds drawn with Id: " + purchasedProductIdGet + " doesn't exists");
            }
        }

        Optional<Product> product = productRepository.findById(productId);
        if (!product.isPresent()) {
            throw new ProductNotFoundException("Product with id: " + productId + " doesn't exists");
        }
        try {
            purchasedProduct.setId(purchasedProductIdGet);
            purchasedProduct.setProduct(product.get());
            Date date = new Date();
            purchasedProduct.setDateOfPurchase(date);
            return purchasedProductRepository.save(purchasedProduct);

        } catch (Exception e) {
            throw new PurchasedProductNotFoundException("Funds drawn with Id: " + purchasedProductIdGet + " doesn't exists");

        }
    }


    public PurchasedProduct removePurchasedProduct(PurchasedProduct purchasedProduct, Long productId) {

        if(purchasedProduct.getAmount()>=0){
            throw new PurchasedProductNotFoundException("You cannot remove less than 1 product");
        }

        PurchasedProduct sumOfPurchased = findAllPurchasedProductsPer(productService.findById(productId));
        if(purchasedProduct.getAmount()+sumOfPurchased.getAmount()<0){
            throw new PurchasedProductNotFoundException("You don't have enough of product " + productService.findById(productId).getName() + " to get");
        }
        purchasedProduct.setPrice(0.0);
        return createOrUpdatePurchasedProduct(purchasedProduct,productId);
    }



    public PurchasedProduct findById(Long purchasedId) {
        Optional<PurchasedProduct> purchasedProduct = purchasedProductRepository.findById(purchasedId);
        if (!purchasedProduct.isPresent()) {
            throw new PurchasedProductNotFoundException("Funds drawn with Id: " + purchasedId + " doesn't exists");
        }
        return purchasedProduct.get();
    }

    public Iterable<PurchasedProduct> findAllPurchasedProducts() {
        return purchasedProductRepository.findAll();
    }


    public void deletePurchasedProductById(Long purchasedId) {
        purchasedProductRepository.delete(findById(purchasedId));
    }

    public Iterable<PurchasedProduct> findAllPurchasedProductsPer() {
        List<PurchasedProduct> pp= new ArrayList<>();
        for(Product p: productService.findAllProducts()){
            pp.add(findAllPurchasedProductsPer(p));
        }
        return pp;
    }

    public PurchasedProduct findPurchasedProductsPer(Long product){
       return findAllPurchasedProductsPer(productService.findById(product));
    }

    public PurchasedProduct findAllPurchasedProductsPer(Product product) {
        int amount = 0;
        Double price = 0.0;
        int bought = 0;
        PurchasedProduct purchasedProduct = new PurchasedProduct();
        purchasedProduct.setProduct(product);

        try {
            Iterable<PurchasedProduct> allPer = purchasedProductRepository.findAllByProduct(product);

            for (PurchasedProduct pp : allPer) {
                if(pp.getAmount()>0){
                    price = price + pp.getPrice()*pp.getAmount();
                    bought = bought+ pp.getAmount();
                }
                amount = amount + pp.getAmount();

            }
            purchasedProduct.setAmount(amount);
            purchasedProduct.setPrice(round(price / bought));
        } catch (Exception e) {
            purchasedProduct.setAmount(0);
            purchasedProduct.setPrice(0.0);
        }

        return purchasedProduct;

    }

    private static double round(double value) {
        if (2 < 0) throw new IllegalArgumentException();

        BigDecimal bd = new BigDecimal(Double.toString(value));
        bd = bd.setScale(2, RoundingMode.HALF_UP);
        return bd.doubleValue();
    }


}
