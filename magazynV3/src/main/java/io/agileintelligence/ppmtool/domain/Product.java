package io.agileintelligence.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
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
    @NotBlank(message = "Type is required")
    private String type;

    private String productLeader;


    //many to many with Automat
    @JsonIgnore
    @OneToMany(mappedBy = "product", cascade = CascadeType.MERGE,fetch = FetchType.EAGER)
    private List<AutomatToProduct> automatToProducts;


    @OneToMany(mappedBy = "product")
    private List<ProductToAutomat> productToAutomats;

    @OneToMany(mappedBy = "product", cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Set<PurchasedProduct> purchasedProducts;


    public List<ProductToAutomat> getProductToAutomats() {
        return productToAutomats;
    }

    public void setProductToAutomats(List<ProductToAutomat> productToAutomats) {
        this.productToAutomats = productToAutomats;
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

    public String getProductLeader() {
        return productLeader;
    }

    public void setProductLeader(String productLeader) {
        this.productLeader = productLeader;
    }

    public List<AutomatToProduct> getAutomatToProducts() {
        return automatToProducts;
    }

    public void setAutomatToProducts(List<AutomatToProduct> automatToProducts) {
        this.automatToProducts = automatToProducts;
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
