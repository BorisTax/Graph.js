<?php
$s="{";
foreach($_SERVER as $key=>$value) {
       $s=$s."\"".$key."\":"."\"".$value."\",";
}
$s=trim($s,",");
$s=$s."}";
echo $s;

?>