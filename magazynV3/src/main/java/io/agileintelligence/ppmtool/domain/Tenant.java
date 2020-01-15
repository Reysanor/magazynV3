package io.agileintelligence.ppmtool.domain;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "NIP is required")
    @Min(value = 10, message = "Please use 10 characters")
    @Max(value = 10, message = "Please use 10 characters")
    @Column(updatable = false, unique = true)
    private Integer nip;
    @NotBlank(message = "Street is required")
    private String street;
    @NotBlank(message = "Zip Code is required")
    @Min(value = 5, message = "Please use 5 characters")
    @Max(value = 5, message = "Please use 5 characters")
    private Integer zipCode;
    @NotBlank(message = "City is required")
    private String city;
    @NotBlank(message = "Phone number is required")
    @Min(value = 9, message = "Please use 9 characters")
    @Max(value = 9, message = "Please use 9 characters")
    private Integer phoneNumber;
    private String emailAddress;

    //one to many with automat

    private String tenantLeader;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNip() {
        return nip;
    }

    public void setNip(Integer nip) {
        this.nip = nip;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public Integer getZipCode() {
        return zipCode;
    }

    public void setZipCode(Integer zipCode) {
        this.zipCode = zipCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public Integer getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Integer phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getTenantLeader() {
        return tenantLeader;
    }

    public void setTenantLeader(String tenantLeader) {
        this.tenantLeader = tenantLeader;
    }

    @Override
    public String toString() {
        return "Tenant{" +
                "id=" + id +
                ", nip=" + nip +
                ", street='" + street + '\'' +
                ", zipCode=" + zipCode +
                ", city='" + city + '\'' +
                ", phoneNumber=" + phoneNumber +
                ", emailAddress='" + emailAddress + '\'' +
                '}';
    }
}
