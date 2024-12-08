<?php
    $command = "UPDATE VisitorCounter SET VisitorCounter.counter = VisitorCounter.counter+1;";
    $conn = mysqli_connect("localhost","furrymaster_admin","OwOUwU!Fuwwy","furrymaster_furrydb");
    $conn -> query($command);
    echo $conn -> query("SELECT VisitorCounter.counter FROM VisitorCounter WHERE VisitorCounter.site = 'nineeleven';") -> fetch_row()[0];
?>