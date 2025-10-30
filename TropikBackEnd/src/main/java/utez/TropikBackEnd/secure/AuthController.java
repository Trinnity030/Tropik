package utez.TropikBackEnd.secure;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import utez.TropikBackEnd.config.ApiResponse;
import utez.TropikBackEnd.user.dto.UserDTO;
import utez.TropikBackEnd.user.model.User;
import utez.TropikBackEnd.user.model.UserRepository;
import utez.TropikBackEnd.utils.TypesResponse;

import java.util.Optional;

@RestController // Cambié de @Controller a @RestController
@CrossOrigin(origins = {"*"}, methods = {RequestMethod.POST, RequestMethod.GET, RequestMethod.PUT, RequestMethod.DELETE})
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final JWTTokenProvider jwtUtils;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, UserDetailsService userDetailsService, UserRepository userRepository, JWTTokenProvider jwtUtils) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody UserDTO userDTO) {

        Optional<User> optionalUser = userRepository.findByEmail(userDTO.getEmail());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(401).body(
                    new ApiResponse("Credenciales incorrectas", TypesResponse.WARNING)
            );
        }

        User user = optionalUser.get();

        if (!user.isStatus()) {
            return ResponseEntity.status(403).body(
                    new ApiResponse("Usuario inactivo. Contacta al administrador.", TypesResponse.ALERT)
            );
        }

        // Intentar autenticar con email y password
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userDTO.getEmail(), userDTO.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(401).body(
                    new ApiResponse("Credenciales incorrectas", TypesResponse.WARNING)
            );
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(userDTO.getEmail());
        String jwt = jwtUtils.generateToken(userDetails);
        long expirationTime = jwtUtils.getExpirationTime();

        UserDTO userLogin = new UserDTO(user.getId(), user.getRole().getRoleName(), jwt, expirationTime);

        return ResponseEntity.ok(
                new ApiResponse("Inicio de sesión exitoso",userLogin, TypesResponse.SUCCESS)
        );
    }
}