<html lang="en">

<head>
	<meta charset="utf-8" />
	<meta name="description" content="Travel Booking" />
	<meta name="keywords" content="Creating Web Assignment 1" />
	<meta name="author" content="Jonathan Yong" />
	<title>Database Record</title>
</head>

<body>

    <?php
        $conn = mysqli_connect("localhost", "root", "", "PHPSRePS");  
        //Checks if connection is successful
        if(!$conn)
        {
            //Displays error message
            echo "<p>Database connection failure</p>";
        }else
        {
            //Upon succesful connection
            $sql_table = "salesrecords";
            
            //Set up the SQL command to add the data into the table
            $query = "select * from salesrecords";
			
        
            //execute the query and store result into the result pointer
            $result = mysqli_query($conn, $query);

            
            //checks if the execution was succesful
            if(!$result)
            {
                echo "<p>Something is wrong with ", $query, "</p>";
            }else
            {
                //Display the retrieved records
                echo "<table border = \"1\">";
                echo "<tr>"
                ."<th scope=\"col\">Transaction ID</th>"
                ."<th scope=\"col\">Item</th>"
                ."<th scope=\"col\">Quantity</th>"
				."<th scope=\"col\">Date</th>"
                ."<th scope=\"col\">Total Price</th>"
                ."</tr>";
                
                //retrieve current record pointed by the result pointer
                
                while($row = mysqli_fetch_assoc($result))
                {
                    echo "<tr>";
                    echo "<td>", $row["saleNumber"],"</td>";
                    echo "<td>", $row["item"],"</td>";
                    echo "<td>", $row["quantity"],"</td>";
                    echo "<td>", $row["date"],"</td>";
					echo "<td>", $row["price"],"</td>";
                    echo "</tr>";
                }
                echo "</table>";
                //Frees up the memory, after using the result pointer
                mysqli_free_result($result);
            }// if sucessful query operation
            
            //close the database connection
            mysqli_close($conn);
        }//if successful database connection
        ?>
</body>
</html>