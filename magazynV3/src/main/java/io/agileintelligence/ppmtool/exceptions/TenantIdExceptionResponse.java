package io.agileintelligence.ppmtool.exceptions;

public class TenantIdExceptionResponse {
    private String tenantNip;

    public TenantIdExceptionResponse(String tenantNip) {
        this.tenantNip = tenantNip;
    }

    public String getTenantNip() {
        return tenantNip;
    }

    public void setTenantNip(String tenantNip) {
        this.tenantNip = tenantNip;
    }
}
