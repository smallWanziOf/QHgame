<?php
$name=$_REQUEST['uName'];
//找出所有章节的信息
$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');

$output=[
	"chapter"=>[],
	"userPower"=>[]
];

//获取所有章节
$sql = "SELECT * FROM allchapter";
$result = mysqli_query($conn,$sql);

//用户当前的体力
$sqlPower="SELECT user_power FROM qhgame_login WHERE user_name='$name'";
$resultPower = mysqli_query($conn, $sqlPower);
$rowPower = mysqli_fetch_assoc($resultPower);
$output['userPower']=$rowPower['user_power'];

while ($row = mysqli_fetch_assoc($result)){
	$output['chapter'][]=$row;
};
echo json_encode($output);
?>