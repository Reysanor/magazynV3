package io.agileintelligence.ppmtool.domain;


import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
public class AutomatToProduct implements Serializable {
    @Id
    @ManyToOne
    @JoinColumn (name = "automat_id")
    private Automat automat;

    @Id
    @ManyToOne
    @JoinColumn (name = "product_id")
    private Product product;

    @NotNull(message = "Price is required")
    @Min(value = 1, message = "Price should not be less than 1")
    @Max(value = 5, message = "Price should not be greater than 5")
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "automat_id")
    Automat automat;

<<<<<<< HEAD
    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
=======
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
>>>>>>> deda832bbb66852305e5f739b3460850a14edd12
    }
}
