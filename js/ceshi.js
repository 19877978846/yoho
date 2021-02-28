//放大镜
     //获取所有操作对象
       var details=document.querySelector(".details")//.details-le获取的offsetLeft是0，换个父级代替获取
       console.log(details);
       var detailsLe=document.querySelector(".details-le")//图片盒子
       var detailsLeImg=detailsLe.querySelector("img")//图片
       var mask=document.querySelector(".mask")//遮罩层
      //  var divImgs=document.querySelector(".divImgs")
      //  var imgs=divImgs.querySelectorAll("img")
       var imgShow=document.querySelector(".imgShow")//右侧显示盒子
       var rightImg=imgShow.querySelector("img")//右侧显示图片
       
       //给左边大盒子对象绑定三个事件
       detailsLe.onmouseover=function(e){
           //让隐藏的内容显示
           mask.style.display="block"
           imgShow.style.display='block'
       }
       //移动
       detailsLe.onmousemove=function(e){
           var e = e||window.event
           move(e)
       }
       //移出
       detailsLe.onmouseout=function(){
           //让显示的内容隐藏
           mask.style.display="none"
           imgShow.style.display='none'
       }

       //移动函数
       function move(e){
            //获取当前移动距离
            var x = e.pageX
          var x2 = details.offsetLeft
            var x1=e.pageX-details.offsetLeft-parseInt(mask.offsetWidth/2)
            var y1=e.pageY-details.offsetTop-parseInt(mask.offsetHeight/2)
            console.log(x2);
            //设置移动范围
            var maxX=detailsLe.offsetWidth-mask.offsetWidth
            var maxY=detailsLe.offsetHeight-mask.offsetHeight
            //右边图片的移动
            var rightX,rightY
            //水平判断
            if(x1<=0){
                mask.style.left="0px"
                rightX=0
            }else if(x1>=maxX){
                mask.style.left=maxX+"px"
                rightX=maxX
            }else{
                mask.style.left=x1+"px"
                rightX=x1
            }

            //垂直方式
            if(y1<=0){
                mask.style.top="0px"
                rightY=0
            }else if(y1>=maxY){
                mask.style.top=maxY+'px'
                rightY=maxY
            }else{
                mask.style.top=y1+'px'
                rightY=y1
            }
            //让右边图片进行移动
            rightImg.style.top=-2*rightY+'px'
            rightImg.style.left=-2*rightX+'px'
       }
 