package utez.TropikBackEnd.role.model;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findById(long id);
    Optional<Role> findByRoleName(String role);
}
