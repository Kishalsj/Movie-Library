<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = [
        "first_name" => $_POST["first_name"],
        "last_name" => $_POST["last_name"],
        "email" => $_POST["email"],
        "phone" => $_POST["phone"],
        "message" => $_POST["message"]
    ];

    file_put_contents("data.json", json_encode($data, JSON_PRETTY_PRINT), FILE_APPEND);

    $mail_admin = new PHPMailer(true);
    try {
        $mail_admin->isSMTP();
        $mail_admin->Host = 'smtp.gmail.com'; 
        $mail_admin->SMTPAuth = true;
        $mail_admin->Username = 'kishalsj2002@gmail.com'; 
        $mail_admin->Password = 'osdrshsyzlzkxzhi'; 
        $mail_admin->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail_admin->Port = 587;

        
        $mail_admin->setFrom('kishalsj2002@gmail.com', 'Mailer');
        $mail_admin->addAddress('marryjane69696969@gmail.com'); 
        $mail_admin->addAddress('dumidu.kodithuwakku@ebeyonds.com');
        $mail_admin->addAddress('prabhath.senadheera@ebeyonds.com');
        $mail_admin->isHTML(true);
        $mail_admin->Subject = 'New Form Submission';
        $mail_admin->Body    = nl2br(print_r($data, true)); 

        $mail_admin->send();

        $mail_user = new PHPMailer(true);
        try {
            $mail_user->isSMTP();
            $mail_user->Host = 'smtp.gmail.com'; 
            $mail_user->SMTPAuth = true;
            $mail_user->Username = 'kishalsj2002@gmail.com'; 
            $mail_user->Password = 'osdrshsyzlzkxzhi'; 
            $mail_user->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
            $mail_user->Port = 587;

            //Recipients
            $mail_user->setFrom('kishalsj2002@gmail.com', 'Mailer');
            $mail_user->addAddress($data["email"]); 

            // Content
            $mail_user->isHTML(true);
            $mail_user->Subject = 'Form Submission Received';
            $mail_user->Body    = "Thank you for reaching out! We'll get back to you soon.";

            $mail_user->send();

            echo "Form submitted successfully!";
        } catch (Exception $e) {
            echo "Message could not be sent to the user. Mailer Error: {$mail_user->ErrorInfo}";
        }

    } catch (Exception $e) {
        echo "Message could not be sent to the admin. Mailer Error: {$mail_admin->ErrorInfo}";
    }
}
?>
