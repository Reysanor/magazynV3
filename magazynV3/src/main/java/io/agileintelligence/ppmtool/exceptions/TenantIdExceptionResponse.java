package io.agileintelligence.ppmtool.exceptions;

public class TenantIdExceptionResponse {
    private String id;

    public TenantIdExceptionResponse(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
