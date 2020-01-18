package io.agileintelligence.ppmtool.exceptions;

public class TenantNotFoundExceptionResponse {

    private String tenantNotFound;

    public TenantNotFoundExceptionResponse(String tenantNotFound) {
        this.tenantNotFound = tenantNotFound;
    }

    public String getTenantNotFound() {
        return tenantNotFound;
    }

    public void setTenantNotFound(String tenantNotFound) {
        this.tenantNotFound = tenantNotFound;
    }
}
