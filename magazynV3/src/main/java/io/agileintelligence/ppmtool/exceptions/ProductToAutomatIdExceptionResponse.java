package io.agileintelligence.ppmtool.exceptions;

public class ProductToAutomatIdExceptionResponse {
    private String name;

    public ProductToAutomatIdExceptionResponse(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
