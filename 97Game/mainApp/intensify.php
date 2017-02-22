<?php
$name=$_REQUEST['uName'];
$roleid=$_REQUEST['roleid'];
//找出对应用户表的信息
$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');

//
$sql="SELECT * FROM all_user WHERE roleid='$roleid' AND user_name='$name'";
$result = mysqli_query($conn, $sql);
$row= mysqli_fetch_assoc($result);
//获取当前用户的碎片信息
$oldChip=$row['rolechip'];
//计算强化后的攻击
$oldAttack=floor($row['roleattack']*(1+$oldChip/100));
//计算强化后的防御
$oldDefense=floor($row['roledefense']*(1+$oldChip/100));
//计算强化后的生命
$oldLife=floor($row['rolelife']*(1+$oldChip/100));
//计算强化后的交易价
$oldPrice=floor($row['tradeprice']*(1+$oldChip/100));

//更新当前用户表的信息
$sql="UPDATE all_user SET roleattack=$oldAttack,roledefense=$oldDefense,rolelife=$oldLife,tradeprice=$oldPrice,rolechip=0 WHERE roleid='$roleid' AND user_name='$name'";
$result = mysqli_query($conn, $sql);

//查找当前用户表的所有战斗力
$sqlCombat = "SELECT roleattack,roledefense,rolelife FROM all_user WHERE user_name='$name'";
$resultCombat = mysqli_query($conn, $sqlCombat);
$combat=0;
while ($row = mysqli_fetch_assoc($resultCombat)){
	$combat+=$row['roleattack']+$row['roledefense']+$row['rolelife'];
};
//更新当前主表用户的战斗力
$sql = "UPDATE qhgame_login SET user_combat=$combat WHERE user_name='$name'";
$result = mysqli_query($conn, $sql);

if($result){
	echo "success";
}else{
	echo "error";
}
//用户当前的体力
/*$sqlPower="SELECT user_power FROM qhgame_login WHERE user_name='$name'";
$resultPower = mysqli_query($conn, $sqlPower);
$rowPower = mysqli_fetch_assoc($resultPower);
$output['userPower']=$rowPower['user_power'];

while ($row = mysqli_fetch_assoc($result)){
	$output['chapter'][]=$row;
};*/
//echo json_encode($output);
?>