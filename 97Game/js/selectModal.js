      var uName=$("#user_name").val();
      var data={"uName":uName};
      var challgerCarId=[];
      var changeVsTeamnum=[];
      $("#bg-image").css("height",innerHeight+"px")
      $("#bg-image").css("width",innerWidth+"px")
      //点击进入不同模式的动画
      $("#jinDian_Modal").hover(function(){
        $(this).addClass("hoverModal");
      },function(){
        $(this).removeClass("hoverModal");
      })

      $("#zhanDou_Modal").hover(function(){
        $(this).addClass("hoverModal");
      },function(){
        $(this).removeClass("hoverModal");
      })

      $("#xiuLian_Modal").hover(function(){
        $(this).addClass("hoverModal");
      },function(){
        $(this).removeClass("hoverModal");
      })
      //点击进入经典模式
      $("#jinDian_Modal").on("click",function(){
        $.ajax({
          type:"POST",
          data:data,
          url:"phpSql/sqlUserMessage.php",
          success:function(e){
            var ReceivedData=JSON.parse(e);
            if(ReceivedData.carid==null/*||ReceivedData.user_power<=0*/){
              alert("您当前还未添加任何人物拥有！请先购买人物");
              return;
            }
            var ConditionCar=ReceivedData.carid.length;
            var ConditionPower=Number(ReceivedData.user_power);
            if(/*ConditionCar>=6&&ConditionPower>0*/true){
              //进入经典模式展示个人队伍
              $("#show_userTeam").modal();
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
                          str+="<div style='display:inline-block;position:relative;cursor:pointer;' id='RoleSelected_active'>"+
                          "<img style='margin:20px;' src='images/showRole/"+allId[i]+".png' id="+allId[i]+">"+
                          "<img src='images/other/selected.png' class='RoleSelected' />"+
                          "</div>"
                        }
                      }
                      $("#all_userTeam").html(
                        "<h3 style='font-weight: bold;'>请选择出战人物</h3><h5>(可以选择1-3位人物且本次选择的出战人物即成为应战人物)</h5>"+str+
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
                    alert("查询失败！请重新查询");
                    window.location.reload();
                  }
                })
              }else{
                alert("登录跳转失败！请重新登录")
                window.location.href=dev_location;
              }  
            }else{
              alert("出错请重新尝试！");
              window.location.reload();
            }
            
          },
          error:function(e){
            alert("选择失败！请重新选择");
            window.location.reload();
          }
        })
      })
      function SelectedLess3(){
        if($(".RoleSelected-active").length<=3){
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
                changeVsTeam();
                //BattleTeam();
              }else{
                alert("操作失败！请重新选择");
                window.location.reload();
              }
            },
            error:function(){
              alert("选择失败！请重新选择");
              window.location.reload();
            }
          })
        }else{
          alert("选择失败！请重新选择(只能选择三位出站人物)");
          window.location.reload();
        }
      }
      function changeVsTeam(){
        try{
          $('#change_vsTeam').modal();
          challgerCarId;
          var str="<h3>拖拽人物调整出战顺序</h3><div class='changeVsImg' id='vsContainer'>";
          for(var i=0,arrorstr='',imgi=1;i<challgerCarId.length;i++){
            var arrnum=imgi++;
            str+="<img src='images/showRole/"+challgerCarId[i]+".png' id='vs"+challgerCarId[i]+"'>"
            arrorstr+="<span class='vs_"+arrnum+"'><img src='images/other/arror.png' />"+arrnum+"st</span>";
          }
          str+="</div><div class='changeVsContainer'>"+arrorstr+"</div><div><button class='btn btn-primary' id='changeOver'>确认</button></div></div>";
          $("#all_vsTeam").html(str);
          var timer=setTimeout(function(){
            $(".changeVsContainer img").addClass("rotateArror");
            clearTimeout(timer);
            timer=null;
          },500);
          var imgList = document.querySelectorAll('.changeVsImg>img');
          for(var i=0; i<imgList.length; i++){
            //为每张图片都绑定一个dragstart事件
            var img = imgList[i];
            img.ondragstart = function(event){
              //在源对象的事件中保存数据
              event.dataTransfer.setData('text/html', this.id);
            }
          }
          //目标对象
          vsContainer.ondragover =function(event){
            event.preventDefault();//阻止dragover的默认行为——只能触发dragleave
          }
          vsContainer.ondrop = function(event){
            //在目标对象的事件中读取数据
            var id = event.dataTransfer.getData('text/html');
            var img = document.getElementById(id);
            this.appendChild(img);
          }
          $("#changeOver").click(function(){
            var getSetLength=$(".changeVsImg img");
            for(var i=0;i<getSetLength.length;i++){
              arr=parseInt(getSetLength[i].id.slice(2));
              changeVsTeamnum.push(arr);
            }
            BattleTeam();
            $('#change_vsTeam').modal('hide');
          })
        }
        catch(err){
          alert("由于你的浏览器版本过低无法调整出战整容！系统已经默认帮您排序");
          BattleTeam();
        }
      }
      function BattleTeam(){
        $.ajax({
            type:"POST",
            data:'',
            url :"phpSql/showBattle.php",
            success:function(e){
              var receiveData=JSON.parse(e);
              var str='<tr><th>排名</th><th>玩家</th><th>战力</th><th>挑战</th></tr>';
              for(var i=receiveData.length,order=0;i>0;i--){
                if(receiveData[i-1].user_name==uName&&receiveData[i-1].carid!=null/*&&receiveData[i-1].carid.length>=5*/){
                  str+="<tr>"+
                      "<td>"+(++order)+"</td><td>"+receiveData[i-1].user_name+"</td><td>"+receiveData[i-1].user_combat+
                      "</td><td></td>"+
                       "</tr>"
                }else if(receiveData[i-1].carid!=null/*&&receiveData[i-1].carid.length>=5*/){
                  str+="<tr>"+
                      "<td>"+(++order)+"</td><td class='changeName'>"+receiveData[i-1].user_name+"</td>"+
                      "<td>"+receiveData[i-1].user_combat+
                      "</td><td><a class='btn btn-primary'>发起挑战</a></td>"+
                       "</tr>"
                }else{
                  continue;
                }
              }
              $('#show_battle').modal();
              $("#all_battle>table").html(str);
              $(".select-battle td>a").on("click",function(){
                ClickBattle.bind(this)();
              })
            },
            error:function(){
              alert("选择失败！请重新选择");
              window.location.reload();
            }
        })
      }
      function ClickBattle(){
        var changeOBJ=$(this).parents("td").siblings(".changeName").html();
        var data={"uName":uName,"changeOBJ":changeOBJ};
        $.ajax({
          type:"POST",
          data:data,
          url :"phpSql/startBattle.php",
          success:function(e){
            $('.selectModal-container').css("display",'none');
            var receiveData=JSON.parse(e);
            challgerCarId;
            var newChanger=[];
            var changeChallenger=receiveData['challenger']
            for(var i=0;i<changeVsTeamnum.length;i++){
              for(var j=0;j<changeChallenger.length;j++){
                if(changeChallenger[j].roleid==changeVsTeamnum[i]){
                  newChanger.push(changeChallenger[j]);
                }
              }
            }
            data1=newChanger;
            data2=receiveData['bechallenger'];
            battleLength1=data1.length;
            battleLength2=data2.length;
            $('#show_battle').modal('hide');
            $('.battle-message').css("display","block");
            startBattle.init(data1[battleIndex1],data2[battleIndex2])
          },
          error:function(){
            alert("出错!!!请请重新操作");
            window.location.reload();
          }
        })
      }
      function BattleVictory(arr){
        var chip=arr[Math.floor(Math.random()*(arr.length-0))];
        var data={"uName":uName,"rolechip":chip}
        $.ajax({
          type:"POST",
          data:data,
          url :"phpSql/BattleVictory.php",
          success:function(e){
            if(e!='error'){
              $('#show_battle').modal('hide');
              $('.battle-message').css("display","block");
              var receiveData=JSON.parse(e);
              if(receiveData.randNum==0){
                  $("#battle_message>div.allVsMessage").append("<div style='color:#fff;'>未获得任何碎片</div><button class='btn btn-danger'"+
                    "id='close_battleMessage'>关闭</button>")                     
              }else{
                $("#battle_message>div.allVsMessage").append(
                  "<div>"+
                  "<h3 style='color:#fff;'>恭喜获得"+receiveData.randNum+"个碎片可用于合成人物，提高人物的属性噢！</h3>"+
                  "<img src='images/showRole/"+receiveData.carid+".png'>"+
                  "</div>"+
                  "<button class='btn btn-danger'"+
                  "id='close_battleMessage' style='margin-top:30px;'>关闭</button>")                  
              }
              $(".battle-message").on('click','#close_battleMessage',function(){
                $("#main_Container").load(dev_location+"mainApp/selectModal.html");
              });
            }else{
              alert("出错!!!请请重新操作");
              window.location.reload();
            }
          },
          error:function(){
            alert("出错!!!请请重新操作");
            window.location.reload();  
          }
        })
      }
      function BattleDefeated(){
        var data={"uName":uName};
        $.ajax({
          type:"POST",
          data:data,
          url :"phpSql/BattleDefeated.php",
          success:function(e){
            if(e=="success"){
              $('#show_battle').modal('hide');
              $('.battle-message').css("display","block");
              $("#battle_message>div.allVsMessage").append("<div style='color:#fff;'>未获得任何碎片</div><button class='btn btn-danger'"+
              "id='close_battleMessage'>关闭</button>")                     
            
              $(".battle-message").on('click','#close_battleMessage',function(){
                $("#main_Container").load(dev_location+"mainApp/selectModal.html");
              });
            }else{
              alert("出错!!!请请重新操作");
              window.location.reload();
            }
          },
          error:function(e){
            alert("出错!!!请请重新操作");
            window.location.reload();
          },
        })
      }
      $("#zhanDou_Modal").on("click",function(){
        $("#main_Container").load(dev_location+"mainApp/ModalToBattle.html");
        /*window.location.href=dev_location+"mainApp/ModalToBattle.html?UFO"+
        +Math.ceil(Math.random()*520)+'_'+decToHex(uName);*/
      })
      $("#xiuLian_Modal").on("click",function(){
        alert("暂未开放")
        /*window.location.href="http://localhost/QHgame/97Game/mainApp/ModalToBattle.html?UFO"+
        +Math.ceil(Math.random()*520)+'_'+decToHex(uName);*/
      })


      /*左侧导航的功能*/
      //hover左边导航进行提示的信息
      $('#P_message').tooltip();
      $('#P_team').tooltip();
      $('#P_chip').tooltip();
      $('#P_gem').tooltip();
      $('#P_battle').tooltip();
      $('#P_index').tooltip();
      $('#P_refresh').tooltip();
      $('#P_return').tooltip();
      $('#P_book').tooltip();
      $('#P_donate').tooltip();

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
              alert("查询失败！请重新查询");
              window.location.reload();
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
                    alert("查询失败！请重新查询");
                    window.location.reload();
                  }
                })
                
              }
            },
            error:function(){
              alert("查询失败！请重新查询");
              window.location.reload();
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

      $('#P_refresh').click(function(){//刷新页面
        $("#main_Container").load(dev_location+"mainApp/selectModal.html");
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
        zhan1:null,//保存乙方的当前对战人物
        zhan2:null,//保存敌方当前的对战人物
        timer:null,//主定时器循环
        win:false,//是否胜利
        power1:0,//决定乙方是否可以放技能
        power2:0,//决定敌方是否可以放技能
        isattack1:true,//决定乙方本轮是否攻击
        isattack2:true,//决定敌方本轮是否攻击
        /*安迪的技能控制*/
        ad1:false,
        ad2:false,
        stopnum1:0,//乙方停止攻击的次数
        stopnum2:0,//敌方停止攻击的次数
    		/*坂崎良的技能控制*/
    		bqllowdefine1:false,
    		bqllowdefine2:false,
    		/*坂崎由莉的技能控制*/
    		bqyl1:false,
    		bqyl2:false,
    		/*蔡宝健的技能控制*/
    		cbj1:false,
    		cbj2:false,
    		/*陈国汉的技能控制*/
    		cgh1:false,
    		cgh2:false,
        cghstopnum1:0,
        cghstopnum2:0,
        /*大门五郎的技能控制*/
        dmwl1:false,
        dmwl2:false,
        dmwlstopnum1:-1,
        dmwlstopnum2:-1,
        /*东丈技能控制*/
        dz1:false,
        dz2:false,
        /*金家潘技能控制*/
        jjp1:false,
        jjp2:false,
        /*KING的技能控制*/
        king1:false,
        king2:false,
        /*克拉克的技能控制*/
        klk1:false,
        klk2:false,
        /*拉尔夫的技能控制*/
        lef1:false,
        lef2:false,
        lefstopnum1:-1,
        lefstopnum2:-1,
        /*莉安娜的技能控制*/
        lan1:false,
        lan2:false,
        /*麻宫雅典娜的技能控制*/
        mgydn1:false,
        mgydn2:false,
        /*玛丽的技能控制*/
        ml1:false,
        ml2:false,
        /*特瑞的技能控制*/
        tr1:false,
        tr2:false,
        /*镇元斋的技能控制*/
        zyz1:false,
        zyz2:false,
        /*罗伯特的技能控制*/
        lbt1:false,
        lbt2:false,
        /*神乐千鹤的技能控制*/
        slqh1:false,
        slqh2:false,
        /*不知火舞的技能控制*/
        bzhw1:false,
        bzhw2:false,
        bzhwstopnum1:-1,
        bzhwstopnum2:-1,
        /*椎拳崇的技能控制*/
        zqc1:false,
        zqc2:false,
        zqclife1:-1,
        zqclife2:-1,
        /*草稚京的技能控制*/
        czj1:false,
        czj2:false,
        czjxy1:false,
        czjxy2:false,
        /*红丸的技能控制*/
        hw1:false,
        hw2:false,
        /*八神的技能控制*/
        bs1:false,
        bs2:false,
        /*七枷社技能控制*/
        qjs1:false,
        qjs2:false,
        /*山崎龙二技能控制*/
        sqle1:false,
        sqle:false,
        /*比利的技能控制*/
        bl1:false,
        bl2:false,
        blstopnum1:-1,
        blstopnum2:-1,
        /*克里斯的技能控制*/  
        kls1:false,
        kls2:false,
        /*大蛇的技能控制*/
        ds1:false,
        ds2:false,
        boss1:false,
        boss2:false,
        /*血量的控制*/
        lifecontral1:0,
        lifecontral2:0,
        lifereduce1:0,
        lifereduce2:0,
        lifecurrent1:0,
        lifecurrent2:0,
        lifeconsume1:0,
        lifeconsume2:0,
        lifewidth1:0,
        lifewidth2:0,
        /*对速度的控制*/
        speedv:1000,
        /*能量增长个控制*/
        addpower1:50,
        addpower2:50,
        /*控制能否直接跳过比赛*/
        gametime:0,
        /*是否退出比赛*/
        outtime:100,
        outgame:false,
        init:function(n1,n2){
          this.zhan1=n1;
          this.zhan2=n2;
          //显示当前的对战的人的图片<button class='btn btn-primary' id='OverGame'>查看结果</button>
          var strImg1='',strImg2='';
          strImg1="<img src='images/showAllRole/"+this.zhan1['roleid']+".jpg' class='img1'/'><b class='img1value'></b>";
          strImg2="<img src='images/showAllRole/"+this.zhan2['roleid']+".jpg' class='img2' /><b class='img2value'></b>";
          $(".imgC>.showVsImg .strImg1").html(strImg1);
          $(".imgC>.showVsImg .strImg2").html(strImg2);
          //1秒执行一次对战
          this.timer=setInterval(this.start1.bind(this),this.speedv);
        },
        start1:function(){
          //超过比赛回合直接失败
          if(this.outtime--<=0){
            $("#battle_message>div.allVsMessage").append("<h2>很遗憾。。。挑战失败</h2>");
            $(".imgC>div.showVsImg").addClass("showDImg");
            $(".clickgameover").html("<button class='btn btn-primary OverGame'>关闭</button>");
            $(".clickgameover").on('click',".OverGame",function(){
              debugger;
              $("#main_Container").load(dev_location+"mainApp/selectModal.html");
            });
            BattleDefeated();
            clearInterval(this.timer);
            this.timer=null;
            return;
          }else{
            $(".vsisvs").html(this.outtime);
          }
          //对乙方血量的控制获取每次的同比调整系数
          this.lifewidth1=parseInt($(".friendly-life>b").width());
          this.lifecontral1=parseFloat((this.zhan1['rolelife']/this.lifewidth1).toFixed(3));
          this.lifecurrent1=this.zhan1['rolelife'];
          //对敌方血量的控制获取每次的同比调整系数
          this.lifewidth2=parseInt($(".enemy-life>b").width());
          this.lifecontral2=parseFloat((this.zhan2['rolelife']/this.lifewidth2).toFixed(3));
          this.lifecurrent2=this.zhan2['rolelife'];
          /************大蛇技能效果开始************/
          //乙方拥有大蛇
          if(this.zhan1['roleid']==28){
            this.boss1=true;
          }else{
            this.boss1=false;
          }
          //敌方拥有大蛇
          if(this.zhan2['roleid']==28){
            this.boss2=true;
          }else{
            this.boss2=false;
          }
          /************大蛇技能效果开始************/

          /************椎拳崇技能效果开始************/
          //如果是乙方拥有椎拳崇保存乙方椎拳崇的人物生命值
          if(this.zhan1['roleid']==20&&this.zqclife1==-1){
            this.zqclife1=this.zhan1['rolelife'];
          }
          //如果是敌方拥有椎拳崇保存敌方椎拳崇的人物生命值
          if(this.zhan2['roleid']==20&&this.zqclife2==-1){
            this.zqclife2=this.zhan2['rolelife'];
          }
          /************椎拳崇技能效果开始************/

          //存放乙方攻击的内容
          var strBattle1='<b style="color:green;font-size:18px;margin-left:10px;">乙方造成</b>';
          //存放敌方攻击的内容
          var strBattle2='<b style="color:red;font-size:18px;margin-left:10px;">敌方造成</b>';
          //attack1乙方的基础攻击属性
          var attack1=parseInt(this.zhan1['roleattack']);
          //attack2敌方的基础攻击属性
          var attack2=parseInt(this.zhan2['roleattack']);

          /************东丈技能效果开始************/
          //乙方发动技能
          if(this.dz1){attack1=attack1*(1+0.5)};
          //敌方发动技能
          if(this.dz2){attack2=attack2*(1+0.5)};
          /************东丈技能效果结束************/

          /************拉尔夫技能效果开始************/
          //乙方发动技能
          if(this.lefstopnum2>0&&this.lef1){
            this.lefstopnum2--;
            attack1=parseInt(attack1*0.55);
          }else if(this.lefstopnum2==0){
            this.lef1=false;
            this.isattack2=true;
            this.lefstopnum2=-1;
          }
          //敌方发动技能
          if(this.lefstopnum1>0&&this.lef2){
            this.lefstopnum1--;
            attack2=parseInt(attack2*0.55)
          }else if(this.lefstopnum1==0){
            this.lef2=false;
            this.isattack1=true;
            this.lefstopnum1=-1;
          }
          /************拉尔夫技能效果结束************/

          /*********安迪的技能效果开始***********/
          //如果乙方停止攻击的次数不等于0的时候则减减这个停止的数值
          if(this.stopnum1>0){
            this.stopnum1--;
            if(this.ad2){attack2=parseInt(attack2*0.45);}
          }else if(this.stopnum1==0&&this.ad2){
            this.isattack1=true;
            this.ad2=false;
          }
          //如果敌方停止攻击的次数不等于0的时候则减减这个停止的数值
          if(this.stopnum2>0){
            this.stopnum2--;
            if(this.ad1){attack1=parseInt(attack1*0.45);}
          }else if(this.stopnum2==0&&this.ad1){
            this.isattack2=true;
            this.ad1=false;
          }
          /***********安迪的技能效果结束***********/

          /*********不知火舞的技能效果开始***********/
          //如果乙方停止攻击的次数不等于0的时候则减减这个停止的数值
          if(this.bzhwstopnum1>0){
            this.bzhwstopnum1--;
            attack2=parseInt(attack2*0.88);
          }else if(this.bzhwstopnum1==0){
            this.isattack1=true;
            this.bzhwstopnum1=-1;
          }
          //如果敌方停止攻击的次数不等于0的时候则减减这个停止的数值
          if(this.bzhwstopnum2>0){
            this.bzhwstopnum2--;
            attack1=parseInt(attack1*0.88)
          }else if(this.bzhwstopnum2==0){
            this.isattack2=true;
            this.bzhwstopnum2=-1;
          }
          /***********不知火舞的技能效果结束***********/

          /*********比利的技能效果开始***********/
          //如果乙方停止攻击的次数不等于0的时候则减减这个停止的数值
          if(this.blstopnum1>0){
            this.blstopnum1--;
            attack2=parseInt(attack2*0.8);
          }else if(this.blstopnum1==0){
            this.isattack1=true;
            this.blstopnum1=-1;
          }
          //如果敌方停止攻击的次数不等于0的时候则减减这个停止的数值
          if(this.blstopnum2>0){
            this.blstopnum2--;
            attack1=parseInt(attack1*0.88)
          }else if(this.blstopnum2==0){
            this.isattack2=true;
            this.blstopnum2=-1;
          }
          /***********比利的技能效果结束***********/

          //降低暴击的几率
          if(Math.random()*10<8){
            //随机增加乙方攻击力基础攻击的0.3倍
            var randAttack1=Math.floor(Math.random()*(attack1*0.3));
            //随机增加敌方攻击力基础攻击的0.3倍
            var randAttack2=Math.floor(Math.random()*(attack2*0.3));
          }else if(Math.random()*10<9){
            //随机增加乙方攻击力基础攻击的0.6倍
            var randAttack1=Math.floor(Math.random()*(attack1*0.6));
            //随机增加敌方攻击力基础攻击的0.6倍
            var randAttack2=Math.floor(Math.random()*(attack2*0.6));
          }else{
		        //随机增加乙方攻击力基础攻击的1倍
            var randAttack1=Math.floor(Math.random()*(attack1*1));
            //随机增加敌方攻击力基础攻击的1倍
            var randAttack2=Math.floor(Math.random()*(attack2*1));
		      }

          /************大蛇技能效果开始************/
          //乙方发动技能
          if(this.boss1){
            randAttack1=Math.floor(Math.random()*(attack1-attack1*0.5)+attack1*0.5);
          };
          //敌方发动技能
          if(this.boss2){
            randAttack2=Math.floor(Math.random()*(attack2-attack2*0.5)+attack2*0.5);
          };
          /************大蛇技能效果开始************/

    		  /************坂崎良技能效果开始************/
    		  //乙方发动技能
    		  if(this.bqllowdefine2){randAttack1=attack1};
    		  //敌方发动技能
    		  if(this.bqllowdefine1){randAttack2=attack2};
    		  /************坂崎良技能效果结束************/

          /************东丈技能效果开始************/
          //乙方发动技能
          if(this.dz1){randAttack1=attack1;this.dz1=false;};
          //敌方发动技能
          if(this.dz2){randAttack2=attack2;this.dz2=false;};
          /************东丈技能效果结束************/

          /************特瑞技能效果开始************/
          //乙方发动技能
          if(this.tr1){randAttack1=attack1;};
          //敌方发动技能
          if(this.tr2){randAttack2=attack2;};
          /************特瑞技能效果结束************/

          /************镇元斋技能效果开始************/
          //乙方发动技能
          if(this.zyz1){
            if(Math.random()*10<5){
              randAttack1=attack1;
            }
          };
          //敌方发动技能
          if(this.zyz2){
            if(Math.random()*10<5){
              randAttack2=attack2;
            }
          };
          /************镇元斋技能效果结束************/

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
          


          /*********陈国汉的技能效果开始*********/
          //乙方发动技能
          if(this.cghstopnum1>0){
            this.cghstopnum1--;
          }else if(this.cghstopnum1==0&&this.cgh1){
            this.isattack1=true;
          }
          //敌方发动技能
          if(this.cghstopnum2>0){
            this.cghstopnum2--;
          }else if(this.cghstopnum2==0&&this.cgh2){
            this.isattack2=true;
          }
          /*********陈国汉的技能效果结束*********/

          /*********大门五郎的技能效果开始*********/
          //乙方发动技能
          if(this.dmwlstopnum2>0){
            this.dmwlstopnum2--;
          }else if(this.dmwlstopnum2==0){
            this.isattack2=true;
            this.dmwlstopnum2=-1;
          }
          //敌方发动技能
          if(this.dmwlstopnum1>0){
            this.dmwlstopnum1--;
          }else if(this.dmwlstopnum1==0){
            this.isattack1=true;
            this.dmwlstopnum1=-1;
          }
          /*********陈国汉的技能效果结束*********/

          //如果能量达到100则根据当前的人物释放技能
          if(this.power1>=300){
            if(!this.ad2&&!this.bqllowdefine1&&!this.bqyl2&&!this.cbj2&&!this.cgh2&&!this.dmwl2&&!this.dz2&&!this.jjp2&&!this.king2&&!this.klk2&&!this.lef2&&!this.lan2&&!this.mgydn2&&!this.ml2&&!this.tr2&&!this.zyz2&&!this.lbt2&&!this.slqh2&&!(this.bzhwstopnum1!=-1)&&!this.zqc2&&!this.czj2&&!this.hw2&&!this.bs2&&!this.qjs2&&!this.sqle2&&!(this.blstopnum1!=-1)&&!this.kls2&&!this.ds2){
              //调用乙方释放技能的方法
              this.playR1.bind(this)();
              $(".imgSpan1").css("boxShadow","0 0 20px green");
              $(".imgSpan1").css("border-color","red");
              var anDiTimer1=setTimeout(function(){
                $(".imgSpan1").css("boxShadow","0 0 0 transparent");
                $(".imgSpan1").css("border-color","blue");
                clearTimeout(anDiTimer1);
              },1000);
              return;
            }
          }
          //如果能量达到100则根据当前的人物释放技能
          if(this.power2>=300){
            if(!this.ad1&&!this.bqllowdefine2&&!this.bqyl1&&!this.cbj1&&!this.cgh1&&!this.dmwl1&&!this.dz1&&!this.jjp1&&!this.king1&&!this.klk1&&!this.lef1&&!this.lan1&&!this.mgydn1&&!this.ml1&&!this.tr1&&!this.zyz1&&!this.lbt1&&!this.slqh1&&!this.bzhw1&&!(this.bzhwstopnum2!=-1)&&!this.zqc1&&!this.czj1&&!this.hw1&&!this.bs1&&!this.qjs1&&!this.sqle1&&!(this.blstopnum2!=-1)&&!this.kls1&&!this.ds1){
              //调用敌方释放技能的方法
              this.playR2.bind(this)();
              $(".imgSpan2").css("boxShadow","0 0 20px green");
              $(".imgSpan2").css("border-color","red");
              var anDiTimer2=setTimeout(function(){
                $(".imgSpan2").css("boxShadow","0 0 0 transparent");
                $(".imgSpan2").css("border-color","blue");
                clearTimeout(anDiTimer2);
              },1000);
              return;
            }
          }

          //乙方攻击的条件
          if(this.isattack1){
			      /************坂崎良技能效果开始************/
      			if(this.bqllowdefine2){
      				define2=parseInt(define2*0.5)
      				this.bqllowdefine2=false;
      			}
			      /************坂崎良技能效果结束************/

			      /************坂崎由莉技能效果开始************/			
			      if(this.bqyl2){
				      //乙方释放技能无效本次攻击
				      attack1=0;
				      //回复生命值
				      this.zhan2['rolelife']=parseInt(this.zhan2['rolelife']*(1+0.1));
				      this.bqyl2=false;
			      }
			      /************坂崎由莉技能效果结束************/
			
      			/************蔡宝健技能效果开始************/
      			if(this.cbj1){
      				define2=0;
      				attack1=parseInt(attack1*(1+0.2));
      				this.cbj1=false;
      			}
      			/************蔡宝健技能效果结束************/

      			/************陈国汉技能效果开始************/
      			if(this.cgh1){
      				attack1=parseInt(attack1*(1+2));
      				this.cgh1=false;
      			}
      			/************陈国汉技能效果结束************/

            /************大门五郎技能效果开始************/
            if(this.dmwl1){
              attack1=parseInt(attack1*(1+0.5));
              this.dmwl1=false;
            }
            /************大门五郎技能效果结束************/

            /************金家潘技能效果开始************/
            //乙方发动技能
            if(this.jjp1){
              attack1=parseInt(attack1*(1+0.8));
            }
            //敌方发动技能
            if(this.jjp2){
              define2=parseInt(define2*(1+0.5));
            }
            /************金家潘技能效果结束************/


            /************KING技能效果开始************/
            //乙方发动技能
            if(this.king1){
              attack1+=parseInt(attack2);
            }
            //敌方发动技能
            if(this.king2){
              attack1=0;
            }
            /************KING技能效果结束************/

            /************克拉克技能效果开始************/
            //乙方发动技能
            if(this.klk1){
              attack1+=parseInt(attack1*(1));
              this.klk1=false;
            }
            /************克拉克技能效果结束************/

            /************莉安娜技能效果开始************/
            //乙方发动技能
            if(this.lan1){
              attack1+=parseInt(attack1*(2.55));
              define2=parseInt(define2*0.5);
              this.lan1=false;
            }
            /************莉安娜技能效果结束************/

            /************麻宫雅典娜技能效果开始************/
            //乙方发动技能
            if(this.mgydn1){
              attack1+=parseInt(attack1*(1.45));
              this.zhan1['rolelife']+=parseInt(attack1*0.5)
              this.mgydn1=false;
            }
            /************麻宫雅典娜技能效果结束************/

            /************玛丽娜技能效果开始************/
            //乙方发动技能
            if(this.ml1){
              attack1+=parseInt(attack1*(2.2));
              this.ml1=false;
            }
            /************玛丽技能效果结束************/

            /************特瑞技能效果开始************/
            //乙方发动技能
            if(this.tr1){
              attack1+=parseInt(attack1*0.6);
              this.tr1=false;
            };
            /************特瑞技能效果结束************/

            /************镇元斋技能效果开始************/
            //乙方发动技能
            if(this.zyz1){
              attack1+=parseInt(attack1*0.5);
              this.zyz1=false;
            };
            /************镇元斋技能效果结束************/

            /************罗伯特技能效果开始************/
            //乙方发动技能
            if(this.lbt1){
              attack1+=parseInt(attack1);
              this.power2>=20?this.power2-=20:this.power2=0;
              this.lbt1=false;
            };
            /************罗伯特技能效果结束************/

            /************神乐千鹤技能效果开始************/
            //乙方发动技能
            if(this.slqh1){
              attack1+=parseInt(attack2*0.8);
            };
            //敌方发动技能
            if(this.slqh2){
              attack1=0;
            };
            /************神乐千鹤技能效果结束************/

            /************椎拳崇技能效果开始************/
            //乙方发动技能
            if(this.zqc1){
              attack1+=parseInt(attack1*0.55);
              this.zhan1['rolelife']+=parseInt((this.zqclife1-this.zhan1['rolelife'])*0.5);
              life1=this.zhan1['rolelife'];
              this.power1+=10;
              this.zqc1=false;
            };
            /************椎拳崇技能效果结束************/

            /************草稚京技能效果开始************/
            if(this.czjxy2){this.isattack2=true;this.czjxy2=false;}
            //乙方发动技能
            if(this.czj1){
              attack1+=parseInt(attack1*2.5);
              this.czj1=false;
              if(Math.random()*10<5){
                this.isattack2=false;
                this.czjxy2=true;
              }
            };
            /************草稚京技能效果结束************/

            /************红丸技能效果开始************/
            //乙方发动技能
            if(this.hw1){
              attack1=parseInt(attack1*1.5*2);
            };
            //敌方发动技能
            if(this.hw2){
              attack1=parseInt(attack1*(1-0.3));
            };
            /************红丸技能效果结束************/

            /************八神技能效果开始************/
            //乙方发动技能
            if(this.bs1){
              attack1=parseInt(attack1*3.5);
              this.power1+=20;
              this.power2>=20?this.power2-=20:this.power2=0;
              this.bs1=false;
            };
            /************八神技能效果结束************/

            /************七枷社技能效果开始************/
            //乙方发动技能
            if(this.qjs1){
              attack1=parseInt(attack1*2);
              this.zhan1["rolelife"]+=parseInt(attack1*0.3);
            };
            //敌方发动攻击
            if(this.qjs2){
              define2=parseInt(define2*(1+0.8));
            }
            /************七枷社技能效果结束************/

            /************山崎龙二技能效果开始************/
            //乙方发动技能
            if(this.sqle1){
              attack1=parseInt(this.zhan2["rolelife"]*0.35);
              this.sqle1=false;
            }
            /************山崎龙二技能效果结束************/

            /************克里斯技能效果开始************/
            //乙方发动技能
            if(this.kls1){
              attack1=parseInt(this.zhan2["rolelife"]*0.65);
              this.kls1=false;
            }
            /************克里斯技能效果结束************/

            /************大蛇技能效果开始************/
            //乙方发动技能
            if(this.ds1){
              if(Math.random()*10<5){
                attack1=parseInt(this.zhan2["rolelife"]);
              }
              this.ds1=false;
            }
            /************大蛇技能效果结束************/

            if(life2+define2>attack1){
              //图片相互碰撞 $(".block").animate({left: '+50px'}, "slow");
              $(".img1").css("left","50px");
              var timerCss=setTimeout(function(){
                $(".img1").css("left","0px");
              },300);
              //增加能量
              this.power1+=this.addpower1;
              //设置能量的增长
              $(".imgSpan1>b").css("width",this.power1)
              if(randAttack1>(attack1*0.3)){
                strBattle1+= "<b style='color:yellow;font-size:30px;margin-left:10px;'>暴击:</b>";
                $(".imgC .img1").css("transform","scale(1.2)");
                var borderTimer=setTimeout(function(){
                  $(".imgC .img1").css("transform","scale(1)");
                  clearTimeout(borderTimer);
                  borderTimer=null;
                },500);
                //改变伤害的数值
                $(".img2value").css("color","gold");
                $(".img2value").css("font-size","30px");
              }else{
                strBattle1+=":";
              }
              if(parseInt(attack1-define2)<=0){
                this.zhan2['rolelife']=this.zhan2['rolelife']-1;
                strBattle1+="<span>1点伤害!敌方剩余"+this.zhan2['rolelife']+"点生命值</span>";
                $(".img2value").html('-1');
              }else{
                this.zhan2['rolelife']=this.zhan2['rolelife']-(attack1-define2);
                strBattle1+="<span>"+parseInt(attack1-define2)+"点伤害!敌方剩余"+this.zhan2['rolelife']+"点生命值</span>";
                $(".img2value").html(-(parseInt(attack1-define2)));
              }
              $("#battle_message>div.allVsMessage").append(strBattle1);
              //计算本轮敌方消耗的生命值
              this.lifeconsume2=parseInt(this.lifecurrent2-this.zhan2['rolelife']);
              $(".enemy-life>b").css("width",this.lifewidth2-parseInt(this.lifeconsume2/this.lifecontral2)+"px");
            }else{
              strBattle1+="<p style='color:red;font-size20px;'>"+parseInt(attack1)+"点伤害!敌方阵亡</p>";
              $(".img2value").html(parseInt(attack1));
              $("#battle_message>div.allVsMessage").append(strBattle1);
              //敌方的血量为0
              $(".enemy-life>b").css("width","0px");
              //$(".imgC .img2").css("transform","scale(0)");
              clearInterval(this.timer);
              this.timer=null;
              data1[battleIndex1]['rolelife']=this.zhan1['rolelife'];
              var Index2=++battleIndex2;
              if(Index2<battleLength2){
                $(".enemy-life>b").css("width","500px");
                battleTeam(battleIndex1,Index2);
                return;
              }else{
                $("#battle_message>div.allVsMessage").append("<h2>恭喜！挑战胜利！</h2>");
                $(".img1value").html('');
                clearInterval(this.timer);
                this.timer=null;
                $(".imgC>div.showVsImg").addClass("showVImg");
                $(".clickgameover").html("<button class='btn btn-primary OverGame'>关闭</button>");
                $(".clickgameover").on('click',".OverGame",function(){
                  $("#main_Container").load(dev_location+"mainApp/selectModal.html");
                })
                BattleVictory(challgerCarId);
                return;
              }
            }
            $(".img2value").css("opacity","1");
            $(".img2value").addClass("topValue");
            var topTimer=setTimeout(function(){
              $(".img2value").removeClass("topValue");
              $(".img2value").css("opacity","0");
              //改变伤害的数值
              $(".img2value").css("color","red");
              $(".img2value").css("font-size","20px");
            }, 500);
          }

          //敌方攻击的条件
          if(this.isattack2){
      			/************坂崎良技能效果开始************/
      			if(this.bqllowdefine1){
      				define1=parseInt(define1*0.5);
      				this.bqllowdefine1=false;
      			}
      			/************坂崎良技能效果结束************/
			
      			/************坂崎由莉技能效果开始束************/			
      			if(this.bqyl1){
      				//乙方释放技能无效本次攻击
      				attack2=0;
      				//回复生命值
      				this.zhan1['rolelife']=parseInt(this.zhan1['rolelife']*(1+0.1));
      				this.bqyl1=false;
      			}
      			/************坂崎由莉能效果结束************/

      			/************蔡宝健技能效果开始************/
      			if(this.cbj2){
      				define1=0;
      				attack2=parseInt(attack2*(1+0.2));
      				this.cbj2=false;
      			}
      			/************蔡宝健技能效果结束************/

      			/************陈国汉技能效果开始************/
      			if(this.cgh2){
      				attack2=parseInt(attack2*(1+2));
      				this.cgh2=false;
      			}
      			/************陈国汉技能效果结束************/

            /************大门五郎技能效果开始************/
            if(this.dmwl2){
              attack2=parseInt(attack2*(1+0.5));
              this.dmwl2=false;
            }
            /************大门五郎技能效果结束************/

            /************金家潘技能效果开始************/
            //乙方发动技能
            if(this.jjp1){
              define1=parseInt(define1*(1+0.5));
              this.jjp1=false;
            }
            //敌方发动技能
            if(this.jjp2){
              attack2=parseInt(attack2*(1+0.8));
              this.jjp2=false;
            }
            /************金家潘技能效果结束************/

            /************KING技能效果开始************/
            //乙方发动技能
            if(this.king1){
              attack2=0;
              this.king1=false;
            }
            //敌方发动技能
            if(this.king2){
              attack2+=parseInt(this.zhan1['roleattack']);
              this.king2=false;
            }
            /************KING技能效果结束************/

            /************克拉克技能效果开始************/
            //乙方发动技能
            if(this.klk2){
              attack2+=parseInt(attack2*(1+1));
              this.klk2=false;
            }
            /************克拉克技能效果结束************/

            /************莉安娜技能效果开始************/
            //敌方发动技能
            if(this.lan2){
              attack2+=parseInt(attack2*(2.55));
              define1=parseInt(define1*0.5);
              this.lan2=false;
            }
            /************莉安娜技能效果结束************/

            /************麻宫雅典娜技能效果开始************/
            //乙方发动技能
            if(this.mgydn2){
              attack2+=parseInt(attack2*(1.45));
              this.zhan2['rolelife']+=parseInt(attack2*0.5);
              this.mgydn2=false;
            }
            /************麻宫雅典娜技能效果结束************/

            /************玛丽娜技能效果开始************/
            //乙方发动技能
            if(this.ml2){
              attack2+=parseInt(attack2*(2.2));
              this.ml2=false;
            }
            /************玛丽技能效果结束************/

            /************特瑞技能效果开始************/
            //乙方发动技能
            if(this.tr2){
              attack2+=parseInt(attack2*0.6);
              this.tr2=false;
            };
            /************特瑞技能效果结束************/

            /************镇元斋技能效果开始************/
            //乙方发动技能
            if(this.zyz2){
              attack2+=parseInt(attack2*0.5);
              this.zyz2=false;
            };
            /************镇元斋技能效果结束************/

            /************罗伯特技能效果开始************/
            //乙方发动技能
            if(this.lbt2){
              attack2+=parseInt(attack2);
              this.power1>=20?this.power1-=20:this.power1=0;
              this.lbt2=false;
            };
            /************罗伯特技能效果结束************/

            /************神乐千鹤技能效果开始************/
            //乙方发动技能
            if(this.slqh1){
              attack2=0;
              this.slqh1=false;
            };
            //敌方发动技能
            if(this.slqh2){
              attack2+=parseInt(attack1*0.8);
              this.slqh2=false;
            };
            /************神乐千鹤技能效果结束************/

            /************椎拳崇技能效果开始************/
            //敌方发动技能
            if(this.zqc2){
              attack2+=parseInt(attack2*0.55);
              this.zhan2['rolelife']+=parseInt((this.zqclife2-this.zhan2['rolelife'])*0.5);
              life2=this.zhan2['rolelife'];
              this.power2+=10;
              this.zqc2=false;
            };
            /************椎拳崇技能效果结束************/

            /************草稚京技能效果开始************/
            if(this.czjxy1){this.isattack1=true;this.czjxy1=false;}
            //敌方发动技能
            if(this.czj2){
              attack2+=parseInt(attack2*2.5);
              this.czj2=false;
              if(Math.random()*10<5){
                this.isattack1=false;
                this.czjxy1=true;
              }
            };
            /************草稚京技能效果结束************/

            /************红丸技能效果开始************/
            //敌方发动技能
            if(this.hw2){
              attack2=parseInt(attack2*1.5*2);
              this.hw2=false;
            };
            //敌方发动技能
            if(this.hw1){
              attack2=parseInt(attack2*(1-0.3));
              this.hw1=false;
            };
            /************红丸技能效果结束************/

            /************八神技能效果开始************/
            //乙方发动技能
            if(this.bs2){
              attack2=parseInt(attack2*3.5);
              this.power2+=20;
              this.power1>=20?this.power1-=20:this.power1=0;
              this.bs2=false;
            };
            /************八神技能效果结束************/

            /************七枷社技能效果开始************/
            //敌方发动技能
            if(this.qjs2){
              attack2=parseInt(attack2*2);
              this.zhan2["rolelife"]+=parseInt(attack2*0.3);
              this.qjs2=false;
            };
            //敌方发动攻击
            if(this.qjs1){
              define1=parseInt(define1*(1+0.8));
              this.qjs1=false;
            }
            /************七枷社技能效果结束************/

            /************山崎龙二技能效果开始************/
            //敌方发动技能
            if(this.sql21){
              attack2=parseInt(this.zhan1["rolelife"]*0.35);
              this.sqle2=false;
            }
            /************山崎龙二技能效果结束************/

            /************克里斯技能效果开始************/
            //乙方发动技能
            if(this.kls2){
              attack2=parseInt(this.zhan1["rolelife"]*0.65);
              this.kls2=false;
            }
            /************克里斯技能效果结束************/

            /************大蛇技能效果开始************/
            //乙方发动技能
            if(this.ds2){
              if(Math.random()*10<5){
                attack2=parseInt(this.zhan1["rolelife"]);
              }
              this.ds2=false;
            }
            /************大蛇技能效果结束************/

            if(life1+define1>attack2){
              //图片相互碰撞 $(".block").animate({left: '+50px'}, "slow");
              $(".img2").css("right","50px");
              var timerCss=setTimeout(function(){
                $(".img2").css("right","0px");
              },300);
              //增加能量
              this.power2+=this.addpower2;
              //设置能量的增长
              $(".imgSpan2>b").css("width",this.power2);
              if(randAttack2>(attack2*0.3)){
                strBattle2+= attack2==0?":":"<b style='color:yellow;font-size:30px;margin-left:10px;'>暴击:</b>";
                $(".imgC .img2").css("transform","scale(1.2)");
                setTimeout(function(){
                  $(".imgC .img2").css("transform","scale(1)");
                },500);
                //改变伤害的数值
                $(".img1value").css("color","gold");
                $(".img1value").css("font-size","30px");
              }else{
                strBattle2+=":";
              }
              if(parseInt(attack2-define1)<=0){
                this.zhan1['rolelife']=this.zhan1['rolelife']-1;
                strBattle2+="<span>1点伤害!乙方剩余"+this.zhan1['rolelife']+"点生命值</span>";
                $(".img1value").html('-1');
              }else{
                this.zhan1['rolelife']=this.zhan1['rolelife']-(attack2-define1);
                strBattle2+="<span>"+parseInt(attack2-define1)+"点伤害!乙方剩余"+this.zhan1['rolelife']+"点生命值</span>";
                $(".img1value").html(-(parseInt(attack2-define1)));
              }       
              $("#battle_message>div.allVsMessage").append(strBattle2);
              //计算本轮乙方消耗的生命值
              this.lifeconsume1=parseInt(this.lifecurrent1-this.zhan1['rolelife']);
              $(".friendly-life>b").css("width",this.lifewidth1-parseInt(this.lifeconsume1/this.lifecontral1)+"px");
            }else{
              strBattle2+="<p style='color:red'>"+parseInt(attack2)+"点伤害!乙方阵亡</p>";
              $(".img1value").html(parseInt(attack2));
              $("#battle_message>div.allVsMessage").append(strBattle2);
              //$(".imgC .img1").css("transform","scale(0)");
              //清空血量条
              $(".friendly-life>b").css("width","0px");
              clearInterval(this.timer);
              this.timer=null;
              data2[battleIndex2]['rolelife']=this.zhan2['rolelife'];
              var Index1=++battleIndex1;
              if(Index1<battleLength1){ 
                $(".friendly-life>b").css("width","500px");
                battleTeam(Index1,battleIndex2);
                return;
              }else{
                $("#battle_message>div.allVsMessage").append("<h2>很遗憾。。。挑战失败</h2>");
                $(".img2value").html('');
                clearInterval(this.timer);
                this.timer=null;
                $(".imgC>div.showVsImg").addClass("showDImg");
                $(".clickgameover").html("<button class='btn btn-primary OverGame'>关闭</button>");
                $(".clickgameover").on('click',".OverGame",function(){
                  window.location.reload();
                })
                BattleDefeated();
                return;
              }
            } 
            $(".img1value").addClass("topValue");
            $(".img1value").css("opacity","1");
            var topTimer=setTimeout(function(){
              $(".img1value").removeClass("topValue");
              $(".img1value").css("opacity","0");
              //改变伤害的数值
              $(".img1value").css("color","red");
              $(".img1value").css("font-size","20px");
            },500);  
          }
        },
        playR1:function(){
		      var str="<h2>--乙方发动技能--</h2>";
          this.power1=0;
          var me=this;
          var roleid=me.zhan1['roleid'];
          switch(roleid){
            case "1" :
            me.isattack2=false;
            me.stopnum2=3;
            me.ad1=true;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
      			case "2" :
      			me.bqllowdefine2=true;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
      			case "3" :
      			me.bqyl1=true;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
      			case "4" :
      			me.cbj1=true;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
      			case "5" :
      			me.cgh1=true;
      			me.isattack1=false;
      			me.cghstopnum1=1;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
            case "6" :
            me.dmwl1=true;
            me.isattack2=false;
            me.dmwlstopnum2=1;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "7" :
            me.dz1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "8" :
            me.jjp1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "9" :
            me.king1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "10" :
            me.klk1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "11" :
            me.lef1=true;
            me.isattack2=false;
            me.lefstopnum2=3;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "12" :
            me.lan1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "13" :
            me.mgydn1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "14" :
            me.ml1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "15" :
            me.tr1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "16" :
            me.zyz1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "17" :
            me.lbt1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "18" :
            me.slqh1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "19" :
            me.bzhw1=false;
            me.isattack2=false;
            me.bzhwstopnum2=3;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "20" :
            me.zqc1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "21" :
            me.czj1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "22" :
            me.hw1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "23" :
            me.bs1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "24" :
            me.qjs1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "25" :
            me.sqle1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "26" :
            me.bl1=true;
            me.isattack2=false;
            me.blstopnum2=5;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "27" :
            me.kls1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "28" :
            me.ds1=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            default : window.location.reload();
          }
        },
        playR2:function(){
		      var str="<h2>--敌方发动技能--</h2>";
          this.power2=0;
          var me=this;
          var roleid=me.zhan2['roleid'];
          switch(roleid){
            case "1" :
            me.isattack1=false;
            me.stopnum1=3;
            me.ad2=true;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
      			case "2" :
      			me.bqllowdefine1=true;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
      			case "3" :
      			me.bqyl2=true;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
      			case "4" :
      			me.cbj2=true;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
      			case "5" :
      			me.cgh2=true;
      			me.isattack2=false;
      			me.cghstopnum2=1;
      			$("#battle_message>div.allVsMessage").append(str);
      			break;
            case "6" :
            me.dmwl2=true;
            me.isattack1=false;
            me.dmwlstopnum1=1;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "7" :
            me.dz2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "8" :
            me.jjp2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "9" :
            me.king2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "10" :
            me.klk2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "11" :
            me.lef2=true;
            me.isattack1=false;
            me.lefstopnum1=3;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "12" :
            me.lan2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "13" :
            me.mgydn2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "14" :
            me.ml2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "15" :
            me.tr2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "16" :
            me.zyz2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "17" :
            me.lbt2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "18" :
            me.slqh2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "19" :
            me.bzhw2=false;
            me.isattack1=false;
            me.bzhwstopnum1=3;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "20" :
            me.zqc2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "21" :
            me.czj2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "22" :
            me.hw2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "23" :
            me.bs2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "24" :
            me.qjs2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "25" :
            me.sqle2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "26" :
            me.bl2=true;
            me.isattack1=false;
            me.blstopnum1=5;
            $("#battle_message>div.allVsMessage.allVsMessage").append(str);
            break;
            case "27" :
            me.kls2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            case "28" :
            me.ds2=true;
            $("#battle_message>div.allVsMessage").append(str);
            break;
            default : window.location.reload();
          }
        }
      }
      //某方阵亡继续调用这个方法
      function battleTeam(n1,n2){
        startBattle.init(data1[n1],data2[n2]);
      }
