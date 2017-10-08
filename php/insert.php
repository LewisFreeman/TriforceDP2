<?php
  	$conn = mysqli_connect("localhost", "root", "", "PHPSRePS");
    //receives input from angularJS and saves into data
	$data = json_decode(file_get_contents("php://input"));
  	
    //if connection to database fails, else continue
	if(!$conn) {
		echo "<p>Database connection failure</p>";
	} else {
		$date = date("Y-m-d"); //gets current date
		$sql_table = "Records";

        //obtains week numer
		$week = "select WEEKOFYEAR('$date')";
        //queries to find out weeknumber
		$resultWeek = mysqli_query($conn,$week);
		while($rowWeek = mysqli_fetch_array($resultWeek))
		{
            //saves result of weeknumber into weekID
			$weekID = $rowWeek["WEEKOFYEAR('$date')"];
		}
	  
		$sql_week ="weeklyReport";

        //insert new records
		$query = "insert into $sql_table values('0','$data->item','$data->amount','$date','$data->price')";
        //inserts into weekly report database
		$queryWeekly = "insert into $sql_week values('$weekID','$data->item','$data->amount','$data->price')";
        //makes sure that the same week id and item name data are stored in a single row
		$queryValidate = "select StockSold from $sql_week where WeekID='$weekID' and ItemName='$data->item'";
	
        //calling validate and insert query
		$resultValidate = mysqli_query($conn, $queryValidate);
		$result = mysqli_query($conn, $query);

		if(mysqli_num_rows($resultValidate) != 1)
		{
            //if there is no existing row for week and item name
			 mysqli_query($conn, $queryWeekly);
		} else
		{
            //updates the row of item
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