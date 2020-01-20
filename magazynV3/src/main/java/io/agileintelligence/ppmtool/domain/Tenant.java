package io.agileintelligence.ppmtool.domain;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;
import java.util.StringJoiner;

@Entity
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "NIP is required")
    @Size(min = 10, max = 10, message = "Please use 10 characters")
    @Column(updatable = false, unique = true)
    private String nip;
    @NotBlank(message = "Street is required")
    private String street;
    @NotBlank(message = "Zip Code is required")
    @Size(min = 5, max = 5, message = "Please use 5 characters")
    private String zipCode;
    @NotBlank(message = "City is required")
    private String city;
    @NotBlank(message = "Phone number is required")
    @Size(min = 9, max = 9, message = "Please use 9 characters")
    private String phoneNumber;
    private String emailAddress;

    //one to many with automat
    @OneToMany(mappedBy = "tenant", cascade = CascadeType.REFRESH, fetch = FetchType.EAGER)
    private List<Automat> automaty;

    private String tenantLeader;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNip() {
        return nip;
    }

    public void setNip(String nip) {
        this.nip = nip;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
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
        return new StringJoiner(", ", Tenant.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("nip='" + nip + "'")
                .add("street='" + street + "'")
                .add("zipCode='" + zipCode + "'")
                .add("city='" + city + "'")
                .add("phoneNumber='" + phoneNumber + "'")
                .add("emailAddress='" + emailAddress + "'")
                .toString();
    }
}
