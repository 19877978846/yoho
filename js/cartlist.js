var path = location.search
if(path){
  if (localStorage.getItem('shopping')) {
    // 获取购物车数据
    var goodsArr = JSON.parse( localStorage.getItem('shopping') )
    // 获取所有数据
    $.ajax({
      url: '../data/data.json',
      type: 'get',
      dataType: 'json',
      success: function (json){
        // console.log(json);
        var domStr = ''
        $.each(json,function (index,item){
          $.each(goodsArr,function (i,obj){
            if (item.id === obj.id) {
              domStr += `
              <li>
                <p>
                <input type="checkbox" name="xuan">
                </p>
                <p>
                  <img src="${item.imgurl}" alt="">
                </p>
                <p>${item.tit}</p>
                <p>￥<span>${item.newprice}</span></p>
                <p class="cart-num">
                  <input type="button" value="-" class="jian">
                  <input type="text" value="${obj.num}" >
                  <input type="button" value="+" class="jia" data-id="${item.id}">
                </p>
                <p>￥<span>${item.newprice*obj.num} </span></p>
                <p>
                  <em>删除</em>
                  <a>加入收藏夹</a>
                </p>
            </li>
              `
            }
          })
        })
        $('.cart').html(domStr)
      }
    })
  
      //点击减号减1
    $('.cart').on('click','.jian',function (){
        var id = $(this).parents('.cart-num').children('.jia').attr("data-id")
        console.log(id);
        var _this = this
        location.reload()//刷新(点击按钮价格跟着变化)
        console.log(goodsArr);
        $.each(goodsArr,function(i,item){
          if(item.id === id){
            var sum = item.num-1
            $(_this).next().val(sum)
            item.num = sum
            //数量小于1减号禁用
            if(sum<=1){
              $(_this).prop('disabled','disabled')
            }
          }
        })
        localStorage.setItem('shopping',JSON.stringify(goodsArr))
    })
    //点击加号加1
    $('.cart').on('click','.jia',function (){
      var id = $(this).attr("data-id")
      console.log(id);
      location.reload()//刷新(点击按钮价格跟着变化)
      var _this = this
      console.log(goodsArr);
      $.each(goodsArr,function(i,item){
        if(item.id === id){
          var sum = item.num+1
          $(_this).prev().val(sum)
          item.num = sum
          //数量大于1,移出减号按钮的禁用
          if(sum>1){
            $(_this).siblings('.jian').removeAttr('disabled')
          }
        }
      })
      localStorage.setItem('shopping',JSON.stringify(goodsArr))
    })
    //点击删除
    $('.cart').on('click','li p em',function(){
      //获取点击删除对应的id，通过id判断删除对应的数据
      var id = $(this).parents('p').prev().prev().children('.jia').attr('data-id')
      $.each(goodsArr,function(i,item){
        if(item.id === id){
          goodsArr.splice(i,1)
          return false
        }
      })
      //删除dom结构
      $(this).parents('.cart li').remove()
      //更新数据
      localStorage.setItem('shopping',JSON.stringify(goodsArr))
      if(goodsArr.length<=0){
        localStorage.removeItem('shopping')
        var newLi = '<li>购物车暂无数据!!</li>'
        $('.cart').html(newLi)
      }
    })
  
  } else {
    var newLi = '<li>购物车暂无数据！</li>'
    $('.cart').html(newLi)
  }
  
  //全选反选
    var quan = document.querySelector('[name="quan"]')
    var xuans = document.getElementsByName('xuan')
    console.log(xuans);
    //全选反选事件
    quan.onclick = function(){
        //遍历
      for(var i=0;i<xuans.length;i++){
        xuans[i].checked = this.checked
      }
    }
    //每个xuan添加点击事件
    // for(let i=0;i<xuans.length;i++){
    //   xuans[i].onclick = function(){
    //     console.log(99);
    //   }
    // }
  
  $('.cart').on('click','[name="xuan"]',function (){
      console.log(99);
      var xuans = document.getElementsByName('xuan')
      for(var i = 0;i < xuans.length; i++){
        if(xuans[i].checked == false){
          quan.checked = false
        }
      }
    })
}else{
  alert('非法进入')
  location.href = './index.html'
}


 

  





