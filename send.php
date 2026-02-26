<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    die("Invalid Request");
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$name    = htmlspecialchars($_POST['name'] ?? '');
$email   = htmlspecialchars($_POST['email'] ?? '');
$phone   = htmlspecialchars($_POST['phone'] ?? '');
$course  = htmlspecialchars($_POST['course'] ?? '');
$message = htmlspecialchars($_POST['message'] ?? '');

if(empty($name) || empty($email) || empty($message)){
    die("Required fields missing");
}

$mail = new PHPMailer(true);

try {

    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'aliikram6151772@gmail.com';
    $mail->Password   = 'ttcbmnanuhdvcksn';

    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    $mail->SMTPDebug  = 2;
    $mail->Debugoutput = 'html';

    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        ]
    ];

    $mail->setFrom('aliikram6151772@gmail.com', 'Website Contact');
    $mail->addAddress('aliikram6151772@gmail.com');

    if(!empty($email)){
        $mail->addReplyTo($email, $name);
    }

    $mail->isHTML(true);
    $mail->Subject = "New Contact Form Message";

    $mail->Body = "
        <h2>New Contact Message</h2>
        <p><b>Name:</b> {$name}</p>
        <p><b>Email:</b> {$email}</p>
        <p><b>Phone:</b> {$phone}</p>
        <p><b>Subject:</b> {$course}</p>
        <p><b>Message:</b><br>{$message}</p>
    ";

    $mail->send();

    echo "<script>
        alert('✅ Message Sent Successfully!');
        window.location.href='index.html';
    </script>";

} catch (Exception $e) {
    echo "<h3>Mailer Error:</h3>";
    echo $mail->ErrorInfo;
}