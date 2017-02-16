<?php
//找出用户及增加他的碎片
$name=$_REQUEST['uName'];

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');


//查找当前用户对应人物的碎片
$sqlChip = "SELECT * FROM user_$name";
$resultChip = mysqli_query($conn, $sqlChip);
while ($row = mysqli_fetch_assoc($resultChip)){
	$output[]=$row;
};

echo json_encode($output);

?>