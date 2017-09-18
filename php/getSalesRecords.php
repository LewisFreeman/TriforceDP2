<?php
  $db_con = new mysqli("127.0.0.1", "root", "", "PHPSRePS") or die("Unable to connect!");
  $table = "salesRecords";

  $result = $db_con->query("SELECT * FROM $table;");

  $rows = array();
  while ($r = $result->fetch_assoc()) {
    @$itemId = $r['item'];
    @$item = $db_con->query("SELECT * FROM items WHERE (itemId = '$itemId');")->fetch_assoc();
    @$rows[] = [ "saleNumber" => $r['saleNumber'], "item" => $item['itemName'], "quantity" => $r['quantity'], "date" => $r['date'], "price" => $r['price'] ];
  }
  
  header('Content-Type: application://json');
  echo json_encode($rows,JSON_NUMERIC_CHECK);
?>
