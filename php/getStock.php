<?php
  $db_con = new mysqli("localhost", "root", "", "PHPSRePS") or die("Unable to connect!");
  $table = "Records";
  $result = $db_con->query("SELECT * FROM $table;");
  $rows = array();
  while ($r = $result->fetch_assoc()) {
    $rows[] = $r;
  }
  header('Content-Type: application://json');
  echo json_encode($rows,JSON_NUMERIC_CHECK);
?>
