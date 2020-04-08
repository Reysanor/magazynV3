package io.agileintelligence.ppmtool.domain;

import java.io.Serializable;
import java.util.Objects;

public class ProductToAutomatId implements Serializable {

    private Long automat;
    private Long product;

    public Long getAutomat() {
        return automat;
    }

    public void setAutomat(Long automat) {
        this.automat = automat;
    }

    public Long getProduct() {
        return product;
    }

    public void setProduct(Long product) {
        this.product = product;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductToAutomatId that = (ProductToAutomatId) o;
        return Objects.equals(automat, that.automat) &&
                Objects.equals(product, that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(automat, product);
    }
}
