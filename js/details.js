var path = location.search
console.log(path);
if(path){
  if (localStorage.getItem('goods')) {
    // 获取购物车数据
    var goodsArr = JSON.parse( localStorage.getItem('goods') )
    // 获取所有数据
    $.ajax({
      url: '../data/data.json',
      type: 'get',
      dataType: 'json',
      success: function (json){
        console.log(json);
        var domStr = ''
        $.each(json,function (index,item){
          $.each(goodsArr,function (i,obj){
            nu = obj.num
            // console.log(nu);
            if (item.id === obj.id) {
              domStr = `
            <div class="details-le">
              <img src="${item.imgurl}" alt="">
              <div class="mask"></div>
            </div>
            <div class="imgShow">
              <img src="${item.imgurl}" alt="">
            </div>
            <div class="details-ri">
              <ul>
                <li><p>${item.tit}</p></li>
                <li><p><span>吊牌价：</span>¥${item.newprice}</p></li>
                <li>
                  <span>
                    数量：<input type="button" value="-"><input type="text" value="1"><input type="button" value="+">
                  </span>
                </li>
                <li>
                  <a class="addCart" data-id="${item.id}" href="javascript:;">加入购物车</a>
                </li>
              </ul>
            </div> 
            `
            }
          })
        })
        $('.details').html(domStr)
      // var a = document.querySelector('.details-le')
      // var b = document.querySelector('.details-ri')
      // console.log(a);
      // console.log(b);
  
  //放大镜
       //获取所有操作对象
       var details=document.querySelector(".details")//.details-le获取的offsetLeft是0，换个父级代替获取
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
  
  
      }
    })
    $('.details').on('click',function (e){
      // console.log(e.target);
      var target = e.target;
      // console.log(target.value);
      // 判断点击加号
      if(target.value == '+'){
        // console.log(target.previousSibling);
        var numb = target.previousSibling.value
        numb++
        nu++
        console.log(nu);
        $.each(goodsArr,function(i,item){
          item.num = nu
          // console.log(item.num);
          // console.log(goodsArr);
           // 数据更新到本地存储
      localStorage.setItem('goods', JSON.stringify(goodsArr) )
        })
        // console.log(numb);
        target.previousSibling.value = numb
      }
      //判断点击 减号
      if(target.value == '-'){
        // console.log(target.previousSibling);
        var jian = target.nextSibling.value
        jian--
        if(jian<0){
          jian = 0  
        }else{
          nu--
          console.log(nu);
          $.each(goodsArr,function(i,item){
            item.num = nu
            // console.log(item.num);
            // console.log(goodsArr);
             // 数据更新到本地存储
        localStorage.setItem('goods', JSON.stringify(goodsArr) )
          })
        }
        target.nextSibling.value = jian
      }
      if(target.innerHTML == '加入购物车'){
       
        location.href = './cartlist.html?=details'
      }
      
    })
  
        //点击加入购物车
        $('.details').on('click','.addCart',function (){
          // 存储商品id和数量
          // "shoppingArr"=>"[{'id':'tm1','num':2},{'id':'tm2','num':1}]"
          var id = $(this).attr('data-id')//当前点击商品的id
          console.log(id);
          var shoppingArr = []//购物车数据的数组
          if (localStorage.getItem('shopping')) {
              shoppingArr = JSON.parse( localStorage.getItem('shopping') )
          }
          // 标记购物车是否已有该商品
          var flag = false
          // 判断购物车是否已有该商品
          $.each(shoppingArr,function (index,item){
          if (item.id === id) {//购物车已该商品
              item.num++//商品数量+1
              flag = true
          }
          })
          if (!flag) {
          // push一个商品对象到shoppingArr
          shoppingArr.push({"id":id,"num":nu})
          }
          // 数据更新到本地存储
          localStorage.setItem('shopping', JSON.stringify(shoppingArr) )
          // alert('加入购物车成功！')
    
        
      })
    
  
  } else {
    var newLi = '<li>购物车暂无数据！</li>'
    $('.list').html(newLi)
  }
}else{
  // alert('非法进入')
  // location.href = './index.html'
}