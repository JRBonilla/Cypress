<?php
	echo '<script>console.log("In the php script")</script>';
	$myfile = fopen("js/reports.json", "w") or die("Unable to open file!");
	$txt = $_POST['newObj'];
	fwrite($myfile, $txt);
	fclose($myfile);
?>