<?php
  	$conn = mysqli_connect("localhost", "root", "", "PHPSRePS");
	$data = json_decode(file_get_contents("php://input"));
  	
	if(!$conn) {
        echo "<p>Database connection failure</p>";
    } else {
        $date = date("Y-m-d");
        $sql_table = "Records";
        $query = "insert into $sql_table values('0','$data->item','$data->amount','$date','$data->price')";
        $result = mysqli_query($conn, $query);
      
		if(!$result) {
          echo "Something is wrong with ", $query; //Would not show in a production script
        } else {
          	echo "Successfully added Enquiry record to database";
			
			//check for low item count, insert new report
			$query = "SELECT * FROM itemlist WHERE (ItemName = '$data->item')";
			$result = mysqli_query($conn, $query);
			if ($result) {
				$res = $result->fetch_assoc();
				$itemQ = $res["Stock"];
				$imp = "Warning";
				if ($itemQ <= 0)
					$imp = "Alert";
				//
				
				$query = "INSERT INTO reportQueue (importance, item) VALUES ('Warning', '$data->item')";
				$result = mysqli_query($conn, $query);
			}
        } 
		
		// if successful query operation
        // close the database connection
        mysqli_close($conn);
	}
 ?> 