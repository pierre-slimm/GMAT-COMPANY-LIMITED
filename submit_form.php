<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $subject = strip_tags(trim($_POST["subject"]));
    $message = strip_tags(trim($_POST["message"]));

    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        die("All fields are required.");
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email format.");
    }

    $mail = new PHPMailer(true); // Enable exceptions

    try {
        // SMTP Server Settings
       // $mail->SMTPDebug = SMTP::DEBUG_OFF; // Set to DEBUG_SERVER for troubleshooting
        $mail->isSMTP();
        $mail->Host       = 'das108.truehost.cloud'; // Replace with your actual SMTP host
        $mail->SMTPAuth   = true;
        $mail->Username   = 'info@gmatcompanylimited.co.ke';
        $mail->Password   = ''; // Replace with an environment variable for security
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587; // Use 465 for SSL if required

        // Sender & Recipient
        $mail->setFrom('info@gmatcompanylimited.co.ke', 'Website Contact Form');
        $mail->addAddress('slimmworldtechnologies21@gmail.com', 'Recipient Name');

        // Email Content
        $mail->isHTML(false);
        $mail->Subject = "Website Contact Form: $subject";
        $mail->Body    = "Name: $name\nEmail: $email\n\nMessage:\n$message";

        // Send Email
        $mail->send();
        echo 'Message has been sent successfully!';
    } catch (Exception $e) {
        echo "Message could not be sent. Error: {$mail->ErrorInfo}";
    }
}
?>
