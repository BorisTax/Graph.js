<?php
$file=$_REQUEST['lang'].'.json';
$lines=file($file);
$s='';
foreach($lines as $line) $s=$s.$line;
echo $s;

?>