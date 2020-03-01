package io.agileintelligence.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.List;

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
<<<<<<< HEAD
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "product")

    private List<AutomatToProduct> automatToProducts;
=======
    @OneToMany(mappedBy = "product", cascade = CascadeType.REFRESH, fetch = FetchType.LAZY)
    private List<AutomatToProduct> automatToProducts;

>>>>>>> deda832bbb66852305e5f739b3460850a14edd12


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

<<<<<<< HEAD
=======
    public List<AutomatToProduct> getAutomatToProducts() {
        return automatToProducts;
    }

    public void setAutomatToProducts(List<AutomatToProduct> automatToProducts) {
        this.automatToProducts = automatToProducts;
    }
>>>>>>> deda832bbb66852305e5f739b3460850a14edd12

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}
