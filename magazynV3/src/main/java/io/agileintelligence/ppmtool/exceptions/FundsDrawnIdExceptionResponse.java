package io.agileintelligence.ppmtool.exceptions;

public class FundsDrawnIdExceptionResponse {

    String fundsDrawnId;

    public String getFundsDrawnId() {
        return fundsDrawnId;
    }

    public void setFundsDrawnId(String fundsDrawnId) {
        this.fundsDrawnId = fundsDrawnId;
    }

    public FundsDrawnIdExceptionResponse(String fundsDrawnId) {
        this.fundsDrawnId = fundsDrawnId;
    }
}
