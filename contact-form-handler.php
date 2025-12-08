<?php
/**
 * Contact Form Email Handler for index.html
 * Sends form data to reservas@alpineskiacademy.com
 */

// Enable error reporting for debugging (comment out in production)
error_reporting(E_ALL);
ini_set('display_errors', 0);

// Set response headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Get form data
$firstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
$lastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$phone = isset($_POST['phone']) ? trim($_POST['phone']) : 'No proporcionado';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
if (empty($firstName) || empty($lastName) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Por favor, completa todos los campos obligatorios.']);
    exit;
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Por favor, ingresa un email válido.']);
    exit;
}

// Email configuration
$to = 'reservas@alpineskiacademy.com';
$subject = "Nueva Consulta de Contacto - $firstName $lastName";
$headers = "From: noreply@alpineskiacademy.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";

// Format email body (escaped for security)
$firstNameSafe = htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8');
$lastNameSafe = htmlspecialchars($lastName, ENT_QUOTES, 'UTF-8');
$emailSafe = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
$phoneSafe = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$messageSafe = nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8'));
$dateNow = date('d/m/Y H:i:s');

$emailBody = <<<EMAIL
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #2a5298; color: white; padding: 20px; text-align: center; }
        .content { background-color: #f8f9fa; padding: 20px; }
        .section { margin-bottom: 20px; padding: 15px; background-color: white; border-left: 4px solid #2a5298; }
        .label { font-weight: bold; color: #2a5298; }
        .footer { margin-top: 20px; padding: 20px; background-color: #f1f1f1; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📧 Nueva Consulta de Contacto</h2>
        </div>
        <div class='content'>
            <div class='section'>
                <h3>👤 Información de Contacto</h3>
                <p><span class='label'>Nombre:</span> $firstNameSafe $lastNameSafe</p>
                <p><span class='label'>Email:</span> $emailSafe</p>
                <p><span class='label'>Teléfono:</span> $phoneSafe</p>
            </div>
            <div class='section'>
                <h3>💬 Mensaje</h3>
                <p>$messageSafe</p>
            </div>
        </div>
        <div class='footer'>
            <p>Este mensaje fue enviado desde el formulario de contacto de Alpine Ski Academy.</p>
            <p>Fecha de envío: $dateNow</p>
        </div>
    </div>
</body>
</html>
EMAIL;

// Send email
$mailSent = @mail($to, $subject, $emailBody, $headers);

if ($mailSent) {
    echo json_encode([
        'success' => true, 
        'message' => '¡Mensaje enviado con éxito! Te responderemos pronto.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'error' => 'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente o contáctanos directamente por teléfono.'
    ]);
}
?>

