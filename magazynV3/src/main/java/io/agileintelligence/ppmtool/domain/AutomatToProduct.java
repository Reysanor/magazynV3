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


    @Override
    public int hashCode() {
        return super.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        return super.equals(obj);
    }
}
