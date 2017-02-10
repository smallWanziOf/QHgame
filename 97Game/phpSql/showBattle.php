<?php
//找出所有的用户及战力
//header("Content-Type:application/json");
$output=[];
$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');
//
$sql="SELECT user_name,user_combat,carid FROM qhgame_login order by user_combat";
$result = mysqli_query($conn, $sql);
//$row = mysqli_fetch_assoc($result);

while ($row = mysqli_fetch_assoc($result)){
	$output[]=$row;
};
echo json_encode($output);
?>