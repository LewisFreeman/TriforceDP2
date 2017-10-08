<?php
  	$conn = mysqli_connect("localhost", "root", "", "PHPSRePS");
	$data = json_decode(file_get_contents("php://input"));
  	
	if(!$conn) {
		echo "<p>Database connection failure</p>";
	} else {
		$date = date("Y-m-d");
		$sql_table = "Records";

		$week = "select WEEKOFYEAR('$date')";
		$resultWeek = mysqli_query($conn,$week);
		while($rowWeek = mysqli_fetch_array($resultWeek))
		{
			$weekID = $rowWeek["WEEKOFYEAR('$date')"];
		}
	  
		$sql_table="Records";
		$sql_week ="weeklyReport";

		$query = "insert into $sql_table values('0','$data->item','$data->amount','$date','$data->price')";
		$queryWeekly = "insert into $sql_week values('$weekID','$data->item','$data->amount','$data->price')";
		$queryValidate = "select StockSold from $sql_week where WeekID='$weekID' and ItemName='$data->item'";
	
		$resultValidate = mysqli_query($conn, $queryValidate);
	   
		$result = mysqli_query($conn, $query);

		if(mysqli_num_rows($resultValidate) != 1)
		{
			 mysqli_query($conn, $queryWeekly);
		} else
		{
			$queryUpdate = "UPDATE $sql_week set StockSold=StockSold+'$data->amount', TotalSales=TotalSales+'$data->price' where WeekID='$weekID' and ItemName='$data->item'";
			mysqli_query($conn, $queryUpdate);
		}

		if(!$result) {
			echo "Error in processing sale: " . $conn->errno;
		} else {
		  	echo "Successfully added Enquiry record to database";
			
			//check for low item count, insert new report
			$query = "SELECT * FROM itemlist WHERE (ItemName = '$data->item')";
			$result = mysqli_query($conn, $query);
			if ($result) {
				$res = $result->fetch_assoc();
				$itemQ = $res["Stock"];
              
                if ($itemQ <= 50) {
                
				  $imp = "Warning";
				  if ($itemQ <= 0)
					$imp = "Alert";
				
				  $query = "INSERT INTO reportQueue (importance, item) VALUES ('Warning', '$data->item')";
				  $result = mysqli_query($conn, $query);
                }
			}
		} 
		
		// if successful query operation
		// close the database connection
		mysqli_close($conn);
	}
 ?>