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
    @ManyToMany(mappedBy = "products")
    @JsonIgnore
    private List<Automat> automats;


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

    public List<Automat> getAutomats() {
        return automats;
    }

    public void setAutomats(List<Automat> automats) {
        this.automats = automats;
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
