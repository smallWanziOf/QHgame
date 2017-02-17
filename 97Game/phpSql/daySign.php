<?php
//验证这个用户是否有角色
$name=$_REQUEST['uName'];
$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');

$sql = "SELECT sign_date FROM user_sign WHERE user_name='$name'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
//数据库保存的时间
$savetime=$row['sign_date'];
//当前的签到时间

$sqlsign = "SELECT current_date as Systemtime;";
$resultsign = mysqli_query($conn, $sqlsign);
$rowsign = mysqli_fetch_assoc($resultsign);
$currenttime = $rowsign['Systemtime'];
if($savetime===$currenttime){
	echo "equal";
}else{
	$sqlinster = "UPDATE user_sign SET sign_date=current_date WHERE user_name='$name'";
	$resultinster = mysqli_query($conn, $sqlinster);
	$sqlpower = "UPDATE qhgame_login SET user_power=100 WHERE user_name='$name'";
	$resultpower = mysqli_query($conn, $sqlpower);
	//查找当前用户对应人物的金币
	$sqlMoney = "SELECT user_money FROM qhgame_login WHERE user_name='$name'";
	$resultMoney = mysqli_query($conn, $sqlMoney);
	$rowMoney = mysqli_fetch_assoc($resultMoney);
	$rowMoney=$rowMoney['user_money']+50;

	//更新当前用户的对应人物的金币
	$sqlm="UPDATE qhgame_login SET user_money=$rowMoney WHERE user_name='$name'";
	$resultm = mysqli_query($conn, $sqlm);
	if($resultinster&&$resultpower&&$resultm){
		echo "success";
	}else{
		echo "error";
	};
}
?>