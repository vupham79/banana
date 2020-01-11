<?php

namespace Bryntum\Gantt;

// 4hrs
ini_set('session.gc_maxlifetime', 14400);

if (!session_id()) {
    session_start();
}

$configs = [ dirname(__FILE__) .'/config.php' ];

// Attention the code is added for testing purposes only
// v - please get rid of this before using it on production
$config = @$argv[1] ? @$argv[1] : @$_REQUEST['config'];
if ($config) {
    array_unshift($configs, dirname(__FILE__) .'/'. basename($config));
}
// ^ - please get rid of this before using it on production

foreach ($configs as $config) {
    if (file_exists($config)) {
        require $config;
        break;
    }
}

function autoload($class)
{
    $file = dirname(__FILE__).'/'.str_replace('\\', '/', $class).'.php';
    if (file_exists($file)) {
        //echo "\n".$file;
        require_once $file;
    }
}

spl_autoload_register('Bryntum\Gantt\autoload');

$app = new Gantt(DSN, DBUSERNAME, DBUSERPASSWORD);
if (!$app) {
    die('{ success: false, error : "Database connecting error" }');
}

$afterinit = dirname(__FILE__) .'/after-init.php';

if (file_exists($afterinit)) {
    include $afterinit;
}
