package utez.TropikBackEnd.utils;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.stellar.sdk.*;
import org.stellar.sdk.responses.AccountResponse;
import org.stellar.sdk.responses.*;

import jakarta.annotation.PostConstruct;

@Service
public class TokenService {

    // 1. INYECCIÓN DE PROPIEDADES (Desde application.properties)
    @Value("${stellar.network.url}")
    private String horizonUrl;
    @Value("${stellar.asset.code}")
    private String tokenCode;
    @Value("${stellar.account.issuer.secret-key}")
    private String issuerSecret;
    @Value("${stellar.account.treasury.public-key}")
    private String treasuryPublic;

    // OBJETOS DE STELLAR (Inicializados en @PostConstruct)
    private Server server;
    private KeyPair issuerKeypair;
    private Asset carbonAsset;

    /**
     * Inicializa los objetos del Stellar SDK después de que Spring inyecta las propiedades.
     */
    @PostConstruct
    public void init() {
        try {
            // Configura la red a Testnet y el servidor
            Network.useTestNetwork();
            this.server = new Server(horizonUrl);

            // Carga las credenciales del Emisor
            this.issuerKeypair = KeyPair.fromSecretSeed(issuerSecret);

            // Define el activo: CANEBOND emitido por la Cuenta Emisora
            this.carbonAsset = Asset.createNonNativeAsset(tokenCode, issuerKeypair.getAccountId());

            System.out.println("✅ Stellar SDK inicializado para el activo: " + tokenCode);
        } catch (Exception e) {
            // Manejo de error crítico si las claves son incorrectas o faltan
            System.err.println("❌ ERROR: No se pudo inicializar Stellar SDK. Verifique las claves: " + e.getMessage());
            throw new RuntimeException("Fallo al inicializar el TokenService", e);
        }
    }

    /**
     * Crea y emite 1.00 unidad del token CANEBOND a la Cuenta de Tesorería.
     * * @param certificateId El ID único del certificado (UUID o ID de la DB) que sirve como Memo.
     * @return El Hash de la Transacción en Stellar.
     * @throws RuntimeException Si la transacción falla.
     */
    public String issueSingleCarbonToken(String certificateId) {
        try {
            // 1. Obtener la cuenta emisora para actualizar el número de secuencia
            AccountResponse issuerAccount = this.server.accounts().account(this.issuerKeypair.getAccountId());

            // 2. Crear un Memo Único (vincula el token a su certificado en su DB)
            Memo memo = Memo.text(certificateId);

            // 3. Operación: Pagar 1.00 CANEBOND a la Tesorería (Emisión)
            PaymentOperation paymentOperation = new PaymentOperation.Builder(
                    KeyPair.fromAccountId(this.treasuryPublic), // Destino: Tesorería
                    this.carbonAsset, // Activo: TROK
                    "1.00") // Cantidad: Siempre 1.00 por certificado único
                    .build();

            // 4. Construir y Firmar la Transacción
            Transaction transaction = new Transaction.Builder(issuerAccount, Network.TESTNET)
                    .addOperation(paymentOperation)
                    .addMemo(memo)
                    .setBaseFee(Transaction.MIN_BASE_FEE) // Costo mínimo (100 stroops)
                    .build();

            transaction.sign(this.issuerKeypair); // Firma con la clave secreta del Emisor

            // 5. Enviar a Stellar
            SubmitTransactionResponse response = server.submitTransaction(transaction);

            if (response.isSuccess()) {
                String transactionHash = response.getHash();
                System.out.println("✅ Token creado. Hash: " + transactionHash + ". Memo: " + certificateId);
                return transactionHash;
            } else {
                // Capturar el código de error de Stellar para un mejor diagnóstico
                String errorCode = response.getExtras().getResultCodes().getTransactionResultCode();
                String message = "Fallo en la emisión para el certificado " + certificateId + ". Código: " + errorCode;
                System.err.println("❌ " + message);
                throw new RuntimeException("Error al emitir el token: " + message);
            }
        } catch (Exception e) {
            System.err.println("Error no controlado durante la emisión: " + e.getMessage());
            throw new RuntimeException("Error al comunicarse con la red Stellar.", e);
        }
    }
}