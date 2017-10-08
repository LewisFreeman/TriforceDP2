<?php
$conn = mysqli_connect("localhost", "root", "", "PHPSRePS");
if(!$conn)
{
    echo"<p>Database Connection Failure</p>";
}
else
{
    if(isset($_POST["exportCSV"]))
    {
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename=data.csv');
        $output = fopen("php://output","w");
        fputcsv($output, array('TransactionID','ItemName','Quantity','Date','Price'));
        $query = "SELECT * from Records ORDER BY TransactionID";
        $result = mysqli_query($conn, $query);
        while($row = mysqli_fetch_assoc($result))
        {
            fputcsv($output,$row);
        }
        fclose($output);
    }
}
?>