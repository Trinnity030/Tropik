package utez.TropikBackEnd.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import utez.TropikBackEnd.role.model.RoleRepository;
import utez.TropikBackEnd.user.model.User;
import utez.TropikBackEnd.role.model.Role;
import utez.TropikBackEnd.user.model.UserRepository;

@Configuration
public class Initializer {

    @Bean
    CommandLineRunner initData(UserRepository userRepository, RoleRepository roleRepository) {
        return args -> {
            // Crear roles iniciales
            Role adminRole = new Role();
            adminRole.setRoleName("ADMIN");

            Role userRole = new Role();
            userRole.setRoleName("USER");

            roleRepository.save(adminRole);
            roleRepository.save(userRole);

            // Crear usuarios iniciales
            User user1 = new User();
            user1.setEmail("admin@tropik.com");
            user1.setPassword("12345"); // En un proyecto real, aquí usarías un hash

            User user2 = new User();
            user2.setEmail("user@tropik.com");
            user2.setPassword("abcde");

            userRepository.save(user1);
            userRepository.save(user2);

            System.out.println("✅ Datos iniciales insertados en la base de datos.");
        };
    }
}