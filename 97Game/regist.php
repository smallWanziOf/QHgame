<?php

	$name=$_REQUEST['userName'];
	$pwd=$_REQUEST['userPwd'];

	$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
	mysqli_query($conn, 'SET NAMES UTF8');
	$exist="SELECT user_id FROM qhgame_login WHERE user_name='$name'";

	$resultExist = mysqli_query($conn, $exist);

	$row = mysqli_fetch_assoc($resultExist);

	if($row){
		echo "hasExist";
	}else{
		$sql = "INSERT INTO qhgame_login(user_name,user_pwd,user_power,user_money) VALUES ('$name','$pwd',100,888)";
		$resultSql = mysqli_query($conn, $sql);
		$sqlinster = "INSERT INTO user_sign(user_name) VALUES ('$name')";
		$resultinster = mysqli_query($conn, $sqlinster);
		//查询当前的主键值
		$keysql = "SELECT user_id FROM qhgame_login WHERE user_name='$name'";
		$resultkey = mysqli_query($conn, $keysql);
		$rowkey = mysqli_fetch_assoc($resultkey);
		$id= $rowkey["user_id"];
		//设置order
		$ordersql = "UPDATE qhgame_login SET user_order=$id WHERE user_name='$name'";
		$orderresult = mysqli_query($conn,$ordersql);
		if($resultSql&&$resultinster&&$orderresult){
			echo "success";
		}else{
			echo "error";
		}
	}
?>