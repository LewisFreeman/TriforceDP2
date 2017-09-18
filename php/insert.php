 <?php
  $conn = mysqli_connect("localhost", "root", "", "PHPSRePS");
  $data = json_decode(file_get_contents("php://input"));
  if(!$conn)
    {
        echo "<p>Database connection failure</p>";
    }
  else
    {
        $date = date("Y-m-d");
        $sql_table="Records";
        $query = "insert into $sql_table values('0','$data->item','$data->amount','$date','$data->price')";
        $result = mysqli_query($conn, $query);
        if(!$result)
        {
          echo "Something is wrong with ", $query; //Would not show in a production script
        }
        else
        {
          echo "Successfully added Enquiry record to database";
        } // if successful query operation
            // close the database connection
        mysqli_close($conn);
        }

 ?>
