<?php
//根据用户名找出所对应的用户的战斗力
//header("Content-Type:application/json");
$name=$_REQUEST['uName'];
$changeOBJ=$_REQUEST['changeOBJ'];
$output=[
	"challenger"=>[],
	"bechallenger"=>[]
];
$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');
//查找所有被挑战者的队伍信息
$sqlBeChallenger="SELECT * FROM all_user WHERE user_name='$changeOBJ'";
$resultBeChallenger = mysqli_query($conn, $sqlBeChallenger);
//查找所有挑战者的队伍信息
$sqlChallenger="SELECT * FROM all_user WHERE user_name='$name'";
$resultChallenger = mysqli_query($conn, $sqlChallenger);
//$row = mysqli_fetch_assoc($result);

while ($row = mysqli_fetch_assoc($resultBeChallenger)){
	$output['bechallenger'][]=$row;
};
while ($row = mysqli_fetch_assoc($resultChallenger)){
	$output['challenger'][]=$row;
};
echo json_encode($output);
?>