package io.agileintelligence.ppmtool.exceptions;

public class AutomatIdExceptionResponse {

    private String automatSerialNumber;

    public AutomatIdExceptionResponse(String automatSerialNumber) {
        this.automatSerialNumber = automatSerialNumber;
    }

    public String getAutomatSerialNumber() {
        return automatSerialNumber;
    }

    public void setAutomatSerialNumber(String automatSerialNumber) {
        this.automatSerialNumber = automatSerialNumber;
    }
}
