      var uName=$("#user_name").val();
      var data={"uName":uName};
      var chapterCarId;
      $("#start_battle").on("click",function(){
        $("#show_selectChapter").modal();
        $.ajax({
          type:"POST",
          data:data,
          url :"phpSql/allChapter.php",
          success:function(e){
            var receiveData=JSON.parse(e);
            var findChapter=receiveData.chapter;
            if(receiveData.userPower<10){
              alert("体力不足无法进行闯关(当前体力小于10)");
              $("#show_selectChapter").modal('hide');
              return
            }else{
              var str='<h2>请选择关卡</h2>';    
              for(var i=0;i<findChapter.length;i++){
                str+="<div style='display:inline-block' class='chapterDetail'>"+
                "<img src='images/bg/97.jpg' style='margin:10px;'>"+
                "<span id="+findChapter[i].chapterid+">"+findChapter[i].chaptername+"</span></div>";
              }
              $("#all_selectChapter").html(str);
              $(".chapterDetail>span").on("click",function(){
                $("#show_userTeam").modal();
                var chapterId=$(this)[0].id;
                chapterCarId=chapterId;
                $("#show_selectChapter").modal('hide');
                var str='';
                if(uName!=''){
                  $.ajax({
                    type:"POST",
                    data:data,
                    url :"phpSql/selectRole.php",
                    success:function(e){
                      var carId=JSON.parse(e);
                      var allId=carId.carid.split(",");
                      if(allId!=null){
                        for(var i=0;i<allId.length;i++){
                          if(i!=0){
                            str+="<div style='display:inline-block;position:relative;' id='RoleSelected_active'>"+
                            "<img style='margin:20px;' src='images/showRole/"+allId[i]+".png' id="+allId[i]+">"+
                            "<img src='images/other/selected.png' class='RoleSelected' />"+
                            "</div>"
                          }
                        }
                        $("#all_userTeam").html(
                          "<h3 style='font-weight: bold;'>请选择三位闯关人物</h3>"+str+
                          "<div style='margin:20px;'><button class='btn btn-primary' id='SelectedOver'>完成</button><div>"
                          )
                      }
                      $("#RoleSelected_active>img").on("click",function(){
                        $(this).next().toggleClass("RoleSelected-active")
                      })
                      $("#SelectedOver").on("click",function(){
                        SelectedLess3();
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
            }
          },
          error:function(e){
            alert("选择失败！请重新选择")
          }
        })
      })
      function SelectedLess3(){
        if($(".RoleSelected-active").length<=3&&$(".RoleSelected-active").length>0){
          var allSelected=$(".RoleSelected-active").prev("img");
          var selectedArr=[];
          for(var i=0;i<allSelected.length;i++){
            selectedArr.push(allSelected[i].id);
          }
          var data={"uName":uName,"carId":selectedArr}
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/selectedToJinDian.php",
            success:function(e){
              var receiveData=JSON.parse(e);
              if(receiveData.hasRole){
                challgerCarId=selectedArr;
                $('#show_userTeam').modal('hide');
                StartChapter(selectedArr);
              }else{
                alert("操作失败！请重新选择")
              }
            },
            error:function(){
              alert("选择失败！请重新选择")
            }
          })
        }else if($(".RoleSelected-active").length<=0){
          alert("选择失败！最少选择一位人物")
        }else{
          alert("选择失败！最多选择三位人物")
        }
      }
      function StartChapter(arr){
        $("#show_startchapter").modal();
        var vsStr="<h2>对战信息</h2>";
        //当前选择的关卡
        var carr=chapterCarId;
        var data={"carr":carr,"uarr":arr,"uName":uName};
        var challenger={};
        var beChallenger={};
        var newbeChallenger={};
        var currentChapter={};
        var isdefeated=true;
        $.ajax({
          type:"POST",
          data:data,
          url :"phpSql/StartChapter.php",
          success:function(e){
            var receiveData=JSON.parse(e);
            //显示出战人员
            for(var i=0;i<arr.length;i++){
              vsStr+="<div style='display:inline-block;'>"+
                      "<img src='images/showRole/"+arr[i]+".png' style='margin:10px;'>"+
                      "</div>"
            }
            vsStr+="<div style='font-size:50px;'><img src='images/bg/vs.jpg'></div>"
            currentChapter=receiveData.currentOBJ[0].chapterrole.split(",");
            for(var i=0;i<currentChapter.length;i++){
              vsStr+="<div style='display:inline-block;'>"+
                      "<img src='images/showRole/"+currentChapter[i]+".png' style='margin:10px;'>"+
                      "</div>"
            }
            $("#all_startchapter").html(vsStr+"<div style='margin:10px;'><button class='btn btn-danger' id='ClickstartChapter'>开始闯关</button></div>");

            
            var str='<h1 style="text-align:center">战斗开始</h1>';
            
            //challgerCarId;
            for(var key in receiveData){
              switch (key){
                case "challenger" : 
                challenger=receiveData[key];
                break;
                case "bechallenger" : 
                beChallenger=receiveData[key];
              }
            }
            //删除不在闯关人物中的角色
            for(var i=0;i<currentChapter.length;i++){
              for(var j=0;j<beChallenger.length;j++){
                if(currentChapter[i]==beChallenger[j].roleid){
                  newbeChallenger[i]=beChallenger[j];
                  newbeChallenger[i].roleattack=newbeChallenger[i].roleattack*carr;
                  newbeChallenger[i].rolelife=newbeChallenger[i].rolelife*carr;
                }
              }
            }
            
            for(var key in challenger){
              if($.inArray(challenger[key].roleid,arr)!=-1){
                data1.push(challenger[key]);
              }
            }
            data2=newbeChallenger;
            battleLength1=data1.length;
            battleLength2=data2.length;
            $("#ClickstartChapter").on("click",function(){                
              $("#show_startchapter").modal('hide');
              $(".battle-message").css("display","block");
              $(".main-container").remove();
              startBattle.init(data1[battleIndex1],data2[battleIndex2]);
            })
          },
          error:function(){
            alert("出错!!!请请重新操作")
          }
        })
      }
      function ChapterVictory(arr){
        var chip=arr[Math.floor(Math.random()*(arr.length-0))];
        debugger;
        var data={"uName":uName,"rolechip":chip,"currentC":chapterCarId}
        $.ajax({
          type:"POST",
          data:data,
          url :"phpSql/ChapterVictory.php",
          success:function(e){
            if(e!='error'){
              $('#show_battle').modal('hide');
              $('.battle-message').css("display","block");
              var receiveData=JSON.parse(e);
              if(receiveData.randNum==0){
                $("#all_battleMessage").append("<div style='color:#fff;'>未获得任何碎片</div><button class='btn btn-danger'"+
                "id='close_battleMessage'>关闭</button>")                     
              }else if(receiveData.randNum!=0){
                $("#all_battleMessage").append(
                "<div>"+
                "<h3 style='color:#fff;'>恭喜获得"+receiveData.randNum+"个碎片可用于合成人物，提高人物的属性噢！</h3>"+
                          "<img src='images/showRole/"+receiveData.carid+".png'>"+
                "</div>"+
                "<button class='btn btn-danger'"+
                "id='close_battleMessage' style='margin-top:30px;'>关闭</button>")                  
              }
              $(".battle-message").on('click','#close_battleMessage',function(){
                $("#main_Container").load(dev_location+"mainApp/ModalToBattle.html");
              })
            }else{
              alert("出错!!!请请重新操作")
            }
          },
          error:function(){
            alert("出错!!!请请重新操作")
          }
        })
      }
      function ChapterDefeated(){
        var data={"uName":uName};
        $.ajax({
          type:"POST",
          data:data,
          url :"phpSql/ChapterDefeated.php",
          success:function(e){
            if(e=="success"){
              $("#all_battleMessage").append("<div style='color:#fff'>未获得任何碎片</div>"+
                "<button class='btn btn-danger' id='close_battleMessage'>关闭</button>")                     
              $(".battle-message").on('click','#close_battleMessage',function(){
                $("#main_Container").load(dev_location+"mainApp/ModalToBattle.html");
              })
            }else{
              alert("出错!!!请请重新操作")
            }
          },
          error:function(e){
            alert("出错!!!请请重新操作")
          },
        })
      }
      
      /*左侧导航的功能*/
      //hover左边导航进行提示的信息
/*      $('#P_message').tooltip();
      $('#P_team').tooltip();
      $('#P_chip').tooltip();
      $('#P_gem').tooltip();
      $('#P_battle').tooltip();
      $('#P_index').tooltip();
      $('#P_refresh').tooltip();
      $('#P_return').tooltip();
      $('#P_book').tooltip();
      $('#P_donate').tooltip();*/

      //点击导航展示详细的信息
      $("#P_message").click(function(){//个人信息
        $("#show_userMessage").modal();
        if(uName!=''){
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
        if(uName!=''){
          $.ajax({
            type:"POST",
            data:data,
            url :"phpSql/selectRole.php",
            success:function(e){
              var carId=JSON.parse(e);
              if(carId.carid!=null){
                var allId=carId.carid.split(",");
              }else{
                $("#all_userTeam").html("<img src='images/other/nochip01.jpg'><h3>您当前还未添加任何人物...</h3>")
                return;
              }
              
              hasCarId=allId;
              if(allId.length==1){
                $("#all_userTeam").html("<img src='images/other/nochip01.jpg'><h3>您当前还未添加任何人物...</h3>")
                return;
              }
              if(allId!=null){
                $.ajax({
                  type:"POST",
                  data:{"uName":uName,"carId":allId},
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
                              "<input type='text' class='form-control intensify-num' /></p>"+
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
                                    "<p>当前人物碎片不足</p>"
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
              $("#payToWeiXin").click(function(e){
              e.preventDefault();
              var ImgSrc=document.getElementById('payImg');
              ImgSrc.src='images/other/payweixin.jpg';
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
      });

      $("#P_donate").click(function(){//赞助
        $("#show_donate").modal();
      })

      $("#P_return").click(function(){//返回上级
        $("#main_Container").load(dev_location+"mainApp/selectModal.html");
      })

      $('#P_refresh').click(function(){//刷新页面
        $("#main_Container").load(dev_location+"mainApp/ModalToBattle.html");
      })

      $('#P_index').click(function(){//返回登录页
        window.location.href=dev_location;
      })

      $('#P_book').click(function(){
          $("#show_book").modal();
      })
      /****************对战的算法***************/
      var data1=[];
      var data2=[];
      var battleIndex1=0;
      var battleIndex2=0;
      var battleLength1;
      var battleLength2;
      var startBattle={
        zhan1:null,
        zhan2:null,
        timer:null,
        win:false,
        init:function(n1,n2){
          this.zhan1=n1;
          this.zhan2=n2;
          //显示当前的对战的人的图片
          var strImg='';
          strImg+="<p><img src='images/showAllRole/"+this.zhan1['roleid']+".jpg' /' class='img1'></p><p><img src='images/showAllRole/"+this.zhan2['roleid']+".jpg' class='img2' /></p>";
          $(".imgC>.showVsImg").html(strImg);
          //1秒执行一次对战
          this.timer=setInterval(this.start1.bind(this),1000);
        },
        start1:function(){
          //存放乙方攻击的内容
          var strBattle1='<b style="color:green;font-size:18px;margin-left:10px;">乙方造成</b>';
          //存放敌方攻击的内容
          var strBattle2='<b style="color:red;font-size:18px;margin-left:10px;">敌方造成</b>';
          //attack1乙方的基础攻击属性
          var attack1=parseInt(this.zhan1['roleattack']);
          //attack2敌方的基础攻击属性
          var attack2=parseInt(this.zhan2['roleattack']);
          //随机增加乙方攻击力
          var randAttack1=Math.floor(Math.random()*50);
          //随机增加敌方攻击力
          var randAttack2=Math.floor(Math.random()*50);
          //改变乙方的攻击力+随机增加的攻击力
          attack1+=parseInt(randAttack1);
          //改变敌方的攻击力+随机增加的攻击力
          attack2+=parseInt(randAttack2);
          //获取乙方生命值
          var life1=parseInt(this.zhan1['rolelife']);
          //获取敌方生命值
          var life2=parseInt(this.zhan2['rolelife']);
          //获取乙方防御力并削弱乘0.6
          var define1=Math.floor(this.zhan1['roledefense']*0.6);
          //获取敌方防御力并削弱乘0.6
          var define2=Math.floor(this.zhan2['roledefense']*0.6);
          //乙方攻击的条件
          if(life2+define2>attack1){
            if(randAttack1>30){
              strBattle1+="<b style='color:yellow;font-size:30px;margin-left:10px;'>暴击:</b>";
              $(".imgC .img1").css("transform","scale(1.2)");
              setTimeout(function(){
                $(".imgC .img1").css("transform","scale(1)");
              },500);
            }else{
              strBattle1+=":";
            }
            if(parseInt(attack1-define2)<=0){
              this.zhan2['rolelife']=life2-1;
              strBattle1+="<span>1点伤害!敌方剩余"+this.zhan2['rolelife']+"点生命值</span>";
            }else{
              this.zhan2['rolelife']=life2-(attack1-define2);
              strBattle1+="<span>"+parseInt(attack1-define2)+"点伤害!敌方剩余"+this.zhan2['rolelife']+"点生命值</span>";
            }
            $("#all_battleMessage>div").append(strBattle1);
          }else{
            strBattle1+="<p style='color:red'>"+parseInt(attack1)+"点伤害!敌方阵亡</p>";
            $("#all_battleMessage>div").append(strBattle1);
            $(".imgC .img2").css("transform","scale(0)");
            clearInterval(this.timer);
            this.timer=null;
            data1[battleIndex1]['rolelife']=this.zhan1['rolelife'];
            var Index2=++battleIndex2;
            if(Index2<battleLength2){
              battleTeam(battleIndex1,Index2);
            }else{
              $("#all_battleMessage>div").append("<h2 style='color:#fff;'>恭喜！挑战胜利！</h2>");
              ChapterVictory(challgerCarId);
              return;
            }
          }
          //敌方攻击的条件
          if(life1+define1>attack2){
            
            if(randAttack2>30){
              strBattle2+="<b style='color:yellow;font-size:30px;margin-left:10px;'>暴击:</b>";
              $(".imgC .img2").css("transform","scale(1.2)");
              setTimeout(function(){
                $(".imgC .img2").css("transform","scale(1)");
              },500);
            }else{
              strBattle2+=":";
            }
            if(parseInt(attack2-define1)<=0){
              this.zhan1['rolelife']=life1-1;
              strBattle2+="<span>1点伤害!乙方剩余"+this.zhan1['rolelife']+"点生命值</span>";
            }else{
              this.zhan1['rolelife']=life1-(attack2-define1);
              strBattle2+="<span>"+parseInt(attack2-define1)+"点伤害!乙方剩余"+this.zhan1['rolelife']+"点生命值</span>";
            }       
            $("#all_battleMessage>div").append(strBattle2);
          }else{
            strBattle2+="<p style='color:red'>"+parseInt(attack2)+"点伤害!乙方阵亡</p>";
            $("#all_battleMessage>div").append(strBattle2);
            $(".imgC .img1").css("transform","scale(0)");
            clearInterval(this.timer);
            this.timer=null;
            data2[battleIndex2]['rolelife']=this.zhan2['rolelife'];
            var Index1=++battleIndex1;
            if(Index1<battleLength1){ 
              battleTeam(Index1,battleIndex2);
            }else{
              $("#all_battleMessage>div").append("<h2 style='color:#fff;'>很遗憾。。。挑战失败</h2>");
              ChapterDefeated();
              return;
            }
          }
        }
      }
      //某方阵亡继续调用这个方法
      function battleTeam(n1,n2){
        startBattle.init(data1[n1],data2[n2]);
      }
