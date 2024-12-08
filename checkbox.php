<?php
    $id = intval($_GET["id"]);
    if($id >= 0 && $id < 21)
    {
        $state = 0;
        if($_GET["state"] == "true")$state = 1;
        $command = "UPDATE Checkbox SET Checkbox.state = " . $state . " WHERE Checkbox.id = " . $id;
        echo $command;
        $conn = mysqli_connect("localhost","furrymaster_admin","OwOUwU!Fuwwy","furrymaster_furrydb");
        $conn -> query($command);
    }
?>
