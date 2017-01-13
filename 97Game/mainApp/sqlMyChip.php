<?php
//验证这个用户是否有角色
//header("Content-Type:application/json");
$name=$_REQUEST['uName'];

//用于保存查询的信息
$output=(object)array();

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');
//
$sql = "SELECT * FROM qhgame_login WHERE user_name='$name'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);


if($row){
	echo json_encode($row);
}else{
	echo "error";
}

?>