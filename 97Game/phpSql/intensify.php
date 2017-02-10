<?php
$name=$_REQUEST['uName'];
$roleid=$_REQUEST['roleid'];
$chipnum = $_REQUEST['chipnum'];
$output=[];
//找出对应用户表的信息
$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');

//获取当前用户对应英雄的碎片数量
$sql="SELECT * FROM all_user WHERE roleid='$roleid' AND user_name='$name'";
$result = mysqli_query($conn, $sql);
$row= mysqli_fetch_assoc($result);
//获取当前用户的碎片信息
$oldChip=$row['rolechip'];
if((int)$oldChip>=(int)$chipnum&&(int)$chipnum>0){
	//查询当前英雄的成长属性
	$sqlscale="SELECT * FROM allrole WHERE roleid='$roleid'";
	$resultscale = mysqli_query($conn,$sqlscale);
	$rowscale= mysqli_fetch_assoc($resultscale);
	$scalea = $rowscale['scalea'];//攻击力系数
	$scaled = $rowscale['scaled'];//防御力系数
	$scalel = $rowscale['scalel'];//生命值系数
	//计算强化后的攻击
	$oldAttack=floor($row['roleattack']+($row['roleattack']/10*$chipnum*$scalea));
	$output['attack']=(int)($row['roleattack']/10*$chipnum*$scalea);
	//计算强化后的防御
	$oldDefense=floor($row['roledefense']+($row['roledefense']/10*$chipnum*$scaled));
	$output['defense']=(int)($row['roledefense']/10*$chipnum*$scaled);
	//计算强化后的生命
	$oldLife=floor($row['rolelife']+($row['rolelife']/10*$chipnum*$scalel));
	$output['life']=(int)($row['rolelife']/10*$chipnum*$scalel);
	//计算强化后的交易价
	$oldPrice=floor($row['tradeprice']*(1+$chipnum/100));
	//计算剩余的碎片
	$chipnow = (int)$oldChip-(int)$chipnum;
	//更新当前用户表的信息
	$sql="UPDATE all_user SET roleattack=$oldAttack,roledefense=$oldDefense,rolelife=$oldLife,tradeprice=$oldPrice,rolechip=$chipnow WHERE roleid='$roleid' AND user_name='$name'";
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
	//返回剩余的数量
	$output['chipnow']=(int)$chipnow;
	$output['roleid']=$roleid;
	echo json_encode($output);
}else{
	echo "error";
};

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