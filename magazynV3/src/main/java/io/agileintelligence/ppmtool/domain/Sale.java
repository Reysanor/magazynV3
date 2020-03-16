package io.agileintelligence.ppmtool.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Sell is required")
    private Integer sellCounter;
    @JsonFormat(pattern = "yyyy-mm-dd")
    private Date dateOfSell;


   // @ManyToOne(fetch = FetchType.LAZY)
   // @JoinColumn(name = "id")
   // @JsonIgnore
   // AutomatToProduct automatToProduct;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSellCounter() {
        return sellCounter;
    }

    public void setSellCounter(Integer sellCounter) {
        this.sellCounter = sellCounter;
    }

    public Date getDateOfSell() {
        return dateOfSell;
    }

    public void setDateOfSell(Date dateOfSell) {
        this.dateOfSell = dateOfSell;
    }
}
