<?php
	if(!defined('INCLUDE_CHECK')) die('Warning: You are not authorized to access this page.');

	$db_host		= 'localhost';
	$db_user		= 'root';
	$db_pass		= '';
	$db_database	= 'zaitoon'; 

	$link = mysql_connect($db_host, $db_user, $db_pass) or die('Database Connection Failed.');
	mysql_select_db($db_database, $link);
?>