<?php
    $conn = mysqli_connect("localhost","furrymaster_admin","OwOUwU!Fuwwy","furrymaster_furrydb");
    $result = $conn -> query("SELECT VisitorCounter.site, VisitorCounter.counter FROM VisitorCounter;");
    echo "<ul>";
    while ($row = $result -> fetch_row()) 
    {
        echo "<li>" . $row[0] . " = " . $row[1] . "</li>";
    }
    echo "</ul>";
?>