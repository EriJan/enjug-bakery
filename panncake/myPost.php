<?php
define('DB_NAME', 'student');
define('DB_USER', 'root');
define('DB_PASSWORD','');
define('DB_HOST', 'localhost');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if(!$link){
    die('Kunde inte koppla'.mysql_error());
}

echo 'Connected successfully';

$db_selected = mysql_select_db(DB_NAME, $link);

$value = $_POST['sname'];

$sql = "INSERT INTO studentinfo (id) VALUES ($value)";

if(!mysql_query($sql)){
    die(mysql_error);
}


mysql_close();
?>
