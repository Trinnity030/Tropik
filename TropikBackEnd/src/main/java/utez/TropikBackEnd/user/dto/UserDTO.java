package utez.TropikBackEnd.user.dto;

import jakarta.validation.constraints.NotNull;
import org.hibernate.sql.Update;

public class UserDTO {

    private Long id;
    private String email;
    private String password;

    public UserDTO(){

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

}
