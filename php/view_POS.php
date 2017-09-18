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
            $sql_table = "Records";

            $saleNumber = ($_POST['TransactionID']);
            $item = ($_POST['ItemName']);
            $quantity = ($_POST['Quantity']);
            $date = ($_POST['Date']);
            $price = ($_POST['Price']);

            $queryItem = "UPDATE $sql_table SET ItemName='$item' WHERE TransactionID = '$saleNumber' and not ('$item' = '')";
            $queryQuantity = "UPDATE $sql_table SET Quantity='$quantity' WHERE TransactionID = '$saleNumber' and not ('$quantity' = '')";
            $queryDate = "UPDATE $sql_table SET Date='$date' WHERE TransactionID = '$saleNumber' and not ('$date' = '')";
            $queryPrice = "UPDATE $sql_table SET Price='$price' WHERE TransactionID = '$saleNumber' and not ('$price' = '')";

            mysqli_query($conn,$queryItem);
            $querycheck = mysqli_query($conn,$queryQuantity);
            mysqli_query($conn,$queryDate);
            mysqli_query($conn,$queryPrice);


            //Set up the SQL command to add the data into the table
            $query = "select * from $sql_table";

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
                ."<th scope=\"col\">Item Name</th>"
                ."<th scope=\"col\">Quantity</th>"
        ."<th scope=\"col\">Date</th>"
                ."<th scope=\"col\">Total Price</th>"
                ."</tr>";

                //retrieve current record pointed by the result pointer

                while($row = mysqli_fetch_assoc($result))
                {
                    echo "<tr>";
                    echo "<td>", $row["TransactionID"],"</td>";
                    echo "<td>", $row["ItemName"],"</td>";
                    echo "<td>", $row["Quantity"],"</td>";
                    echo "<td>", $row["Date"],"</td>";
          echo "<td>", $row["Price"],"</td>";
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

    <form method="post" action="view_POS.php">
        <fieldset>
            <legend>Modify Data</legend>
            SaleNumber: <input type="number" name="TransactionID"> <br>
            Item: <input type="text" name="ItemName"> <br>
            Quantity: <input type="number" name="Quantity"> <br>
            Date: <input type ="text" name="Date"> <br>
            Price: <input type = "number" name="Price"> <br>
        </fieldset>
        <input type = "submit">
    </form>




</body>
</html>
