package io.agileintelligence.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.StringJoiner;

@Entity
public class Automat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Serial number is required")
    @Size(min = 10, max = 10, message = "Please use 10 characters")
    @Column(updatable = false, unique = true)
    private String serialNumber;
    //@NotBlank(message = "Type is required")
    private String type;
    @Column(updatable = false)
    @NotNull(message = "Capacity is required")
    @Min(value = 18, message = "Capacity should not be less than 18")
    @Max(value = 150, message = "Capacity should not be greater than 150")
    private Integer capacity;
    @NotBlank(message = "State is required")
    private String state;
    @NotNull(message = "Production date is required")
    @Column(updatable = false)
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date productionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    @JsonIgnore
    private Tenant tenant;

    //who own the Automat
    private String automatLeader;

    //many to many with Product
    @ManyToMany(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE
    })
    @JoinTable(name = "automat_product",
            joinColumns = @JoinColumn(name = "automat_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id"))
    private List<Product> products;

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

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public Date getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(Date productionDate) {
        this.productionDate = productionDate;
    }

    public String getAutomatLeader() {
        return automatLeader;
    }

    public void setAutomatLeader(String automatLeader) {
        this.automatLeader = automatLeader;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public List<Product> getProducts() {
        return products;
    }

    public void setProducts(List<Product> products) {
        this.products = products;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Automat.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("name='" + name + "'")
                .add("serialNumber='" + serialNumber + "'")
                .add("type='" + type + "'")
                .add("capacity=" + capacity)
                .add("state='" + state + "'")
                .add("productionDate=" + productionDate)
                .toString();
    }
}
