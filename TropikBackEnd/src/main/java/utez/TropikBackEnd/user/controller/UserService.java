package utez.TropikBackEnd.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.TropikBackEnd.config.ApiResponse;
import utez.TropikBackEnd.role.model.Role;
import utez.TropikBackEnd.role.model.RoleRepository;
import utez.TropikBackEnd.user.dto.UserDTO;
import utez.TropikBackEnd.user.model.User;
import utez.TropikBackEnd.user.model.UserRepository;
import utez.TropikBackEnd.utils.TypesResponse;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findAll() {
        try {
            List<User> users = userRepository.findAll();
            List<UserDTO> userDTOs = users.stream()
                    .map(this::convertToDTO)
                    .toList();

            return ResponseEntity.ok(new ApiResponse( "Usuarios obtenidos correctamente",userDTOs, TypesResponse.SUCCESS));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al obtener usuarios: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findById(Long id) {
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                UserDTO userDTO = convertToDTO(user.get());
                return ResponseEntity.ok(new ApiResponse( "Usuario encontrado", userDTO,TypesResponse.SUCCESS));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(null, "Usuario no encontrado", TypesResponse.WARNING));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al buscar usuario: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> save(UserDTO userDTO) {
        try {
            // Verificar si el email ya existe
            if (userRepository.existsByEmail(userDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(null, "El email ya está registrado", TypesResponse.WARNING));
            }

            // Buscar el rol
            Optional<Role> role = roleRepository.findByRoleName(userDTO.getRole());
            if (role.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(null, "Rol no válido", TypesResponse.WARNING));
            }

            // Crear nuevo usuario
            User user = new User();
            user.setEmail(userDTO.getEmail());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Encriptar contraseña
            user.setRole(role.get());
            user.setStatus(true); // Por defecto activo

            User savedUser = userRepository.save(user);
            UserDTO savedUserDTO = convertToDTO(savedUser);

            return ResponseEntity.ok(new ApiResponse( "Usuario creado correctamente", savedUserDTO,TypesResponse.SUCCESS));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al crear usuario: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> update(Long id, UserDTO userDTO) {
        try {
            Optional<User> existingUser = userRepository.findById(id);
            if (existingUser.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(null, "Usuario no encontrado", TypesResponse.WARNING));
            }

            User user = existingUser.get();

            // Verificar si el email ya existe (excluyendo el usuario actual)
            if (!user.getEmail().equals(userDTO.getEmail()) &&
                    userRepository.existsByEmail(userDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body(new ApiResponse(null, "El email ya está registrado", TypesResponse.WARNING));
            }



            // Actualizar campos
            user.setEmail(userDTO.getEmail());

            // Actualizar contraseña solo si se proporciona una nueva
            if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }

            User updatedUser = userRepository.save(user);
            UserDTO updatedUserDTO = convertToDTO(updatedUser);

            return ResponseEntity.ok(new ApiResponse( "Usuario actualizado correctamente",updatedUserDTO, TypesResponse.SUCCESS));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al actualizar usuario: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> deleteById(Long id) {
        try {
            if (!userRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(null, "Usuario no encontrado", TypesResponse.WARNING));
            }

            userRepository.deleteById(id);
            return ResponseEntity.ok(new ApiResponse(null, "Usuario eliminado correctamente", TypesResponse.SUCCESS));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al eliminar usuario: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> updateStatus(Long id, boolean status) {
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                user.get().setStatus(status);
                userRepository.save(user.get());

                String message = status ? "Usuario activado" : "Usuario desactivado";
                return ResponseEntity.ok(new ApiResponse(null, message, TypesResponse.SUCCESS));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(null, "Usuario no encontrado", TypesResponse.WARNING));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al actualizar estado: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    private UserDTO convertToDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole().getRoleName());
        // No establecer password, jwt ni expiration por seguridad
        return userDTO;
    }
}