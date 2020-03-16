package io.agileintelligence.ppmtool.domain;


import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.StringJoiner;

@Entity
@IdClass(AutomatToProductId.class)
public class AutomatToProduct  {

    @Id
    private String key;

    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn (name = "automat_id")
    private Automat automat;
    @Id
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn (name = "product_id")
    private Product product;

    @NotNull(message = "Price is required")
    @Min(value = 1, message = "Price should not be less than 1")
    @Max(value = 5, message = "Price should not be greater than 5")
    private Integer price;

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

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", AutomatToProduct.class.getSimpleName() + "[", "]")
                .add("automat=" + automat)
                .add("product=" + product)
                .add("price=" + price)
                .toString();
    }
}


class AutomatToProductId implements Serializable {
    private Automat automat; // Corresponds to the type of Person ID
    private Product product; // Corresponds to the type of Branch ID

    public AutomatToProductId(){

    }

    public AutomatToProductId(Automat automat, Product product){
        this.automat=automat;
        this.product=product;
    }

    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}