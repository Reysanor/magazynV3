package io.agileintelligence.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.*;

@Entity
public class Automat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Name is required")
    private String name;
    @NotBlank(message = "Serial number is required")
  //  @Size(min = 10, max = 10, message = "Please use 10 characters")
    @Column(updatable = false, unique = true)
    private String serialNumber;
    //@NotBlank(message = "Type is required")
    private String type;


    //@NotBlank(message = "State is required")
    private String status;
   // @NotNull(message = "Production date is required")
    @Column(updatable = false)
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date productionDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tenant_id")
    @JsonIgnore
    private Tenant tenant;

    @JsonIgnore
    @OneToMany(mappedBy = "automat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductToAutomat> productToAutomats = new ArrayList<>();



    @OneToMany(mappedBy = "automat", cascade = CascadeType.MERGE, fetch = FetchType.EAGER)
    private Set<FundsDrawn> fundsDrawns;

    @JsonIgnore
    @OneToMany(mappedBy = "automat", cascade = CascadeType.ALL)
    private List<InsertedProduct> insertedProducts = new ArrayList<>();

    public List<ProductToAutomat> getProductToAutomats() {
        return productToAutomats;
    }

    public void addProductToAutomats(ProductToAutomat productToAutomat) {
       // ProductToAutomat productToAutomat= new ProductToAutomat(this,product);
       //1 productToAutomats.add(productToAutomat);
        //product.getProductToAutomats().add(productToAutomat);
        productToAutomats.add(productToAutomat);
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




    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getProductionDate() {
        return productionDate;
    }

    public void setProductionDate(Date productionDate) {
        this.productionDate = productionDate;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }


    public List<InsertedProduct> getInsertedProducts() {
        return insertedProducts;
    }

    public void setInsertedProducts(List<InsertedProduct> insertedProducts) {
        this.insertedProducts = insertedProducts;
    }

    public void addInsertedProduct(InsertedProduct insertedProduct) {

        insertedProducts.add(insertedProduct);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", Automat.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("name='" + name + "'")
                .add("serialNumber='" + serialNumber + "'")
                .add("type='" + type + "'")
                .add("status='" + status + "'")
                .add("productionDate=" + productionDate)
                .toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Automat automat = (Automat) o;
        return Objects.equals(name, automat.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name);
    }
}
