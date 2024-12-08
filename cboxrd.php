<?php
    $conn = mysqli_connect("localhost","furrymaster_admin","OwOUwU!Fuwwy","furrymaster_furrydb");
    $qry = $conn -> query("SELECT Checkbox.id, Checkbox.state FROM Checkbox");
    echo '{"data":[';
    while($row = mysqli_fetch_row($qry))
    {
        echo '{"id": ' . $row[0] . ', "state":' . $row[1] . '},';
    }
    echo '{"id":-1,"state":"California"}]}';
    $conn -> close();
?>
