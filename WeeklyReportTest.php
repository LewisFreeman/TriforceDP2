<html>
<head>Weekly Report</head>
    
    <?php 

     $conn = mysqli_connect("localhost", "root", "root", "PHPSRePS");
        //Checks if connection is successful
        if(!$conn)
        {
            //Displays error message
            echo "<p>Database connection failure</p>";
        }else
        {
            //Upon succesful connection
            $sql_items = "itemlist";
                        //Set up the SQL command to add the data into the table
            $date = date("Y-m-d");
            $queryItems = "select * from $sql_items";
            $queryDate = "select WEEKOFYEAR('$date')";

            //execute the query and store result into the result pointer
            $result = mysqli_query($conn, $queryItems);
            $resultWeek = mysqli_query($conn, $queryDate);
            
            while($rowWeek = mysqli_fetch_array($resultWeek))
            {
                $weekNumber = $rowWeek["WEEKOFYEAR('$date')"];
            }
            echo $weekNumber;
            
            $queryValidate = "select StockSold from weeklyReport where WeekID='40' and ItemName='Toothbrush'";
           $resultValidate = mysqli_query($conn, $queryValidate); 
           $NRows = mysqli_num_rows($resultValidate);

            //$resultWeek = mysqli_query($conn, $queryDate);
            
            /*
             if(!$resultDate)
            {
                echo "<p>Something is wrong with ", $query, "</p>";
            }else
             {

             }
             */

            //checks if the execution was succesful
            if(!$result)
            {
                echo "<p>Something is wrong with ", $query, "</p>";
            }else
            {
                //Display the retrieved records
                echo "<table border = \"1\">";
                echo "<tr>"
                ."<th scope=\"col\">Item Name ID</th>"
                ."<th scope=\"col\">Stock</th>"

                ."</tr>";

                //retrieve current record pointed by the result pointer

                while($row = mysqli_fetch_assoc($result))
                {
                    echo "<tr>";
                    echo "<td>", $row["ItemName"],"</td>";
                    echo "<td>", $row["Stock"],"</td>";
                    echo "</tr>";
                }
                echo "</table>";
                echo "test";
                $numRows = mysqli_num_rows($result);
                
                echo $numRows;
                echo "test 2";
                
                //Frees up the memory, after using the result pointer
                mysqli_free_result($result);
            } //if sucessful query operation

            //close the database connection
            mysqli_close($conn);
        }
    
    ?>


</html>