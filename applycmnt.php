<?php
    $conn = mysqli_connect("localhost","furrymaster_admin","OwOUwU!Fuwwy","furrymaster_furrydb");
    $cmd = 'INSERT INTO Comments(content) SELECT CommentQueue.content FROM CommentQueue WHERE email = "' . $_GET["eml"] . '"';
    $conn -> query($cmd);
    $cmd = 'DELETE FROM CommentQueue WHERE CommentQueue.email = "' . $_GET["eml"] . '"';
    $conn -> query($cmd);
    $conn -> close();
?>
