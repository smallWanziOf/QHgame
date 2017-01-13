<?php
//验证这个用户是否有角色
//header("Content-Type:application/json");
$name=$_REQUEST['uName'];
$carid=$_REQUEST["carid"];

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');
//查询当前用户拥有的角色id
$sql = "SELECT carid FROM qhgame_login WHERE user_name='$name'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

//查询当前用户的个人金币
$sql_userMoney = "SELECT user_money FROM qhgame_login WHERE user_name='$name'";
$result_userMoney = mysqli_query($conn, $sql_userMoney);
$row_userMoney = mysqli_fetch_assoc($result_userMoney);
$userMoney=$row_userMoney["user_money"];

//查询当前人物的交易价格
$sql_roleTradePrice = "SELECT tradeprice FROM allrole WHERE roleid='$carid'";
$result_roleTradePrice = mysqli_query($conn, $sql_roleTradePrice);
$row_roleTradePrice = mysqli_fetch_assoc($result_roleTradePrice);
$rolePrice=$row_roleTradePrice["tradeprice"];

//如果用户金币大于或等于角色就可以购买
if($userMoney>=$rolePrice){
	$resultId = $row["carid"];
	$parseCarId = explode(",",$resultId);
	$parseCarId[] = $carid;
	$stringCarId = implode(",",$parseCarId);

	//扣除用户的金币
	$currentPrice=$userMoney-$rolePrice;
	$sql_deductUserMoney= "UPDATE qhgame_login  set user_money='$currentPrice' where user_name='$name'";
	$result_deductUserMoney = mysqli_query($conn, $sql_deductUserMoney);

	//更新用户的拥有的人物的id
	$sql = "UPDATE qhgame_login  set carid='$stringCarId' where user_name='$name'";
	$result = mysqli_query($conn, $sql);

	if($result){
		echo "success";
	}else{
		echo "error";
	}
}else if($userMoney<$rolePrice){
	echo "NoMoeny";
}else{
	echo "error";
}



?>