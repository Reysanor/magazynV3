package io.agileintelligence.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(updatable = false, unique = true)
    @NotBlank(message = "Name is required")
    private String name;
   // @NotBlank(message = "Type is required")
    private String type;

    @NotNull(message = "deleted  is required")
    private Integer deleted = 0;

    //many to many with Automat

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<ProductToAutomat> productToAutomats = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private List<PurchasedProduct> purchasedProducts;


    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<InsertedProduct> insertedProducts = new ArrayList<>();


    public List<ProductToAutomat> getProductToAutomats() {

        return productToAutomats;
    }

    public void setProductToAutomats(List<ProductToAutomat> productToAutomats) {
        this.productToAutomats = productToAutomats;
    }

    public void addProductToAutomats(ProductToAutomat productToAutomat) {

        productToAutomats.add(productToAutomat);
    }


    public List<InsertedProduct> getInsertedProducts() {
        return insertedProducts;
    }

    public void setInsertedProducts(List<InsertedProduct> insertedProducts) {
        this.insertedProducts = insertedProducts;
    }

    public void addInsertedProduct (InsertedProduct insertedProduct){
        insertedProducts.add(insertedProduct);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getDeleted() {
        return deleted;
    }

    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }

    public List<PurchasedProduct> getPurchasedProducts() {
        return purchasedProducts;
    }

    public void setPurchasedProducts(List<PurchasedProduct> purchasedProducts) {
        this.purchasedProducts = purchasedProducts;
    }

    public void addPurchasedProducts(PurchasedProduct purchasedProduct) {

        purchasedProducts.add(purchasedProduct);
    }
    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
