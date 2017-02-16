<?php
//根据用户名找出所对应的用户的战斗力
//header("Content-Type:application/json");
$name=$_REQUEST['uName'];
//产生随机的人物碎片
$output=[
	'randNum'=>'',
	'carid'=>''
];

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');

//查询当前用户的人物
$sqlCar = "SELECT carid FROM qhgame_login WHERE user_name='$name'";
$resultCar = mysqli_query($conn, $sqlCar);
$rowCar = mysqli_fetch_assoc($resultCar);
$currentCar = $rowCar['carid'];
$carLength = count($currentCar);

//查询当前用户的金币
$sqlMoney = "SELECT user_money FROM qhgame_login WHERE user_name='$name'";
$resultMoney = mysqli_query($conn, $sqlMoney);
$rowMoney = mysqli_fetch_assoc($resultMoney);
$currentMoney = $rowMoney['user_money'];
if($currentMoney>=550&&$carLength!=0){
	$currentMoney-=550;
	//查找当前用户的所有的人物
	for($i=0;$i<10;$i++){
		$sqlRole = "SELECT carid FROM qhgame_login WHERE user_name='$name'";
		$resultRole = mysqli_query($conn, $sqlRole);
		$rowRole = mysqli_fetch_assoc($resultRole);
		$strs= $rowRole['carid'];
		//获取当前用户的所有人物
		$a = preg_match_all('/\d+/',$strs,$arr);
		$pos = $arr[0];
		$arrCount = count($pos);
		$intCount = (int)$arrCount;

		//产生随机的数字
		$randNums = rand(0,$intCount-1);
		$proNum = $pos[$randNums];

		//查找当前用户对应人物的碎片
		$sqlChip = "SELECT rolechip FROM user_$name WHERE roleid='$proNum'";
		$resultChip = mysqli_query($conn, $sqlChip);
		$rowChip = mysqli_fetch_assoc($resultChip);
		$randNum=rand(1,2);
		$output['randNum'][]=$randNum;
		$output['carid'][]=$proNum;
		$rowChip=$rowChip['rolechip']+$randNum;

		//更新当前用户的对应人物的碎片
		$sql="UPDATE user_$name SET rolechip=$rowChip WHERE roleid=$proNum";
		$result = mysqli_query($conn, $sql);

		//更新当前用户的金币
		$sql="UPDATE qhgame_login SET user_money=$currentMoney WHERE user_name='$name'";
		$result = mysqli_query($conn, $sql);
	}
	echo json_encode($output);
}else{
	if($carLength===0){
		echo "rolenum0";
	}else{
		echo "error";
	}
};
?>