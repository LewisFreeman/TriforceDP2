<?php 
	date_default_timezone_set("Australia/Melbourne");

	//generates a random time addition value ( eg. + 1 month ) to add 
	//	to the current time
	function RandomTime() {
		$str = "+ " . rand(1, 5);

		switch((int)rand(0, 2)) {
			case 0:
				$str = $str." hour";
				break;
			case 1:
				$str = $str." week";
				break;
			case 2:
				$str = $str." month";
				break;
			default:
				echo "<p>ERROR: OUT OF RANGE</p>";
				exit();
		}

		return $str;
	}

	$db_con = new mysqli( "127.0.0.1", "root", "", "PHPSRePS");
	$tableItems = "items";
	$tableRecords = "salesRecords";

	$numRecords = 1;	
	$maxNumItems = 8;	//todo: get this automatically

	$maxQuantity = 10;

	for ($i = 0; $i  < $numRecords; $i++) {
		$itemNo = rand(1, $maxNumItems); 
		$itemQa = rand(1, $maxQuantity);

		$results = $db_con->query("SELECT * FROM $tableItems WHERE (itemId = '$itemNo')");

		if ($row = $results->fetch_assoc()) {
			$itemPri = (float)$row['itemPrice'] * $itemQa;
			$DT = RandomTime();
			$DT2 = date('Y-m-d H:i:s', strtotime("NOW $DT"));

			$results = $db_con->query("INSERT INTO $tableRecords (item, quantity, date, price) VALUES ('$itemNo', '$itemQa', CAST('". $DT2 ."' AS DATETIME), '$itemPri');");

			if ($db_con->errno) {
				printf("<p>ERROR INSERTING RESULTS: $db_con->errno $db_con->error</p>");
			}
		} else {
			printf( "<p>ERROR RETREIVING ITEM:  $db_con->errno $db_con->error</p>");
		}
	}
?>