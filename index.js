$(function(){
   //var poker=[{colors:'c',number:'num'}];
  var tishi=$('.zuozi .tishi');
  var xiezi=$('.tishi .title')
  var chahao=$('.chahao')
  var queren=$('.queren')
  var delay=function(){
       tishi.css({'display':'none'}).animate({opacity:0})
    }
  chahao.on('click',function(){delay()})
  queren.on('click',function(){delay()})
   var warn=function(){    
    tishi.css({'display':'block'}).animate({opacity:1})
    setTimeout(delay,3000)
   }

   // 计时器
   var $jishi=$('.time .font');
   var time=0; 
   var min=0;
   var second=0;
   var state;
  function jishi(){
     if(state=="over"){
      time = 0;
      min=0;
      second=0;
      $jishi.html("00:00");
    }
    time +=1; 
    second=time%60;
    if(time%60 == 0){
      min = parseInt(min);
      min += 1;
      min = (min<10)?'0'+min:min;
    }
    second = (second<10)?'0'+second:second;
    $jishi.html(min +':'+second);
    state="play"
  }

  var t=setInterval(jishi,1000)
  clearInterval(t);
  // 得分
  var defen=0;
  var $fenshu=$('.score .font');
  var fenshu=function(val){
    $fenshu.html(val)
  }
  var cli=0;
  var star= function (){
     state="over"
   var poker=[];
   var colors=['c','h','d','s'];
   var biao={};
   while(poker.length !== 52){
      var num=Math.ceil(Math.random()*13);
      var huase=colors[Math.floor(Math.random()*4)];   
      if(!biao[huase+'_'+num]){  
         poker.push({color:huase,number:num});        
         biao[huase+'_'+num]=true;
      }
   }
   //扑克的 动画
   var d=0;
   var number1={
     1:'A',
     2:'2',
     3:'3',
     4:'4',
     5:'5',
     6:'6',
     7:'7',
     8:'8',
     9:'9',
    10:'T',
    11:'J',
    12:'Q',
    13:'K'
   }
    var index=-1;
    var items=[];

 
   for(var i=0;i<7;i++){
      var t=i*30+25;             
      for(var j=0;j<(i+1);j++){
         index += 1;
         items=poker[index];
          d += 60;
         var l=(6-i)*40+80*j+25;
         $('<div>')
         .addClass('pai shang')
         .css({'background-image':'url(image/'+number1[poker[index].number]+poker[index].color+'.png)'})
         .attr('id',i+'_'+j)
         .data('shu',items.number)
         .appendTo('.zuozi')
         .delay(d)
         .animate({
            top:t,
            left:l,
            opacity:1
          })
      }      
   }
  
    //管理剩余的牌
   for(;index<poker.length;index++){    
      items=poker[index];
       $('<div>')
         .addClass('pai zuo')
         .css({'background-image':'url(image/'+number1[poker[index].number]+poker[index].color+'.png)'})
         .data('shu',items.number)
         .appendTo('.zuozi')
         .delay(index*60)
         .animate({
            top:330,
            left:150,
            opacity:1
          })}
    //判断是否有牌
   var zhe=function(el){
      var x=Number($(el).attr('id').split('_')[0]);
      var y=Number($(el).attr('id').split('_')[1]);   
      return $('#'+(x+1)+'_'+y).length||$('#'+(x+1)+'_'+(y+1)).length;

   }

   // 点击牌
   var last;
   $('.pai').on('click',function(){ 
   //判断游戏是否结束
       var arr1=[];
       var over=0;
       $('.shang').each(function(i,ele){
          if(!zhe(ele)){
            arr1.push($(ele).data('shu'));
          }
        });
       for(var i;i<arr1.length;i++){
        if(arr1[i]===13){
          over += 1;
        }
        for(var j;j<arr1.length;j++){
          if(arr1[i]+arr1[j]==13){
            over += 0.5
          }
        }
       }

       $('.zuo,.you').each(function(e,elem){
        if($(elem).data('shu')===13){
          over+=1;
        }
        for(var j=0;j<arr1.length;j++){
        if(arr1[j]+$(elem).data('shu')===13){
          over+=1;
        }
       }})

       if(over==0){
                 xiezi.html("游戏结束")
                warn();
                againgame();
                clearInterval(t);
            }

          $('.zongpeidui .font').html(over);
      if($(this).hasClass('shang')&&zhe(this)){
          return;
      }else{
       var pei=0;
        var mm=$(this)
        // 判断  能够配比的数目
        $('.shang').each(function(i,ele){
          if(!zhe($('.shang')[i])&&($(ele).data('shu')+mm.data('shu')===13)){ pei+=1;}
        })
        $('.zuo,.you').each(function(e,elem){
          if($(elem).data('shu')+mm.data('shu')===13){ pei+=1;}
        })
        $('.kepeidui .font').html(pei);

           // 点击的动画
           $(this).toggleClass('chulie');
           if($(this).hasClass('chulie')){
              $(this).addClass('chulie').animate({'top':'-=20'})
            }
          if($(this).data('shu')===13){
            defen+=10;
            fenshu(defen)

             $(this).animate({top:0,left:375,opacity:0}).queue(function(){
                      $(this).remove();
               });
             return;
          }   
          // 点第一张
          if(!last){
            last=$(this);//给第一张赋值
            //点第二张
          }else{
            var current=$(this);
            // if(last.attr('id')==current.attr('id')){
            //    $(this).animate({'top':'+=20'})
            //    $('.chulie').removeClass('chulie');
            // }
            // 两张牌
            if(last.data('shu')+current.data('shu')===13){
              defen+=20;
              fenshu(defen)
              //做完动画必须用队列移除
               last.delay(400).animate({top:0,left:500,opacity:0}).queue(function(){
                      $(this).remove();
               });
               current.animate({top:0,left:500}).queue(function(){
                     $(this).remove();
               });        
              }else{
               last.delay(400).animate({top:'+=20'})
               current.animate({top:'+=20'})
               $('.chulie').removeClass('chulie');
                }
                last=null;
        }  
      }
   })
     // 点击往右移动
     var indexs=0;
     $('.move-right').on('click',function(){
      indexs+=1;
      $('.pai.zuo').eq(-1).removeClass('zuo').animate({
         left:375
      }).css({
         zIndex:indexs,
       }).addClass('you');  
    })
    // 点击往左移动
     $('.move-left').on('click',function(){
      if($('.pai.zuo').length>0){
        xiezi.html("不能点击，请等待左边牌发完！！")
        warn();
         return;
      }else{
      if(cli>3){
        xiezi.html("已超过三次，不能换牌了！！")
        warn();
         return;
      }else{cli+=1;
      $('.zuozi .you').each(function(i,el){
        
         $(this).delay(60*i).css({zIndex:0}).removeClass('you').addClass('zuo')
         .animate({left:150})
      })}}
     })
  }
  // 点击开始游戏
  $('.meau .stargame').on('click',function(){

      if($('.pai').length){
        xiezi.html("正在进行游戏，请点击重新开始，此提示三秒后自动消失!!")
        warn();
        return
      }else{ star() 
      t=setInterval(jishi,1000)      
       }
  })
  var againgame=function(){
     $(' .zuozi .pai').remove();
  }
  $('.meau .againgame').on('click',function(){
      againgame();
      clearInterval(t);
      $jishi.html("00:00")
      t=setInterval(jishi,1000)
      star();
  })
   var dianji=0;
  $('.youxijieshao').on('click',function(){
    dianji+=1;    
    if(dianji%2==0){$('.jieshao').show(2000)}
      else{
    $('.jieshao').hide(2000)
    }
  })
  $('.closew').on('click',function(){
    alert('你即将离开游戏！！！')
    window.close();
  })  
})