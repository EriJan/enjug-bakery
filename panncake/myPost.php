<?php
//echo 'Nu är vi här eller what evs';
define('DB_NAME', 'student');
define('DB_USER', 'root');
define('DB_PASSWORD','Forfattare1');
define('DB_HOST', 'localhost');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if(!$link){
    die('Kunde inte koppla'.mysql_error());
}

//echo 'Connected successfully';

$db_selected = mysql_select_db(DB_NAME, $link);

$value = $_POST['sname'];

$sql = "INSERT INTO studentinfo (sname) VALUES ('$value')";

if(!mysql_query($sql)){
    die(mysql_error);
}

mysql_close();

echo '<html><head>Sparade i databasen</head><body>Nu har vi sparat ' + $value + 'i databasen.</body></html>'

?>
