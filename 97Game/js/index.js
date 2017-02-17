      var timer=setInterval(function(){
        var n=Math.floor(Math.random()*6)
        var left=Math.floor(Math.random()*innerWidth);
        var height=window.innerHeight;
        $("#bg-randomS").append(
          "<img src='images/bg/shan"+n+".png' style='height:"+height+"px;left:"+left+"px'>"
        )
        $("#bg-randomS>img").fadeOut(1500,"linear",function(){
          $("#bg-randomS>img").remove()
        })
      },3000);

      //login
      $("#bg_login").click(function(){
        var userMessage={"userName":$("#inputName").val(),"userPwd":$("#inputPassword").val()}
        $.ajax({
          type:"POST",
          data:userMessage,
          url:"login.php",
          success:function(e){
            if(e=="success"){
              $("#user_name").val(userMessage["userName"]);
              $("#login_tip").html("<h3>登录成功！页面正在跳转中...</h3>");
              $("#main_Container").load(dev_location+"mainApp/selectRole.html");
              //window.location.href=dev_location+"mainApp/selectRole.html?UFO"+Math.ceil(Math.random()*520)+"_"+decToHex($("#inputName").val());
            }else{
              $("#login_tip").html("<div class='alert alert-danger' role='alert'>用户名或密码错误！</div>");
            }
          },
          error:function(error){
            alert("登录错误！请关闭重新连接")
          }
        })
      })

      //regist
      //注册账号
      $("#regist_acount").change(function(){
        var reg=/^[0-9a-zA-Z\u4e00-\u9fa5]{0,8}$/;
        if(!reg.test($(this).val())){
          $(this).val('');
          alert("账号格式错误！")
        }
      })
      //注册密码
      $("#regist_pwd").change(function(){
        var reg=/^[0-9a-zA-Z]{0,20}$/;
        if(!reg.test($(this).val())){
          $(this).val('');
          alert("密码格式错误！")
        }
      })
      //确定注册
      $("#regist_sure").click(function(){
        var acount=$.trim($("#regist_acount").val());
        var pwd=$.trim($("#regist_pwd").val());
        if(acount!=''&&pwd!=''){
          var userMessage={"userName":acount,"userPwd":pwd};
          $.ajax({
            type:"POST",
            data:userMessage,
            url:"regist.php",
            success:function(e){
              if(e=="hasExist"){
                $(".regist-message").html("用户名已被注册")
              }else if(e=="success"){
                $(".regist-message").html("注册成功！")
                //setTimeout(function(){
                  $("#regist_cancle").click()
                //},0);
                $("#inputName").val($("#regist_acount").val());
                $("#inputPassword").val($("#regist_pwd").val());
                $("#regist_acount").val('');
                $("#regist_pwd").val('');
              }else{
                $(".regist-message").html("注册失败！请重新注册")
              }
            },
            error:function(){
              alert("注册失败！请重新登录")
            }
          })
        }else{
          alert("注册格式有误！请重新填写")
        } 
      })
      //enter确认登录
      $("#inputPassword,#inputName").on("keydown",function(event){
        switch(event.keyCode) {
          case 13 : 
          $("#bg_login").trigger("click");
        }
      })
      //监听用户改变
      $("#user_name").change(function(){
        alert(1121)
      })