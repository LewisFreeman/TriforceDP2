 <?php
  $conn = mysqli_connect("localhost", "root", "root", "PHPSRePS");
  $data = json_decode(file_get_contents("php://input"));
  if(!$conn)
    {
        echo "<p>Database connection failure</p>";
    }
  else
    {
      $sql_table="Records";
      //$query = "UPDATE $sql_table SET ItemName='$data->Name',Quantity='$data->Quantity',Date='$data->Date',Price='$data->Price' WHERE TransactionID = '$data->ID')";
      $queryItem = "UPDATE $sql_table SET ItemName='$data->Name' WHERE TransactionID = '$data->ID' and not ('$data->Name' = '')";
      $queryQuantity = "UPDATE $sql_table SET Quantity='$data->Quantity' WHERE TransactionID = '$data->ID' and not ('$data->Quantity' = '')";
      $queryDate = "UPDATE $sql_table SET Date='$data->Date' WHERE TransactionID = '$data->ID' and not ('$data->Date' = '')";
      $queryPrice = "UPDATE $sql_table SET Price='$data->Price' WHERE TransactionID = '$data->ID' and not ('$data->Price' = '')";
      mysqli_query($conn,$queryItem);
      mysqli_query($conn,$queryQuantity);
      mysqli_query($conn,$queryDate);
      mysqli_query($conn,$queryPrice);
      mysqli_close($conn);
      }

 ?>
