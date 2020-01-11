<?php

// initialize application
include 'init.php';

function getDSNParts($dsn, $names) {
	$parts = [];
	foreach ($names as $name) {
		preg_match("/$name=(.+?)(;|\$)/", $dsn, $matches);
		$parts[] = @$matches[1];
	}
	return $parts;
}

function executeScript($script) {
	global $host, $dbname;

	$user    = DBUSERNAME;
	$pwd     = DBUSERPASSWORD;
	$command = "mysql -v --host=$host --user=$user --password='$pwd' --database=$dbname < '$script'";
	echo "Executing sql/$script:<pre>";
	system($command, $retval);
	if ($retval) throw new Exception('Script execution has failed.');
}

// read the database connection parameters
list($dbname, $host) = getDSNParts(DSN, ['dbname', 'host']);

if (!$dbname) throw new Exception('Could not get database from the DSN string.');
if (!$host) throw new Exception('Could not get host from the DSN string.');

// Create the database and insert data
executeScript(dirname(__DIR__) .'/sql/setup.sql');
