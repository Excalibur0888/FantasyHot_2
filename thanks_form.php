<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $email = isset($_POST["email"]) ? $_POST["email"] : '';
    $name = isset($_POST["name"]) ? $_POST["name"] : '';
    $subject = isset($_POST["subject"]) ? $_POST["subject"] : '';
    $message = isset($_POST["message"]) ? $_POST["message"] : '';

    // Admin email
    $to = "support@" . $_SERVER['HTTP_HOST'];
    
    // Form email subject
    $email_subject = !empty($subject) ? $subject : "New Newsletter Subscription";
    
    // Form email body
    $body = "";
    if(!empty($name)) {
        $body .= "Name: $name\n";
    }
    $body .= "Email: $email\n";
    if(!empty($message)) {
        $body .= "Message:\n$message\n";
    }

    // Email headers
    $headers = "From: $to\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send email
    mail($to, $email_subject, $body, $headers);

    // Redirect to thank you page
    header("Location: thanks.html");
    exit();
}
?>
