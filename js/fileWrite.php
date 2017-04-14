<?php
	$file = 'reports.json';
	$post_data = $_POST['info'];
	$json_data = json_decode($post_data, true);
	$json_formatted = json_encode($json_data, JSON_PRETTY_PRINT);
	file_put_contents($file, $json_formatted);
?>
