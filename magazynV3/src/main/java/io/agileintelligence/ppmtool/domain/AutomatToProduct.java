package io.agileintelligence.ppmtool.domain;


import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Entity
public class AutomatToProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @NotNull(message = "Price is required")
    @Min(value = 1, message = "Price should not be less than 1")
    @Max(value = 5, message = "Price should not be greater than 5")
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "automat_id")
    Automat automat;

    @ManyToOne
    @JoinColumn(name = "product_id")
    Product product;


    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
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
}
