 <?php  
	$conn = mysqli_connect("localhost", "root", "", "PHPSRePS");  
    $data = json_decode(file_get_contents("php://input"));  
    echo 'Medicine Added: ' . $data->item . "\n";
    echo 'Quantity: ' . $data->amount . "\n";
    echo 'Total Price: ' . $data->price . "\n";

	if(!$conn)
    {
        echo "<p>Database connection failure</p>";
    }
	else
    {
        $sql_table="salesrecords";            
        $query = "insert into $sql_table values('0','$data->item','$data->amount','$data->price')";
		$result = mysqli_query($conn, $query);
            
        // checks if the execution was successful
        if(!$result) 
		{
			echo "Something is wrong with ", $query; //Would not show in a production script
		} 
		else 
		{
            // display an operation successful message
            echo "Successfully added Enquiry record to database";
        } // if successful query operation
        // close the database connection
        mysqli_close($conn);
    }
 ?> 