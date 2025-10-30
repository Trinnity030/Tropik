package utez.TropikBackEnd.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import utez.TropikBackEnd.role.model.RoleRepository;
import utez.TropikBackEnd.user.model.User;
import utez.TropikBackEnd.role.model.Role;
import utez.TropikBackEnd.user.model.UserRepository;

@Configuration
public class Initializer {

    @Bean
    CommandLineRunner initData(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (roleRepository.count() == 0) {
                // Crear roles iniciales
                Role adminRole = new Role();
                adminRole.setRoleName("ADMIN");

                Role userRole = new Role();
                userRole.setRoleName("USER");

                roleRepository.save(adminRole);
                roleRepository.save(userRole);

                // Crear usuarios iniciales con contraseñas encriptadas
                User user1 = new User();
                user1.setEmail("admin@tropik.com");
                user1.setPassword(passwordEncoder.encode("12345"));
                user1.setStatus(true);
                user1.setRole(adminRole); // ← Asignar rol

                User user2 = new User();
                user2.setEmail("user@tropik.com");
                user2.setPassword(passwordEncoder.encode("abcde"));
                user2.setStatus(true);
                user2.setRole(userRole); // ← Asignar rol

                userRepository.save(user1);
                userRepository.save(user2);

                System.out.println("✅ Datos iniciales insertados en la base de datos.");
            }
        };
    }
}