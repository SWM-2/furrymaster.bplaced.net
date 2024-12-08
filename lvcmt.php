<?php
$conn = mysqli_connect("localhost","furrymaster_admin","OwOUwU!Fuwwy","furrymaster_furrydb");
echo "Sending mail to " . base64_decode($_GET["eml"]);
mail(base64_decode($_GET["eml"]),"Send your comment","Verify on http://furrymaster.bplaced.net/verifycmnt.html");
$cmd = 'INSERT INTO CommentQueue(content,email) VALUES ("' . $_GET["content"] . '","' . $_GET["eml"] .'")';
$conn -> query($cmd);
$conn -> close();
?>
