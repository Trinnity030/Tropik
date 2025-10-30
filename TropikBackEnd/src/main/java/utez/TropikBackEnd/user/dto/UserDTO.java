package utez.TropikBackEnd.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import org.hibernate.sql.Update;
import utez.TropikBackEnd.role.model.Role;

public class UserDTO {


    private Long id;
    @NotBlank(groups = {Login.class}, message = "El correo es requerido")
    private String email;
    @NotBlank(groups = {Login.class}, message = "La contraseña es requerida")
    private String password;

    private String role;
    private String jwt;
    private Long expiration;

    public UserDTO(){

    }

    public UserDTO(Long id, String role, String jwt, Long expiration) {
        this.id = id;
        this.role = role;
        this.jwt = jwt;
        this.expiration = expiration;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public Long getExpiration() {
        return expiration;
    }

    public void setExpiration(Long expiration) {
        this.expiration = expiration;
    }

    public  interface Login{}

}
