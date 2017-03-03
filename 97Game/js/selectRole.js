      var data={"uName":$("#user_name").val()};
      var hasCarId=[];
      //隐藏用户已有的人物
      $(document).ready(function(){
        if(data["uName"]!=''){
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/selectRole.php",
            success:function(e){
              var carId=JSON.parse(e);
              if(carId.carid!=null){
                var allId=carId.carid.split(",");
                hasCarId=allId;
                if(hasCarId.length==1){
                  $("#no_role").modal();
                  return;
                }
                $.ajax({
                  type:"POST",
                  data:data,
                  url :"phpSql/showAllRole.php",
                  success:function(e){
                    var data=JSON.parse(e);
                    var str='';
                    for(var i=0;i<data.length;i++){
                      if($.inArray(data[i].id,allId)==-1&&data[i].tradeprice<=6300){
                        str+='<div class="col-sm-6 col-md-4 hasParent" id='+data[i].roleid+'>'+
                              '<div class="thumbnail outCarImg">'+
                                '<img src="images/showAllRole/'+data[i].roleid+'.jpg" class="img-responsive CarImg">'+
                                '<div class="caption RoleImg">'+
                                  '<h3 style="color:#fff;">'+data[i].rolename+'</h3>'+
                                  '<p>'+
                                    '<h5 style="color:#fff;">攻击：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].roleattack+'%">'+data[i].roleattack+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">防御：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].roledefense+'%">'+data[i].roledefense+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">生命值：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].rolelife/10+'%">'+data[i].rolelife+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">交易价：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"  style="min-width: 2em;width:'
                                    +data[i].tradeprice/100+'%">'+data[i].tradeprice+'</div></div>'+
                                    '</h5>'+
                                  '</p>'+
                                  '<p>'+
                                    '<a href="#" class="btn btn-primary Join_Team" role="button" >加入队伍</a>'+ 
                             		'<a href="#" class="btn btn-danger Look_Role" role="button" style="margin-left:20px;">查看属性</a>'+ 
                                  '</p>'+
                                '</div>'+
                              '</div>'+
                            '</div>'
                      }
                    }
                    $(".allRoleContainer").html(str)
                    $(".progress-bar").hover(function(){
                    	$(this).addClass("active")
                    },function(){
                    	$(this).removeClass("active")
                    })
                    /*翻拍效果*/
                    $(".allRoleContainer").on("mouseover",".CarImg",function(){
                        $(this).addClass("imgHover");
                        $(this).next('div').addClass("rotateImg");
                        $(this).css("opacity","0");
                    })
                    $("body").on("mouseover",function(e){
                        if(e.target.nodeName=="BODY"){
                        	$(".CarImg").removeClass("imgHover");
                            $(".RoleImg").removeClass("rotateImg");
                            $(".CarImg").css("opacity","1")
                        }              
                    })
                  },
                  error:function(e){
                    alert("程序出错请重试！")
                  }
                })
              }else{
                $("#P_book").trigger("click");
                $.ajax({
                  type:"POST",
                  data:data,
                  url :"phpSql/showAllRole.php",
                  success:function(e){
                    var data=JSON.parse(e);
                    var str='';
                    for(var i=0;i<data.length;i++){
                      if(data[i].tradeprice<=6300){
                        str+='<div class="col-sm-6 col-md-4 hasParent" id='+data[i].roleid+'>'+
                              '<div class="thumbnail outCarImg">'+
                                '<img src="images/showAllRole/'+data[i].roleid+'.jpg" class="img-responsive CarImg">'+
                                '<div class="caption RoleImg">'+
                                  '<h3 style="color:#fff;">'+data[i].rolename+'</h3>'+
                                  '<p>'+
                                    '<h5 style="color:#fff;">攻击：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"  style="width:'
                                    +data[i].roleattack+'%">'+data[i].roleattack+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">防御：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"  style="width:'
                                    +data[i].roledefense+'%">'+data[i].roledefense+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">生命值：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"  style="width:'
                                    +data[i].rolelife/10+'%">'+data[i].rolelife+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">交易价：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"  style="min-width: 2em;width:'
                                    +data[i].tradeprice/100+'%">'+data[i].tradeprice+'</div></div>'+
                                    '</h5>'+
                                  '</p>'+
                                  '<p>'+
                                    '<a href="#" class="btn btn-primary Join_Team" role="button" >加入队伍</a>'+ 
                            		'<a href="#" class="btn btn-danger Look_Role" role="button" style="margin-left:20px;">查看属性</a>'+
                                  '</p>'+
                                '</div>'+
                              '</div>'+
                            '</div>'
                      }
                    }
                    $(".allRoleContainer").html(str)
                    /*增加条形动画*/
                    $(".progress-bar").hover(function(){
                      $(this).addClass("active")
                    },function(){
                      $(this).removeClass("active")
                    })
					          /*翻拍效果*/
                    $(".allRoleContainer").on("mouseover",".CarImg",function(){
                        $(this).addClass("imgHover");
                        $(this).next('div').addClass("rotateImg");
                        $(this).css("opacity","0");
                    })
                    $("body").on("mouseover",function(e){
                        if(e.target.nodeName=="BODY"){
                        	$(".CarImg").removeClass("imgHover");
                            $(".RoleImg").removeClass("rotateImg");
                            $(".CarImg").css("opacity","1")
                        }              
                    })
                  },
                  error:function(e){
                    alert("程序出错请重试！")
                  }
                })
                $("#no_role").modal();
              }
            },
            error:function(){
              alert("查询失败！请重新加入")
            }
          })
        }else{
          alert("登录跳转失败！请重新登录")
          window.location.href=dev_location;
        }  
      });
      //点击加入队伍按钮
      $(".allRoleContainer").on("click",".Join_Team",function(e){
        e.preventDefault();
        JoinTeam.bind(this)();
      })
      //点击查看属性按钮
      $(".allRoleContainer").on("click",".Look_Role",function(e){
        e.preventDefault();
        LookRole.bind(this)();
      })
      function JoinTeam(){
        var me=this;
        var joinCarId=$(this).parents(".hasParent")[0].id;
        if($.inArray(joinCarId,hasCarId)!=-1){
          alert("你已经拥有此人物，请不要重复添加")
        }else{
          var carid={"uName":data["uName"],"carid":joinCarId};
          $.ajax({
            type:"POST",
            data:carid,
            url :"phpSql/joinTeam.php",
            success:function(e){
              if(e=="success"){
                var str="<h1 style='color:#fff;margin:20px auto;text-align:center;'>恭喜获得</h1>"
                str+="<img src='images/showAllRole/"+carid['carid']+".jpg'>";
                $("#buy_success").html(str)
                /*防止用户点击多次重复购买*/
                $(me).addClass("disabled");
                $("#buy_success img").animate({ 
                    width: "100%",
                    height: "90%",
                    left:"+50px"
                }, 1000 );
                $("#buy_success img").animate({ 
                    left:"0px"
                }, 1000 );
                $('#myModal').modal()
              }else if(e=="NoMoeny"){
                alert("您的账户余额不足购买此人物")
              }else{
                alert("购买失败！")
              }
            },
            error:function(){
              alert("查询失败！请重新加入")
            }
          })
        }
      }
      function LookRole(){
        var me=this;
        var lookCarId=$(this).parents(".hasParent")[0].id;
        var carid={"uName":data["uName"],"carid":lookCarId};
        $.ajax({
            type:"POST",
            data:carid,
            url :"phpSql/lookRole.php",
            success:function(e){
                var data = JSON.parse(e);
                var str="<h1 style='color:#fff;margin:20px auto;text-align:center;'>人物介绍</h1>"
                str+="<img src='images/showAllRole/"+carid['carid']+".jpg' style='float:left;margin-right:10px;'>";
                str+="<div style='color:#fff;'><h3 style='color:aqua;'>人物故事</h3>"+data.rolestory+"<h3 style='color:aqua;'>人物技能</h3>"+data.roler+
                "<h3 style='color:aqua;'>成长属性</h3><p>攻击："+data.scalea+"</p><p>防御："+data.scaled+"</p><p>生命："+data.scalel+"</p></div>"
                $("#lookRole_Dal").html(str);
                $('#lookRoleDal').modal()
                $(".modal-backdrop.in").css("opacity","0.8")
            },
            error:function(){
              alert("查询失败！请重新加入")
            }
        })
      }
      //hover左边导航进行提示的信息
/*      $('#P_message').tooltip();
      $('#P_team').tooltip();
      $('#P_chip').tooltip();
      $('#P_gem').tooltip();
      $('#P_battle').tooltip();
      $('#P_index').tooltip();
      $('#P_gift').tooltip();
      $('#P_refresh').tooltip();
      $('#P_sunglasses').tooltip();
      $('#P_book').tooltip();
      $('#P_donate').tooltip();*/

      //点击导航展示详细的信息
      $("#P_message").click(function(){//个人信息
        $("#show_userMessage").modal();
        if(data["uName"]!=''){
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/sqlUserMessage.php",
            success:function(e){
              var allMessage=JSON.parse(e);
              if(allMessage.carid==null){
                $("#sql_Team").html();
              }else{
                var length=allMessage.carid.split(",").length;
                $("#sql_Team").html(parseInt(length)-1);
              }
              $("#sql_name").html(data.uName);
              $("#sql_V").html(allMessage.user_v);
              $("#sql_power").html(allMessage.user_power);
              $("#sql_acount").html(allMessage.user_money);
              $("#sql_title").html(allMessage.user_title);
              $("#sql_combat").html(allMessage.user_combat);
            },
            error:function(){
              alert("查询失败！请重新查询")
            }
          })
        }else{
          alert("登录跳转失败！请重新登录")
          window.location.href=dev_location;
        }  
      })
      $("#P_team").click(function(){//个人队伍
        $("#show_userTeam").modal();
        var str='';
        if(data["uName"]!=''){
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/selectRole.php",
            success:function(e){
              var carId=JSON.parse(e);
              if(carId.carid!=null){
                var allId=carId.carid.split(",");
              }else{
                $("#all_userTeam").html("<img src='images/other/nochip01.jpg style='box-shadow:0 0 0''><h3>您当前还未添加任何人物...</h3>")
                return;
              }
              
              hasCarId=allId;
              if(allId.length==1){
                $("#all_userTeam").html("<img src='images/other/nochip01.jpg style='box-shadow:0 0 0''><h3>您当前还未添加任何人物...</h3>")
                return;
              }
              if(allId!=null){
                $.ajax({
                  type:"POST",
                  data:{"uName":data["uName"],"carId":allId},
                  url :"phpSql/showCurrentRole.php",
                  success:function(e){
                    var data=JSON.parse(e);
                    var roleData;
                    for(var i=0;i<allId.length;i++){
                      if(i!=0){
                        for(var k=0;k<data.length;k++){
                          if(data[k]['roleid']==allId[i]){
                            roleData=data[k];
                            break;
                          }
                        }
                        str+="<div class='col-sm-6 col-md-4'>"+
                                "<div class='thumbnail'>"+
                                  "<img src='images/showRole/"+allId[i]+".png'/>"+
                                  "<div class='caption' style='text-align:center;'>"+
                                    "<p>攻击力："+roleData.roleattack+"</p>"+
                                    "<p>防御力："+roleData.roledefense+"</p>"+
                                    "<p>生命值："+roleData.rolelife+"</p>"+
                                  "</div>"+
                                "</div>"+
                              "</div>"
                      }
                    }
                    $("#all_userTeam").html("<h3>我的队伍信息</h3>"+str)
                  },
                  error:function(){
                    alert("查询失败！请重新查询")
                  }
                })
              }
            },
            error:function(){
              alert("查询失败！请重新查询")
            }
          })
        }else{
          alert("登录跳转失败！请重新登录")
          window.location.href=dev_location;
        }  
      })
      $("#P_chip").click(function(){//个人碎片
        $("#show_userChip").modal();
        if(data["uName"]!=''){
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/sqlMyChip.php",
            success:function(e){
              var sqlMyChip=JSON.parse(e);
              var allChip=sqlMyChip.message;//保存碎片的信息
              var str='';//保存展示的碎片的图片
              var objisNUll=true;
              for(var i=0;i<allChip.length;i++){
                if(allChip[i].rolechip!=null&&allChip[i].rolechip!=0){
                    objisNUll=false;
                    str+="<div class='col-sm-6 col-md-4 showImg-parent' style='margin:0px'>"+
                          "<div class='thumbnail'>"+
                            "<img src='images/showRole/"+allChip[i].roleid+".png'>"+
                            "<div class='caption'>"+
                              "<h5>碎片数量：<span id='"+allChip[i].roleid+"'>"+allChip[i].rolechip+"</span></h5>"+
                              "<p class='input-group'>"+
                              "<span class='input-group-btn'>"+
                              "<button class='btn btn-primary intensify' type='button'>强化</button>"+
                              "</span>"+
                              "<input type='text' class='form-control intensify-num' placeholder='0'/></p>"+
                            "</div>"+
                          "</div>"+
                          "</div>"
                }
              }
              if(objisNUll){
                str="<div class='jumbotron' style='margin-bottom:0'>"+
                        "<img src='images/other/nochip01.jpg' style='box-shadow:0 0 0'>"+
                        "<h3>您目前还未获得任何碎片</h3>"+
                      "</div>"
                $("#sql_showAllChip").html(str);
              }else{
                $("#sql_showAllChip").html("<h3>我的碎片信息</h3>"+str);
              }
              $(".intensify").on("click",function(e){
                var roleId=$(this).parents(".input-group").siblings("h5").children()[0].id;
                var chipNum=parseInt($(this).parent().siblings(".intensify-num").val());
                var currentnum=parseInt($(this).parents(".input-group").siblings("h5").children()[0].innerHTML);
                var data={"uName":$("#user_name").val(),"roleid":roleId,"chipnum":chipNum};
                var me=this;
                $("#sql_show_int").html('');
                if(chipNum>currentnum||isNaN(chipNum)||chipNum<0){
                  $(this).parent().siblings(".intensify-num").val(currentnum);
                  return;
                }else{
                  $.ajax({
                    type:"POST",
                    data:data,
                    url :"phpSql/intensify.php",
                    success:function(e){
                      if(e=="error"){
                        debugger;
                        $("#show_int").modal();
                        var str="<h3>强化失败!</h3>"
                        str+="<div>"+
                                "<div>"+
                                  "<img src='images/showRole/"+roleId+".png'/>"+
                                  "<div class='caption' style='text-align:center;'>"+
                                    "<p>当前人物碎片不足</p>"+
                                  "</div>"+
                                "</div>"+
                              "</div>"
                        $("#sql_show_int").html(str);    
                      }else{
                        var data=JSON.parse(e);
                        if(e=="0"){
                          $(me).parents(".showImg-parent").remove();
                        }else{
                          $(me).parents(".input-group").siblings("h5").children()[0].innerHTML=data.chipnow;
                        }
                        $("#show_int").modal();
                        var str="<h3>强化成功!</h3>"
                        str+="<div>"+
                                "<div>"+
                                  "<img src='images/showRole/"+data.roleid+".png'/>"+
                                  "<div class='caption' style='text-align:center;'>"+
                                    "<p>攻击力：+"+data.attack+"</p>"+
                                    "<p>防御力：+"+data.defense+"</p>"+
                                    "<p>生命值：+"+data.life+"</p>"+
                                  "</div>"+
                                "</div>"+
                              "</div>"
                        $("#sql_show_int").html(str);
                      }
                    },
                    error:function(e){
                      alert("出错请重试！");
                    }
                  })
                }
              })
            },
            error:function(){
              alert("查询失败！请重新查询")
            }
          })
        }else{
          alert("登录跳转失败！请重新登录")
          window.location.href=dev_location;
        }  
      })
      $("#P_gem").click(function(){//个人金币
        $("#show_userGem").modal();
        if(data["uName"]!=''){
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/sqlUserMessage.php",
            success:function(e){
              var sqlMyMoney=JSON.parse(e);
              if(sqlMyMoney.user_money!=null){
                $("#sql_showAllMoney").html(sqlMyMoney.user_money);
              }else{
                 $("#sql_showAllMoney").html(0);
              }
              
            },
            error:function(){
              alert("查询失败！请重新查询")
            }
          })
        }else{
          alert("登录跳转失败！请重新登录")
          window.location.href=dev_location;
        }  
      });
      $("#P_battle").click(function(){//进入选择战斗模式
        $("#main_Container").load(dev_location+"mainApp/selectModal.html");
        //window.location.href=dev_location+"mainApp/selectModal.html?UFO"+Math.ceil(Math.random()*520)+'_'+decToHex(uName);
      })
      $('#P_index').click(function(){//返回登录页
        window.location.href=dev_location;
      })
      $('#P_gift').click(function(){//登录神秘商店
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/selectRole.php",
            success:function(e){
              var carId=JSON.parse(e);
              if(carId.carid!=null){
                var allId=carId.carid.split(",");
                hasCarId=allId;
                if(hasCarId.length==1){
                  $("#no_role").modal();
                  return;
                }
                $.ajax({
                  type:"POST",
                  data:data,
                  url :"phpSql/showAllRole.php",
                  success:function(e){
                    var data=JSON.parse(e);
                    var str='';
                    for(var i=0;i<data.length;i++){
                      if($.inArray(data[i].id,allId)==-1&&data[i].tradeprice>6300){
                        str+='<div class="col-sm-6 col-md-4 hasParent" id='+data[i].roleid+'>'+
                              '<div class="thumbnail outCarImg">'+
                                '<img src="images/showAllRole/'+data[i].roleid+'.jpg" class="img-responsive CarImg">'+
                                '<div class="caption RoleImg">'+
                                  '<h3 style="color:#fff;">'+data[i].rolename+'</h3>'+
                                  '<p>'+
                                    '<h5 style="color:#fff;">攻击：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].roleattack+'%">'+data[i].roleattack+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">防御：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].roledefense+'%">'+data[i].roledefense+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">生命值：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].rolelife/10+'%">'+data[i].rolelife+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">交易价：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].tradeprice/100+'%">'+data[i].tradeprice+'</div></div>'+
                                    '</h5>'+
                                  '</p>'+
                                  '<p>'+
                                    '<a href="#" class="btn btn-primary Join_Team" role="button" >加入队伍</a>'+ 
                           		    '<a href="#" class="btn btn-danger Look_Role" role="button" style="margin-left:20px;">查看属性</a>'+
                                  '</p>'+
                                '</div>'+
                              '</div>'+
                            '</div>'
                      }
                    }
                    $(".allRoleContainer").html(str);
                    /*增加条形动画*/
                    $(".progress-bar").hover(function(){
                      $(this).addClass("active")
                    },function(){
                      $(this).removeClass("active")
                    })
                     /*翻拍效果*/
                    $(".allRoleContainer").on("mouseover",".CarImg",function(){
                        $(this).addClass("imgHover");
                        $(this).next('div').addClass("rotateImg");
                        $(this).css("opacity","0");
                    })
                    $("body").on("mouseover",function(e){
                        if(e.target.nodeName=="BODY"){
                        	$(".CarImg").removeClass("imgHover");
                            $(".RoleImg").removeClass("rotateImg");
                            $(".CarImg").css("opacity","1")
                        }              
                    })
                  },
                  error:function(e){
                    alert("程序出错请重试！")
                  }
                })
              }else{
                $.ajax({
                  type:"POST",
                  data:data,
                  url :"phpSql/showAllRole.php",
                  success:function(e){
                    var data=JSON.parse(e);
                    var str='';
                    for(var i=0;i<data.length;i++){
                      if(data[i].tradeprice>6300){
                        str+='<div class="col-sm-6 col-md-4 hasParent" id='+data[i].roleid+'>'+
                              '<div class="thumbnail outCarImg">'+
                                '<img src="images/showAllRole/'+data[i].roleid+'.jpg" class="img-responsive CarImg">'+
                                '<div class="caption RoleImg">'+
                                  '<h3 style="color:#fff;">'+data[i].rolename+'</h3>'+
                                  '<p>'+
                                    '<h5 style="color:#fff;">攻击：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-success progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].roleattack+'%">'+data[i].roleattack+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">防御：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].roledefense+'%">'+data[i].roledefense+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">生命值：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-danger progress-bar-striped" role="progressbar"  style="max-width:100%;width:'
                                    +data[i].rolelife/10+'%">'+data[i].rolelife+'</div></div>'+
                                    '</h5>'+
                                    '<h5 style="color:#fff;">交易价：'+
                                    '<div class="progress" >'+
                                    '<div class="progress-bar progress-bar-warning progress-bar-striped" role="progressbar"  style="min-width: 2em;width:'
                                    +data[i].tradeprice/100+'%">'+data[i].tradeprice+'</div></div>'+
                                    '</h5>'+
                                  '</p>'+
                                  '<p>'+
                                    '<a href="#" class="btn btn-primary Join_Team" role="button" >加入队伍</a>'+ 
                            		'<a href="#" class="btn btn-danger Look_Role" role="button" style="margin-left:20px;">查看属性</a>'+
                                  '</p>'+
                                '</div>'+
                              '</div>'+
                            '</div>'
                      }
                    }
                    $(".allRoleContainer").html(str);
                     /*增加条形动画*/
                    $(".progress-bar").hover(function(){
                      $(this).addClass("active")
                    },function(){
                      $(this).removeClass("active")
                    })
                     /*翻拍效果*/
                    $(".allRoleContainer").on("mouseover",".CarImg",function(){
                        $(this).addClass("imgHover");
                        $(this).next('div').addClass("rotateImg");
                        $(this).css("opacity","0");
                    })
                    $("body").on("mouseover",function(e){
                        if(e.target.nodeName=="BODY"){
                        	$(".CarImg").removeClass("imgHover");
                            $(".RoleImg").removeClass("rotateImg");
                            $(".CarImg").css("opacity","1")
                        }              
                    })
                  },
                  error:function(e){
                    alert("程序出错请重试！")
                  }
                })
                $("#no_role").modal();
              }
            },
            error:function(){
              alert("查询失败！请重新加入")
            }
          })
      })
      $('#P_refresh').click(function(){//刷新页面
        $("#main_Container").load(dev_location+"mainApp/selectRole.html");
      })
      $('#P_sunglasses').click(function(){//进入抽奖
        $("#show_lottery").modal();

      })
        /*点击一次抽一次*/
        $("#lottery1").click(function(){
          if($(".html-Append").length>0){
            $(".html-Append").remove();
          }
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/lottery1.php",
            success:function(e){
              if(e=="error"){
                alert("当前用户余额不足本次抽奖！");
                return;
              }else if(e=="rolenum0"){
                alert("请先购买人物后再进行抽奖！");
                return;
              }else{
                $("#lottery10").addClass('disabled');
                $("#lottery1").addClass('disabled');
                var data=JSON.parse(e);
                var str="<div class='col-sm-6 col-md-4 html-Append' style='margin:0px'>"+
                          "<div class='thumbnail'>"+
                            "<img src='images/showRole/"+data.carid+".png'>"+
                            "<div class='caption'>"+
                              "<h3>碎片数量：<span id='"+data.carid+"'>"+data.randNum+"</span></h3>"+
                            "</div>"+
                          "</div>"+
                          "</div>"
                $("#sql_lottery").append(str);
                $(".html-Append img").animate({ 
                  opacity:"1"
                },1000 );
                $(".html-Append img").css("transform","rotateY(360deg)")
                $(".html-Append img").css("box-shadow","0 0 50px blue")
              }
              $("#lottery10").removeClass('disabled');
              $("#lottery1").removeClass('disabled');
            },
            error:function(){
              alert("出错请重试！")
            }
          })
        });
        /*点击抽十次*/
        $("#lottery10").click(function(){
          if($(".html-Append").length>0){
            $(".html-Append").remove();
          }
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/lottery10.php",
            success:function(e){
              if(e=="error"){
                alert("当前用户余额不足本次抽奖！");
                return;
              }else if(e=="rolenum0"){
                alert("请先购买人物后再进行抽奖！");
                return;
              }else{
                $("#lottery10").addClass('disabled');
                $("#lottery1").addClass('disabled');
                var data=JSON.parse(e);
                var str='';
                var i=0;
                var timer=setInterval(function(){
                  if(i<10){
                    $("#sql_lottery").append(
                      "<div class='col-sm-6 col-md-4 html-Append' style='margin:0px'>"+
                            "<div class='thumbnail'>"+
                              "<img src='images/showRole/"+data['carid'][i]+".png'>"+
                              "<div class='caption'>"+
                                "<h3>碎片数量：<span id='"+data['carid'][i]+"'>"+data['randNum'][i]+
                                "</span></h3>"+
                              "</div>"+
                            "</div>"+
                            "</div>"
                    );
                    $(".html-Append img").animate({ 
                      opacity:"1",
                      scale:"2"
                    }, 1000 );
                    $(".html-Append img").css("transform","rotateY(360deg)")
                    $(".html-Append img").css("box-shadow","0 0 50px blue")
                  }else{
                    clearInterval(timer);
                    $("#lottery10").removeClass('disabled');
                    $("#lottery1").removeClass('disabled');
                  }
                  i++;
                },1000)


              }
            },
            error:function(){
              alert("出错请重试！")
            }
          })
        })
      $('#P_book').click(function(){
          $("#show_book").modal();
      })
      $("#payToWeiXin").click(function(e){
        e.preventDefault();
        var ImgSrc=document.getElementById('payImg');
        ImgSrc.src='images/other/payweixin.jpg';
      })
      $("#P_donate").click(function(){//赞助
        $("#show_donate").modal();
      })
      $("#P_sign").click(function(){//每日签到
        $.ajax({
          type:"POST",
          data:data,
          url :"phpSql/daySign.php",
          success:function(e){
            $("#show_sign").modal();
            var str="";
            if(e=="equal"){
              str="<h3 style='color:red'>今天已经签到过了，明天再来吧！</h3>";
            }else if(e=="success"){
              str="<h3 style='color:green'>签到成功！</h3><h5>恭喜获得50金币+100体力值,祝你游戏愉快!</h5>";
            }else if(e=="error"){
              str="<h3 style='color:red'>签到失败！请尝试重新签到</h3>";
            }
            $("#sql_sign").html(str);
          },
          error:function(e){
            alert("签到失败！请尝试重新签到");
            window.location.href=dev_location;
          }
        })
      })
      $("#P_seting").click(function(){//显示个人设置提示
        $("#show_seting").modal();
      })
      $("#changeName_btn").click(function(e){//修改用户名
        e.preventDefault();
        var reg=/^[0-9a-zA-Z\u4e00-\u9fa5]{0,8}$/;
        if(!reg.test($.trim($("#changeName_form").val()))){
          $("#changename_tip").html("<h3 style='color:red'>账号格式有误请输入字母,数字或者汉字</h3>");
        }else{
          var data={
            "userName":$("#user_name").val(),
            "newName":$.trim($("#changeName_form").val()),
            "userPwd":$.trim($("#changeName_pwd").val())
          };
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/setuserName.php",
            success:function(e){
              var str="";
              if(e=="hasExist"){
                str="<h3 style='color:red'>当前注册的用户名已被注册！请重新选择</h3>";
              }else if(e=="errorpwd"){
                str="<h3 style='color:red'>账号密码有误！密码为原账号密码</h5>";
              }else if(e=="nomoney"){
                str="<h3 style='color:red'>当前账户余额不足！</h3>";
              }else if(e=="error"){
                str="<h3 style='color:green'>修改失败！请尝试重新修改</h3>";
              }else{
                str="<h3 style='color:green'>恭喜改名成功！请重新登录</h3>";
                setTimeout(function(){
                  window.location.href=dev_location;
                },1000);
              }
              $("#changename_tip").html(str);
            },
            error:function(e){
              alert("修改失败！请尝试重新修改");
              window.location.href=dev_location;
            }
          }) 
        }
      })
      $("#changepwd_btn").click(function(e){//修改密码
        e.preventDefault();
        var reg=/^[0-9a-zA-Z]{0,20}$/;
        if($.trim($("#changepwd_pwd1").val())!=$.trim($("#changepwd_pwd2").val())){
          $("#changepwd_tip").html("<h3 style='color:red'>确认密码有误！</h3>");
          return;
        }
        if($.trim($("#changepwd_form").val())==''||$.trim($("#changepwd_pwd1").val())==''||$.trim($("#changepwd_pwd2").val())==''){
          $("#changepwd_tip").html("<h3 style='color:red'>密码不能为空！</h3>");
          return;
        }
        if(!reg.test($.trim($("#changepwd_pwd2").val()))){
          $("#changepwd_tip").html("<h3 style='color:red'>密码格式有误只能为数字或字母的组合</h3>");
          return;
        }
        var data={
          "userName":$("#user_name").val(),
          "oldpwd":$.trim($("#changepwd_form").val()),
          "newpwd":$.trim($("#changepwd_pwd2").val())
        };
        $.ajax({
          type:"POST",
          data:data,
          url :"phpSql/setuserPwd.php",
          success:function(e){
            var str="";
            if(e=="nouser"){
              str="<h3 style='color:red'>当前用户不存在！请重新登录</h3>";
            }else if(e=="errorpwd"){
              str="<h3 style='color:red'>初始密码有误！</h5>";
            }else if(e=="error"){
              str="<h3 style='color:red'>修改失败！请尝试重新修改</h3>";
            }else{
              str="<h3 style='color:green'>恭喜修改成功！请重新登录</h3>";
              setTimeout(function(){
                window.location.href=dev_location;
              },1000);
            }
            $("#changepwd_tip").html(str);
          },
          error:function(e){
            alert("修改失败！请尝试重新修改");
            window.location.href=dev_location;
          }
        })
      })