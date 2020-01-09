package io.agileintelligence.ppmtool.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Wynajmujacy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
}
