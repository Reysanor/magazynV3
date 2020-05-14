package io.agileintelligence.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.List;
import java.util.StringJoiner;

@Entity
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    //@NotBlank(message = "NIP is required")
   // @Column(updatable = false, unique = true)
    private String nip;
    @NotBlank(message = "Name is required")
    @Column( unique = true)
    private String name;
   // @NotBlank(message = "Street is required")
    private String street;
    //@NotBlank(message = "Zip Code is required")
    @Size(min = 6, max = 6, message = "Please use 6 characters")
    private String zipCode;
    @NotBlank(message = "City is required")
    private String city;
   // @NotBlank(message = "Phone number is required")
    private String phoneNumber;
    private String emailAddress;
    @NotNull(message = "deleted  is required")
    private Integer deleted = 0;
    //one to many with automat
    @OneToMany(mappedBy = "tenant")
    private List<Automat> automaty;

    @JsonIgnore
    @OneToMany(mappedBy = "tenant")
    private List<AutomatToTenantHistory> automatToTenantHistories;

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

    public Integer getDeleted() {
        return deleted;
    }

    public void setDeleted(Integer deleted) {
        this.deleted = deleted;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Automat> getAutomaty() {
        return automaty;
    }


    public void addAutomat(Automat automat){
        automaty.add(automat);
    }

    public void setAutomaty(List<Automat> automaty) {
        this.automaty = automaty;
    }

    public List<AutomatToTenantHistory> getAutomatToTenantHistories() {
        return automatToTenantHistories;
    }

    public void setAutomatToTenantHistories(List<AutomatToTenantHistory> automatToTenantHistories) {
        this.automatToTenantHistories = automatToTenantHistories;
    }

    @Override
    public String toString() {
        return "Tenant{" +
                "id=" + id +
                ", nip='" + nip + '\'' +
                ", name='" + name + '\'' +
                ", street='" + street + '\'' +
                ", zipCode='" + zipCode + '\'' +
                ", city='" + city + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", emailAddress='" + emailAddress + '\'' +
                '}';
    }
}
