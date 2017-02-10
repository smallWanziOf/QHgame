<?php
//验证这个用户是否有角色
//header("Content-Type:application/json");
$name=$_REQUEST['uName'];
$carid=$_REQUEST["carid"];

$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
mysqli_query($conn, 'SET NAMES UTF8');
$sql = "SELECT rolestory,roler,scalea,scaled,scalel FROM allrole WHERE roleid='$carid'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
if($row){
	echo json_encode($row);
}else{
	echo "error";
}

?>
