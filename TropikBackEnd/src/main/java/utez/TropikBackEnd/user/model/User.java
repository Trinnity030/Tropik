package utez.TropikBackEnd.user.model;

import jakarta.persistence.*;
import utez.TropikBackEnd.role.model.Role;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String email;
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)  // un usuario tiene un rol
    @JoinColumn(name = "role_id")       // columna en la tabla "users"
    private Role role;

    public User(){}

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return this.role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
