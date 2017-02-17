<?php
//验证这个用户是否有角色
//header("Content-Type:application/json");
$name=$_REQUEST['uName'];
$carId=$_REQUEST['carId'];

$output=[
	"hasRole"=>true,
	"message"=>''
];
//设置pk值的时候发现输入','号也可以,导致pk值全部清零程序紊乱！2017.2.11已修复
if($carId[0]===","){
	$output["hasRole"]=false;
};

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');

$sql = "SELECT carid FROM qhgame_login WHERE user_name='$name'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);

$strCarId=$row['carid'];

for($x=0;$x<count($carId);$x++){
	if(strpos($strCarId,$carId[$x]) === false){     //使用绝对等于
		$output["hasRole"]=false;
	}
}
if($output["hasRole"]!==false){
	//将选择出战的人物设置为迎战人物
	//先设置所有的pk值为0;
	$sqlpk0 = "UPDATE all_user SET pk=0 WHERE user_name='$name'";
	$resultpk0 = mysqli_query($conn,$sqlpk0);
	//设置本次出站的人物pk值为1
	for($i=0;$i<count($carId);$i++){
		$sqlpk1 = "UPDATE all_user SET pk=1 WHERE user_name='$name' AND roleid='$carId[$i]'";
		$resultpk1 = mysqli_query($conn,$sqlpk1);
	}
	echo json_encode($output);
}else{
	echo json_encode($output);
}

?>