<?php
	$name=$_REQUEST['userName'];
	$pwd=$_REQUEST['userPwd'];
	$newname=$_REQUEST['newName'];

	$conn = mysqli_connect('127.0.0.1','root','','qhgame', 3306);
	mysqli_query($conn, 'SET NAMES UTF8');
	//查询是否有当前的人物
	$exist="SELECT user_id FROM qhgame_login WHERE user_name='$newname'";
	$resultExist = mysqli_query($conn, $exist);
	$rowExist = mysqli_fetch_assoc($resultExist);
	//查询密码是否正确
	$sqlpwd="SELECT user_pwd FROM qhgame_login WHERE user_name='$name'";
	$resultpwd = mysqli_query($conn, $sqlpwd);
	$rowpwd = mysqli_fetch_assoc($resultpwd);
	$oldpwd = $rowpwd['user_pwd'];
	//查询当前的用户金币
	$money="SELECT user_money FROM qhgame_login WHERE user_name='$name'";
	$resultmoney = mysqli_query($conn, $money);
	$rowmoney = mysqli_fetch_assoc($resultmoney);
	$oldmoney = $rowmoney['user_money'];

	if($rowExist){//用户名已经存在
		echo "hasExist";
	}else if($oldpwd!=$pwd){//用户名密码错误
		echo "errorpwd";
	}else if($oldmoney<500){//用户金额不足
		echo "nomoney";
	}else{//成功
		//更新当前用户的对应人物的金币
		$reducemoney = $oldmoney-500;
		$updamoney="UPDATE qhgame_login SET user_money=$reducemoney WHERE user_name='$name'";
		$resultmoney = mysqli_query($conn, $updamoney);
		if($resultmoney){
			//改变登录表的name
			$sql = "UPDATE qhgame_login SET user_name='$newname' WHERE user_name='$name'";
			$result1 = mysqli_query($conn, $sql);
			echo json_encode($result1);
			//改变所有表的name
			$sql = "UPDATE all_user SET user_name='$newname' WHERE user_name='$name'";
			$result2 = mysqli_query($conn, $sql);
			//改变签到表的name
			$sql = "UPDATE user_sign SET user_name='$newname' WHERE user_name='$name'";
			$result3 = mysqli_query($conn, $sql);
			if($result1&&$result2&&$result3){
				echo "success";
			}else{
				echo "error";
			}
		}else{
			echo "error";
		}

	}
?>