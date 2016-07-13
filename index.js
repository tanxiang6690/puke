$(function(){
    //动画的练习

	// //animate():动画
	// //queue()队列
	// //dequeue():出对
	// //delay()：延迟时间
	// //stop();
	// $(".animation")
	// .animate({width:400},1000)
	// .delay(1000)
	// .queue(function(){
	// 	$(this).css('backgroundColor',"yellow").dequeue();
	// })
	// .animate({height:400},1000)

	//子弹的练习
 //    for(var i=0;i<1000;i++){
	//     var w=Math.floor(Math.random()*4+3);
	//     var b=Math.floor(Math.random()*100+155);
	//     var left=Math.floor(Math.random()*$(document).width());
	//     var top=Math.floor(Math.random()*$(document).height());
	// 	$("<div>")
	// 	.addClass("zidan")
	// 	.width(w)
	// 	.height(w)
	// 	.css({
	// 		backgroundColor:'rgba(41,41,'+b+',0.4)'
	// 	})
	// 	.appendTo('body')
	// 	.delay(i*10)
	// 	.animate({
	// 		left:left,
	// 		top:top
	// 	})
	// }

    //设置牌的随机数
    var poker=[];
    var colors=["c","h","d","s"];
    var biao=[];
    while (poker.length < 52 ){
        //设定牌的花色
        var huaSe=colors[Math.floor(Math.random()*4)];
        //设定牌的数字
        var shuZi=Math.ceil(Math.random()*13);
        var item={huaSe:huaSe, shuZi:shuZi};
        //去掉重复的牌,
        if(!biao[huaSe+'-'+shuZi]){
            poker.push(item);
            biao[huaSe+"-"+shuZi]=true;
        }
    }
    //console.table(poker)
    //var biao2=[{1:"1"}, {2:"2"}, {3:"3"}, {4:"4"}, {5:"5"}, {6:"6"}, {7:"7"}, {8:"8"}, {9:"9"}, {10:"11"}, {11:"12"}, {12:"13"}, {13:"14"}]

    //点击发牌
    $(".faPai").on("click",function(){
        //设置行数/列数/牌的动画
        var index=0;
        for(var i=0;i<7;i++){                  //行数
            for (var j=0;j<i+1;j++){           //列数
                index+=1;
                $('<div>')
                    .addClass("pai shang")
                    .attr("id",i+"-"+j)
                    .data("shuZi",poker[index].shuZi)
                    .appendTo(".zhuozi")
                    .css({
                        backgroundImage:"url(./image/"+poker[index].shuZi+poker[index].huaSe+".png)"
                    })
                    .delay(index*30)
                    .animate({
                        top:i*50,
                        left:(6-i)*50+j*100,
                        opacity:1
                    })
            }
        }
        //给下面添加牌
        var d=0;
        for(;index < poker.length; index++){
            d+=50;
            $("<div>")
                .addClass("pai left")
                .attr("id",i+"-"+j)
                .data("shuZi",poker[index].shuZi)
                .css({
                    backgroundImage:"url(./image/"+poker[index].shuZi+poker[index].huaSe+".png)"
                })
                .appendTo(".zhuozi")
                .delay(d)
                .animate({
                    top:460,
                    left:80,
                    opacity:1
                })
        }

        //让下面的操作出现
    })   
    
    //点击重新开始
    $(".restart").on("click",function(){
        window.location.reload();
    })
    //判断点击的牌是否被压住的函数；
    var killed = function(e){
            var x=Number($(e).attr("id").split("-")[0]);
            var y=Number($(e).attr("id").split("-")[1]);
            return ($("#"+(x+1)+"-"+y).length || $("#"+(x+1)+"-"+(y+1)).length);

    }

    var pervious=null;
    $(".zhuozi .pai").on('click',function(){
        //判断点击的牌是否有上一张牌的类名并且被被压住
        if($(this).hasClass('pervious') && killed(this)){
            return;
        }
        //判断是否是K的情况；
        if($(this).data("shuZi")===13){
            $(this).animate({
                top:0,
                left:700,
                opacity:0
            }).queue(function(){
                $(this).remove();
            })
            return;
        }

        //被选中的牌设置边框和点击时上移
        $(this).toggleClass("chulie");
        if($(this).hasClass('chulie')){
            $(this).animate({top:'-=30'});
        }else{
            $(this).animate({top:'+=30'});
        }

        //第一次点击
        if(!pervious){
            pervious=$(this);
        }else{
            //第二次点击
            if((pervious.data("shuZi") + $(this).data("shuZi"))===13){
                $(".chulie").animate({
                        top:0,
                        left:700,
                        opacity:0
                    }).queue(function(){
                         $(".chulie").remove();
                    })
                pervious=null;
            }else{
                $(".chulie")
                    .removeClass("chulie")
                    .animate({
                        top:"+=30",
                    })
                pervious=null;
            }
        }
    })

    //换牌的按钮
    var zIndex=0;
    $(".zhuozi .change").on("click",function(){
        zIndex++;
       $(".pai.left")
           .eq(-1)
           .css({zIndex:zIndex})
           .removeClass("left")
           .addClass("right")
           .animate({
               top:460,
               left:530
           })
    })

    //所有牌返回的次数
    var time=0;
    $(".zhuozi .return").on("click",function(){
        time +=1;
        if($(".pai.left").length){
            return;
        }
        if(time>3){
            $(".gameOver img")
            .css({
                transform:"translateY(0)"
            });
            return;
        }
        $(".pai.right").each(function(i,el){
            $(this)
                .removeClass("right")
                .addClass("left")
                .delay(i*30)
                .animate({
                    top:460,
                    left:80
                })
                .css({zIndex:0})
        })
    })

    //鼠标划上按钮的效果
    $(".zhuozi .change, .zhuozi .return").on("mouseover",function(){
        $(this).css({
            transform:"scale(1.2,1.2)"
        })
    })
    $(".zhuozi .change, .zhuozi .return").on("mouseout",function(){
        $(this).css({
            transform:"scale(1,1)"
        })
    })
    

    //开始按钮
    $(".screen").on("click",function(){
        $(".screen .leftScreen").css({
            transform:"translateX(-500%)"
        }) 
        $(".screen .rightScreen").css({
            transform:"translateX(500%)"
        }) 
        $(".screen .start").animate({top:"-500%"})
        $(this).css({
            zIndex:0
        })
        $(".operate").animate({
            opacity:1
        })
    })
})