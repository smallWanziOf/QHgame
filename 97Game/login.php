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
	mysqli_select_db($conn,"qhgame");
	$createTab = "CREATE TABLE user_$name (id int(11) PRIMARY KEY AUTO_INCREMENT,roleid int(20),rolename varchar(200),roleattack int(200),roledefense int(200),rolelife int(200),rolechip int(200),tradeprice int(200))";
	mysqli_query($conn,$createTab);
	echo "success";
}else{
	echo "error";
}

?>