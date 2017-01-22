<?php
//验证这个用户是否有角色
//header("Content-Type:application/json");
$name=$_REQUEST['uName'];
$carId=$_REQUEST['carId'];
$output=[
	"hasRole"=>true,
	"message"=>''
];

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
	echo json_encode($output);;
}else{
	echo json_encode($output);
}

?>