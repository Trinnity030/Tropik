package utez.TropikBackEnd.carbonCertificate.control;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.TropikBackEnd.carbonCertificate.dto.CarbonCtfDTO;
import utez.TropikBackEnd.carbonCertificate.model.CarbonCtf;
import utez.TropikBackEnd.carbonCertificate.model.CarbonCtfRepository;
import utez.TropikBackEnd.config.ApiResponse;
import utez.TropikBackEnd.utils.TypesResponse;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CarbonCtfService {

    private final CarbonCtfRepository carbonCtfRepository;

    @Autowired
    public CarbonCtfService(CarbonCtfRepository carbonCtfRepository) {
        this.carbonCtfRepository = carbonCtfRepository;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findAll() {
        try {
            List<CarbonCtf> certificates = carbonCtfRepository.findAll();
            List<CarbonCtfDTO> certificateDTOs = certificates.stream()
                    .map(this::convertToDTO)
                    .toList();

            return ResponseEntity.ok(new ApiResponse("Certificados obtenidos correctamente", certificateDTOs, TypesResponse.SUCCESS));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al obtener certificados: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findById(Long id) {
        try {
            Optional<CarbonCtf> certificate = carbonCtfRepository.findById(id);
            if (certificate.isPresent()) {
                CarbonCtfDTO certificateDTO = convertToDTO(certificate.get());
                return ResponseEntity.ok(new ApiResponse("Certificado encontrado", certificateDTO, TypesResponse.SUCCESS));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(null, "Certificado no encontrado", TypesResponse.WARNING));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al buscar certificado: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> save(CarbonCtfDTO carbonCtfDTO) {
        try {
            CarbonCtf certificate = convertToEntity(carbonCtfDTO);
            CarbonCtf savedCertificate = carbonCtfRepository.save(certificate);
            CarbonCtfDTO savedCertificateDTO = convertToDTO(savedCertificate);

            return ResponseEntity.ok(new ApiResponse("Certificado creado correctamente", savedCertificateDTO, TypesResponse.SUCCESS));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al crear certificado: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> update(Long id, CarbonCtfDTO carbonCtfDTO) {
        try {
            Optional<CarbonCtf> existingCertificate = carbonCtfRepository.findById(id);
            if (existingCertificate.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(null, "Certificado no encontrado", TypesResponse.WARNING));
            }

            CarbonCtf certificate = existingCertificate.get();
            updateEntityFromDTO(certificate, carbonCtfDTO);

            CarbonCtf updatedCertificate = carbonCtfRepository.save(certificate);
            CarbonCtfDTO updatedCertificateDTO = convertToDTO(updatedCertificate);

            return ResponseEntity.ok(new ApiResponse("Certificado actualizado correctamente", updatedCertificateDTO, TypesResponse.SUCCESS));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al actualizar certificado: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    @Transactional
    public ResponseEntity<ApiResponse> deleteById(Long id) {
        try {
            if (!carbonCtfRepository.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(null, "Certificado no encontrado", TypesResponse.WARNING));
            }

            carbonCtfRepository.deleteById(id);
            return ResponseEntity.ok(new ApiResponse(null, "Certificado eliminado correctamente", TypesResponse.SUCCESS));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(null, "Error al eliminar certificado: " + e.getMessage(), TypesResponse.WARNING));
        }
    }

    // Métodos auxiliares de conversión
    private CarbonCtfDTO convertToDTO(CarbonCtf certificate) {
        return new CarbonCtfDTO(
                certificate.getId(),
                certificate.getOrigin(),
                certificate.getPlace(),
                certificate.getReduction(),
                certificate.getPeriod(),
                certificate.getCertificate(),
                certificate.getEmissionDate(),
                certificate.getStatus(),
                certificate.getRegister()
        );
    }

    private CarbonCtf convertToEntity(CarbonCtfDTO dto) {
        CarbonCtf certificate = new CarbonCtf();
        certificate.setId(dto.getId());
        certificate.setOrigin(dto.getOrigin());
        certificate.setPlace(dto.getPlace());
        certificate.setReduction(dto.getReduction());
        certificate.setPeriod(dto.getPeriod());
        certificate.setCertificate(dto.getCertificate());
        certificate.setEmissionDate(dto.getEmissionDate());
        certificate.setStatus(dto.getStatus());
        certificate.setRegister(dto.getRegister());
        return certificate;
    }

    private void updateEntityFromDTO(CarbonCtf certificate, CarbonCtfDTO dto) {
        if (dto.getOrigin() != null) certificate.setOrigin(dto.getOrigin());
        if (dto.getPlace() != null) certificate.setPlace(dto.getPlace());
        if (dto.getReduction() != null) certificate.setReduction(dto.getReduction());
        if (dto.getPeriod() != null) certificate.setPeriod(dto.getPeriod());
        if (dto.getCertificate() != null) certificate.setCertificate(dto.getCertificate());
        if (dto.getEmissionDate() != null) certificate.setEmissionDate(dto.getEmissionDate());
        if (dto.getStatus() != null) certificate.setStatus(dto.getStatus());
        if (dto.getRegister() != null) certificate.setRegister(dto.getRegister());
    }
}