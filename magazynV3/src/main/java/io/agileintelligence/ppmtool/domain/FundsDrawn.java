package io.agileintelligence.ppmtool.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class FundsDrawn {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull(message = "Amount is required")
    @Min(value = 1, message = "Cannot take a value lower than 1")
    private Double amount;
    private Date dateOfDrawn;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "automat_id")
    @JsonIgnore
    private Automat automat;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Date getDateOfDrawn() {
        return dateOfDrawn;
    }

    public void setDateOfDrawn(Date dateOfDrawn) {
        this.dateOfDrawn = dateOfDrawn;
    }

    public Automat getAutomat() {
        return automat;
    }

    public void setAutomat(Automat automat) {
        this.automat = automat;
    }
}
