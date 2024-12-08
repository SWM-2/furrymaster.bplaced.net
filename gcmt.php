<?php
    $conn = mysqli_connect("localhost","furrymaster_admin","OwOUwU!Fuwwy","furrymaster_furrydb");
    $qry = $conn -> query("SELECT Comments.content, Comments.id FROM Comments");
    echo '<ul>';
    $isdev = false;
    if(isset($_GET["dev"]))
    {
        $isdev = true;
    }
    while($row = mysqli_fetch_row($qry))
    {
        if($isdev)
        {
            echo "<li>" . $row[1] . " = " . str_replace(">","&gt;",str_replace("<","&lt;",base64_decode($row[0]))) . "</li>";
        }else{
            echo "<li>" . str_replace(">","&gt;",str_replace("<","&lt;",base64_decode($row[0]))) . "</li>";
        }
    }
    echo '</ul>';
    $conn -> close();
?>
