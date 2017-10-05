<?php
    $db_con = new mysqli("127.0.0.1", "root", "", "PHPSRePS") or die("Unable to connect!");
    $table = "reportQueue";
    $result = $db_con->query("SELECT * FROM $table;");

    $rows = array();
    while ($r = $result->fetch_assoc()) {
      $imp = $r['importance'];

      $row = array();

      if (strcmp($imp, "Alert") > 0) {
        $row["styling"] = "reportAlert";
        $row["state"] = "LOW in";
      } else {
        $row["styling"] = "reportWarning";
        $row["state"] = "OUT of";
      }

      $row["importance"] = $imp;
      $row["item"] = $r["item"];

      $rows[] = $row;
    }

    header('Content-Type: application://json');
    echo json_encode($rows);
?>
