<?php
//找出用户及增加他的碎片
$name=$_REQUEST['uName'];
$rolechip=$_REQUEST['rolechip'];

$output=[
	'randNum'=>'',
	'carid'=>''
];

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');

//获取当前用户的体力
$sqlPower = "SELECT user_power FROM qhgame_login WHERE user_name='$name'";
$resultPower = mysqli_query($conn,$sqlPower);
$rowPower = mysqli_fetch_assoc($resultPower);
if($rowPower['user_power']>2){
	$rowPower = $rowPower['user_power'] - 2;
}

//更新用户的体力
$sqlUpPower="UPDATE qhgame_login SET user_power=$rowPower WHERE user_name='$name'";
$resultUpPower = mysqli_query($conn, $sqlUpPower);

//查找当前用户对应人物的碎片
$sqlChip = "SELECT rolechip FROM user_$name WHERE roleid=$rolechip";
$resultChip = mysqli_query($conn, $sqlChip);
$rowChip = mysqli_fetch_assoc($resultChip);
$randNum=rand(0,2);
$output['randNum']=$randNum;
$output['carid']=$rolechip;
$rowChip=$rowChip['rolechip']+$randNum;

//更新当前用户的对应人物的碎片
$sql="UPDATE user_$name SET rolechip=$rowChip WHERE roleid=$rolechip";
$result = mysqli_query($conn, $sql);

if($result){
	echo json_encode($output);
}else{
	echo "error";
}
?>