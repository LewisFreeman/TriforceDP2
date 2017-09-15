<?php
  $db_con = new mysqli("127.0.0.1", "root", "", "PHPSRePS") or die("Unable to connect!");
  $table = "items";
  $result = $db_con->query("SELECT * FROM $table;");
  $rows = array();
  while ($r = $result->fetch_assoc()) {
    $rows[] = $r;
  }
  header('Content-Type: application://json');
  echo json_encode($rows);
?>
