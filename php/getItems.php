<?php
  //$db_con = new mysqli("127.0.0.1", "root", "", "DP2");
  //$table = "POS";

  $db_con = new mysqli("127.0.0.1", "root", "", "PHPSRePS");
  $table = "items";

  $result = $db_con->query("SELECT * FROM $table;");
  //$rows = $result->fetch_assoc();
  $rows = array();
  while ($r = $result->fetch_assoc()) {
    $rows[] = $r;
  }

  //stackoverflow.com/questions/25064570/get-json-data-from-a-php-file-for-an-angular-scope
  header('Content-Type: application://json');
  echo json_encode($rows);
?>
