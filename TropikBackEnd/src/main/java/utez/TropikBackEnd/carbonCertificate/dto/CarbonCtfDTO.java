package utez.TropikBackEnd.carbonCertificate.dto;

public class CarbonCtfDTO {
    private Long id;
    private String origin;
    private String place;
    private String reduction;
    private String period;
    private String certificate;
    private String emissionDate;
    private String status;
    private String register;

    // Constructores
    public CarbonCtfDTO() {}

    public CarbonCtfDTO(Long id, String origin, String place, String reduction, String period,
                        String certificate, String emissionDate, String status, String register) {
        this.id = id;
        this.origin = origin;
        this.place = place;
        this.reduction = reduction;
        this.period = period;
        this.certificate = certificate;
        this.emissionDate = emissionDate;
        this.status = status;
        this.register = register;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getOrigin() { return origin; }
    public void setOrigin(String origin) { this.origin = origin; }

    public String getPlace() { return place; }
    public void setPlace(String place) { this.place = place; }

    public String getReduction() { return reduction; }
    public void setReduction(String reduction) { this.reduction = reduction; }

    public String getPeriod() { return period; }
    public void setPeriod(String period) { this.period = period; }

    public String getCertificate() { return certificate; }
    public void setCertificate(String certificate) { this.certificate = certificate; }

    public String getEmissionDate() { return emissionDate; }
    public void setEmissionDate(String emissionDate) { this.emissionDate = emissionDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRegister() { return register; }
    public void setRegister(String register) { this.register = register; }
}