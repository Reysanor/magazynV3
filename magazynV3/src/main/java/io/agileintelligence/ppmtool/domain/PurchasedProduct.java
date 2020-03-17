package io.agileintelligence.ppmtool.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class PurchasedProduct {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Amount is required")
    private Double amount;
    @NotNull(message = "Price is required")
    private Double price;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date dateOfPurchase;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "automat_id")
    @JsonIgnore
    private Product product ;



}
