<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  // Sanitize and validate input
  $name = strip_tags(trim($_POST["name"]));
  $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
  $message = trim($_POST["message"]);

  if (empty($name) || empty($email) || empty($message) || !$email) {
    echo "Please complete the form correctly.";
    exit;
  }

  // Set the recipient email address
  $recipient = "info@gmatcompany.co.ke";

  // Set the email subject
  $subject = "New Contact from $name";

  // Build the email content
  $email_content = "Name: $name\n";
  $email_content .= "Email: $email\n\n";
  $email_content .= "Message:\n$message\n";

  // Build the email headers
  $email_headers = "From: $name <$email>";

  // Send the email
  if (mail($recipient, $subject, $email_content, $email_headers)) {
    echo "Thank you for your message!";
  } else {
    echo "Oops! Something went wrong; please try again.";
  }
} else {
  echo "There was a problem with your submission.";
}
?>