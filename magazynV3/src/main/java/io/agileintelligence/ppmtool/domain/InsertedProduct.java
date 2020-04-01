package io.agileintelligence.ppmtool.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class InsertedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Number is required")

    private Integer number;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date dateOfInsert;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "automat_to_product_id")
    @JsonIgnore
    private AutomatToProduct automatToProduct;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Date getDateOfInsert() {
        return dateOfInsert;
    }

    public void setDateOfInsert(Date dateOfInsert) {
        this.dateOfInsert = dateOfInsert;
    }

    public AutomatToProduct getAutomatToProduct() {
        return automatToProduct;
    }

    public void setAutomatToProduct(AutomatToProduct automatToProduct) {
        this.automatToProduct = automatToProduct;
    }
}
