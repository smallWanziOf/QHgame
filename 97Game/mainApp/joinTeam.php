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
	//查询当前用户的个人战力
	$sql_combat = "SELECT user_combat FROM qhgame_login WHERE user_name='$name'";
	$result_combat = mysqli_query($conn, $sql_combat);
	$row_combat = mysqli_fetch_assoc($result_combat);
	$userCombat=$row_combat["user_combat"];
	//查询当前人物的所有信息
	$sql_roleAllMessage="SELECT * FROM allrole WHERE roleid='$carid'";
	$result_roleAllMessage = mysqli_query($conn, $sql_roleAllMessage);
	$row_roleAllMessage = mysqli_fetch_assoc($result_roleAllMessage);
	$roleN = json_encode($row_roleAllMessage['rolename']);//人物姓名
	$roleA = $row_roleAllMessage['roleattack'];//人物攻击力
	$roleD = $row_roleAllMessage['roledefense'];//人物防御
	$roleL = $row_roleAllMessage['rolelife'];//人物生命
	$roleT = $row_roleAllMessage['tradeprice'];//人物交易价
	//设置人物初始战斗力
	$roleCombat = $roleA+$roleD+$roleL;
	$newUserCombat = $userCombat+$roleCombat;
	$sql_combat = "UPDATE qhgame_login  set user_combat='$newUserCombat' where user_name='$name'";
	mysqli_query($conn, $sql_combat);

	$resultId = $row["carid"];
	$parseCarId = explode(",",$resultId);
	$parseCarId[] = $carid;
	$stringCarId = implode(",",$parseCarId);

	//增加当前用户的人物的属性
	$addDatatoUserTab = "INSERT INTO user_$name VALUES (null,$carid,$roleN,$roleA,$roleD,$roleL,null,$roleT)";
	//$addDatatoUserTab = "INSERT INTO user_$name VALUES (null,$carid,0,0,0,0)";
	mysqli_query($conn, $addDatatoUserTab);

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