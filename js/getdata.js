$(document).ready(function($){

     //创建获得发布天数的函数
     var long=function(str1,str2){
         start=str1.toString().replace(/-/g,"/");
         var startdate=new Date(start);
         end=str2.toString().replace(/-/g,"/");
         var enddate=new Date(end);
         var time=startdate.getTime()-enddate.getTime();
         var days=parseInt(time/(1000 * 60 * 60 * 24));
         return days;
      }
      //点击大菜单然诺科技集团的时候，实现数据的局部刷新
      var ranNuo=function(data){
         var arr=data.data;
                 var len=arr.length;
                 var html='';         
                 for(var i=0;i<len;i++){
                         html+="<div class='jobwrap"+" Num"+i+"'><div class='clearfix'><div class='jobThings'><div class='thing1 fl'><p class='jobMoney'><span class='post'>高级工程师</span>&nbsp;/&nbsp;<span class='money'>12K~20K</span>&nbsp;/&nbsp;<span class='depart'>然诺科技<span></p><div class='status'>招聘中</div></div><div class='thing2 fr'><div class='reledata'>发布<span class=days>112</span>天：<span class='resume'>12</span>简历-<span class='people'>7</span>人选-<span class='interview'>2</span>面试-<span class='offer'>1</span>offer-<span class='entry'>1</span>入职</div></div></div><div class='jobRequire'><p><span>岗位要求：</span><span class='descri'>1)&nbsp;本科以上学历，3年以上java开发经验；2)&nbsp;有HRSaaS相关开发经验最佳；3)&nbsp;更多要求更多要求更多要求更多要求；4)&nbsp;更多要求更多要求更多要求更多要求;5)&nbsp;更多要求更多要求更多要求更多要求;</span></p></div></div></div>";
                     };
                 $('.jobRecom').html('');
                 $('#content').height(len*116+210+"px");
                 $('.jobRecom').html(html);   
                 for(var i=0;i<len;i++){
                         var Num=".Num"+i;
                         //debugger;
                         //console.log(arr[i]);
                         $(Num+" .jobMoney .post").html(arr[i]['name']);
                         $(Num+" .jobMoney .depart").html('暂无数据');
                         $(Num+" .jobMoney .money").html('暂无数据');
                         if(arr[i]['status']==0){
                               $(Num+" .status").html('招聘中');
                         }else if(arr[i]['status']==1){
                               $(Num+" .status").html('招聘完');
                         }else{
                               $(Num+" .status").html('暂停中');
                         }
                               $(Num+" .jobRequire .descri").html("因为相同的后台数据的书写没有统一的格式，直接读写出来会影响布局美观，这里就不一一演示了");             
                var matchReg = /^\d{4}-\d{1,2}-\d{1,2}/,
                str1=arr[i]['date'].match(matchReg),
                str2=arr[i]['beginDate'].match(matchReg);
                var days=long(str1,str2);
               $(Num+" .thing2 .days").html(days);
            }

      };
      //将ajax封装成一个函数，方便调用
      var ajx=function(func){
            var url="http://www.rulertech.com:3000/api/getAllOfferJobs";
            /*var url="https://rulertech.com:30000/api/getSaasPorts";*/
             $.ajax({
                url: url,
                type: 'GET', 
                dataType: 'json'
                }).done(function(data){
                           func(data);  
                }).fail(function() {
                           console.log('出错了');
                }).always(function() {
                           console.log('why always me!');
           });       
         }
      $("#bigmenu .selected").click(function(){
          ajx(ranNuo);
      })


    //判断小菜单中职位是否被选中，若被选中，即更新大菜单

    /*var position=function(data){
               var arr=data.data;
               var len=arr.length; 
               var j=1;
               for(var i=0;i<len;i++){
                
                $("#bigmenu ul li:nth-child("+j+") a span").html(arr[i]['name']);
                 j++;
               }; 

        
    }

    if($("#bigmenu ul li:nth-child(4)").hasClass("selected")){
       ajx(position);
    }*/
    $.get("https://rulertech.com:30000/api/getSaasPorts",function(json){
      if(json.result){
        let $bu = $("bigMenu ul");
        $.each(json.data,function(idx,item){
          $bu.append(`<li role="presentation" value="personnal"><a href="#" port="{item.port}"><span>${!!item.subName?item.subName:item.name}</span></a>
            <span class="iconLock"><img src="[[{imgs/lock.png}]]" alt=""></span></li>`);
        })
      }
    })



     
    
})