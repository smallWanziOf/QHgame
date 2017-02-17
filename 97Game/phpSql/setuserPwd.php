<?php
	$name=$_REQUEST['userName'];
	$oldpwd=$_REQUEST['oldpwd'];
	$newpwd=$_REQUEST['newpwd'];

	$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
	mysqli_query($conn, 'SET NAMES UTF8');
	//查询是否有当前的人物
	$exist="SELECT user_id FROM qhgame_login WHERE user_name='$name'";
	$resultExist = mysqli_query($conn, $exist);
	$rowExist = mysqli_fetch_assoc($resultExist);
	//查询密码是否正确
	$sqlpwd="SELECT user_pwd FROM qhgame_login WHERE user_name='$name'";
	$resultpwd = mysqli_query($conn, $sqlpwd);
	$rowpwd = mysqli_fetch_assoc($resultpwd);
	$sqlpwd = $rowpwd['user_pwd'];

	if(!$rowExist){//当前用户不存在
		echo "nouser";
	}else if($oldpwd!=$sqlpwd){//用户名密码错误
		echo "errorpwd";
	}else{//成功
		//修改密码
		$sql = "UPDATE qhgame_login SET user_pwd=$newpwd WHERE user_name='$name'";
		$result = mysqli_query($conn, $sql);
		if($result){
			echo "success";
		}else{
			echo "error";
		}
	}
?>