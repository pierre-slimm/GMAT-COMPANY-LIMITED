<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Set header to return JSON
header('Content-Type: application/json');

function sendResponse($success, $message) {
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] != "POST") {
    sendResponse(false, "Invalid request method.");
}

// Validate input
$name = strip_tags(trim($_POST["name"] ?? ''));
$email = filter_var(trim($_POST["email"] ?? ''), FILTER_SANITIZE_EMAIL);
$subject = strip_tags(trim($_POST["subject"] ?? ''));
$message = strip_tags(trim($_POST["message"] ?? ''));

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    sendResponse(false, "All fields are required.");
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    sendResponse(false, "Invalid email format.");
}

$mail = new PHPMailer(true);

try {
    // Enable Debugging for Development (Disable in Production)
    // $mail->SMTPDebug = SMTP::DEBUG_SERVER;

    // SMTP Server Settings
    $mail->isSMTP();
    $mail->Host       = 'mail.gmatcompanylimited.co.ke';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'info@gmatcompanylimited.co.ke';
    $mail->Password   = '@Slimm20025'; // Use the actual SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // Try ENCRYPTION_SMTPS if needed
    $mail->Port       = 587; // Change to 465 if using SSL

    // Sender & Recipient
    $mail->setFrom('info@gmatcompanylimited.co.ke', 'Website Contact Form');
    $mail->addAddress('info@gmatcompanylimited.co.ke', 'Recipient Name');

    // Reply-To (Allows responding to sender)
    $mail->addReplyTo($email, $name);

    // Email Content
    $mail->isHTML(false);
    $mail->Subject = "Website Contact Form: $subject";
    $mail->Body    = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    // Send Email
    $mail->send();
    sendResponse(true, "Thank you! Your message has been sent successfully.");
    
} catch (Exception $e) {
    sendResponse(false, "Message could not be sent. Error: " . $mail->ErrorInfo);
}
