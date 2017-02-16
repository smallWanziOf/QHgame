<?php
//根据用户名找出所对应的用户的战斗力
//header("Content-Type:application/json");

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');
//查找所有被挑战者的队伍信息
$sql="SELECT * FROM allrole";
$result = mysqli_query($conn, $sql);

while ($row = mysqli_fetch_assoc($result)){
	$output[]=$row;
};

echo json_encode($output);
?>