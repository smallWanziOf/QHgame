<?php
//找出用户及增加他的碎片
$name=$_REQUEST['uName'];

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');

//获取当前用户的体力
$sqlPower = "SELECT user_power FROM qhgame_login WHERE user_name='$name'";
$resultPower = mysqli_query($conn,$sqlPower);
$rowPower = mysqli_fetch_assoc($resultPower);
if($rowPower['user_power']>0){
	$rowPower = $rowPower['user_power'];
}else{
	$rowPower=0;
};

//更新用户的体力
$sqlUpPower="UPDATE qhgame_login SET user_power=$rowPower WHERE user_name='$name'";
$resultUpPower = mysqli_query($conn, $sqlUpPower);

if($resultUpPower){
	echo "success";
}else{
	echo "error";
}
?>