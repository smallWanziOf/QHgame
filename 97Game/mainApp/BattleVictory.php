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
/*$sqlPower = "SELECT user_power FROM qhgame_login WHERE user_name='$name'";
$resultPower = mysqli_query($conn,$sqlPower);
$rowPower = mysqli_fetch_assoc($resultPower);
if($rowPower['user_power']>=2){
	$rowPower = $rowPower['user_power'] - 2;
}

//更新用户的体力
$sqlUpPower="UPDATE qhgame_login SET user_power=$rowPower WHERE user_name='$name'";
$resultUpPower = mysqli_query($conn, $sqlUpPower);*/

//查找当前用户对应人物的碎片
$sqlChip = "SELECT rolechip FROM all_user WHERE roleid='$rolechip' AND user_name='$name'";
$resultChip = mysqli_query($conn, $sqlChip);
$rowChip = mysqli_fetch_assoc($resultChip);
$randNumCon=rand(1,10);
if($randNumCon==8){
	$randNum=rand(1,2);
	$output['randNum']=$randNum;
	$output['carid']=$rolechip;
	$rowChip=$rowChip['rolechip']+$randNum;
}else{
	$output['randNum']=0;
	$output['carid']=0;
	$rowChip=$rowChip['rolechip'];
};


//更新当前用户的对应人物的碎片
$sql="UPDATE all_user SET rolechip=$rowChip WHERE roleid=$rolechip AND user_name='$name'";
$result = mysqli_query($conn, $sql);


echo json_encode($output);
?>