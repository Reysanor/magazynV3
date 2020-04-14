package io.agileintelligence.ppmtool.domain;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Objects;

@Entity
@Table(name = "product_to_automat")
@IdClass(ProductToAutomatId.class)
public class ProductToAutomat {
    @Id
    @ManyToOne
    @JoinColumn(name = "automat_id", referencedColumnName = "id")
    private Automat automat;

    @Id
    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "id")
    private Product product;


    @NotNull(message = "Price is required")
    @Min(value = 1, message = "Price should not be less than 1")
    @Max(value = 10, message = "Price should not be greater than 10")
    private Double price;

    public ProductToAutomat() {
    }

    public ProductToAutomat(Automat automat, Product product) {
        this.automat = automat;
        this.product = product;
    }

    public Automat getAutomat() {
        return automat;
    }

    public void setAutomat(Automat automat) {
        this.automat = automat;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductToAutomat that = (ProductToAutomat) o;
        return Objects.equals(automat, that.automat) &&
                Objects.equals(product, that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(automat, product);
    }
}

