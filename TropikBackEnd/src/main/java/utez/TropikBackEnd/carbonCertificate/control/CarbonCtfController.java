package utez.TropikBackEnd.carbonCertificate.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.TropikBackEnd.carbonCertificate.dto.CarbonCtfDTO;
import utez.TropikBackEnd.config.ApiResponse;

@RestController
@RequestMapping("/api/carbon-certificate")
@CrossOrigin({"*"})
public class CarbonCtfController {

    private final CarbonCtfService carbonCtfService;

    @Autowired
    public CarbonCtfController(CarbonCtfService carbonCtfService) {
        this.carbonCtfService = carbonCtfService;
    }

    @GetMapping("")
    public ResponseEntity<ApiResponse> getAllCertificates() {
        return carbonCtfService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getCertificateById(@PathVariable Long id) {
        return carbonCtfService.findById(id);
    }

    @PostMapping("")
    public ResponseEntity<ApiResponse> createCertificate(@RequestBody CarbonCtfDTO carbonCtfDTO) {
        return carbonCtfService.save(carbonCtfDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateCertificate(@PathVariable Long id, @RequestBody CarbonCtfDTO carbonCtfDTO) {
        return carbonCtfService.update(id, carbonCtfDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteCertificate(@PathVariable Long id) {
        return carbonCtfService.deleteById(id);
    }
}