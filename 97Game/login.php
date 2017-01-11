<?php

//header("Content-Type:application/json");

$name=$_REQUEST['userName'];
$pwd=$_REQUEST['userPwd'];

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');
$sql = "SELECT user_id FROM qhgame_login WHERE user_name='$name' AND user_pwd='$pwd'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
if($row){
	echo "success";
}else{
	echo "error";
}

?>