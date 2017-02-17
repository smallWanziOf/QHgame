<?php
//找出用户及增加他的碎片
$name=$_REQUEST['uName'];
$rolechip=$_REQUEST['rolechip'];
$chapter=$_REQUEST['currentC'];

$output=[
	'randNum'=>'',
	'carid'=>'',
	'randMoney'=>''
];

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');

//获取当前用户的体力
$sqlPower = "SELECT user_power FROM qhgame_login WHERE user_name='$name'";
$resultPower = mysqli_query($conn,$sqlPower);
$rowPower = mysqli_fetch_assoc($resultPower);
if($rowPower['user_power']>=10){
	$rowPower = $rowPower['user_power'] - 10;
}
//更新用户的体力
$sqlUpPower="UPDATE qhgame_login SET user_power=$rowPower WHERE user_name='$name'";
$resultUpPower = mysqli_query($conn, $sqlUpPower);

//更新当前用户所通关的关卡
$sqlUpChapter = "UPDATE qhgame_login SET user_chapter='$chapter' WHERE user_name='$name'";
$resultUpChapter = mysqli_query($conn, $sqlUpChapter);

//查找当前用户对应人物的碎片
$sqlChip = "SELECT rolechip FROM all_user WHERE roleid='$rolechip' AND user_name='$name'";
$resultChip = mysqli_query($conn, $sqlChip);
$rowChip = mysqli_fetch_assoc($resultChip);
$randNum=rand(1,5);
$output['randNum']=$randNum;
$output['carid']=$rolechip;
$rowChip=$rowChip['rolechip']+$randNum;

//更新当前用户的对应人物的碎片
$sql="UPDATE all_user SET rolechip=$rowChip WHERE roleid='$rolechip' AND user_name='$name'";
$result = mysqli_query($conn, $sql);

//查找当前用户对应人物的金币
$sqlMoney = "SELECT user_money FROM qhgame_login WHERE user_name='$name'";
$resultMoney = mysqli_query($conn, $sqlMoney);
$rowMoney = mysqli_fetch_assoc($resultMoney);
$randNumMoney=rand(5,10);
$output['randMoney']=$randNumMoney;
$rowMoney=$rowMoney['user_money']+$randNumMoney;

//更新当前用户的对应人物的金币
$sql="UPDATE qhgame_login SET user_money=$rowMoney WHERE user_name='$name'";
$result = mysqli_query($conn, $sql);


if($result){
	echo json_encode($output);
}else{
	echo "error";
}
?>