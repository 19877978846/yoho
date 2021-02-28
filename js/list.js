var path = location.search;
if(path){
  $.ajax({
    url:'../data/data.json',
    type:'get',
    dataType:'json',
    cache:'false',
    success:function(res){
      // console.log(res);
      var strDom = ''
      res.forEach(item => {
        // console.log(item);
        strDom+= `
      <li>
          <img src="${item.imgurl}" alt="">  
          <div>
            <p>${item.tit}</p>
            <p>${item.brand}</p>
            <p><del>${item.oldprice}</del>￥<span>${item.newprice}</span></p>
            <a href="./details.html?=list" data-id="${item.id}">查看商品</a>
            <em data-id="${item.id}">加入购物车</em>
          </div>
      </li>
      `
      })
      $('.list-commodity ul').html(strDom)
    }
  })
  // details.html
  //点击跳转详情页
  $('.list-commodity ul').on('click','li div p+a',function(e){
    // e.preventDefault()
    console.log(99);
    // console.log(num);
    var id = $(this).attr('data-id')
    console.log(id);
    var goodsArr = []//购物车数据的数组
    // if (localStorage.getItem('goods')) {
    //   goodsArr = JSON.parse( localStorage.getItem('goods') )
    // }
    goodsArr.push({'id':id,'num':0})
      // 标记购物车是否已有该商品
      // var flag = false
      // 判断购物车是否已有该商品
      $.each(goodsArr,function (index,item){
        if (item.id === id) {//购物车已该商品
          item.num++//商品数量+1
          flag = true
        }
      })
      if (!flag) {
        // push一个商品对象到goodsArr
        goodsArr.push({"id":id,"num":1})
      }
      // 数据更新到本地存储
      localStorage.setItem('goods', JSON.stringify(goodsArr) )
  })
      
      //点击加入购物车
      $('.list-commodity ul').on('click','li div p+a+em',function (){
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
        shoppingArr.push({"id":id,"num":1})
        }
        // 数据更新到本地存储
        localStorage.setItem('shopping', JSON.stringify(shoppingArr) )
        alert('加入购物车成功！')
    })
}else{
  alert('非法进入！！!')
  location.href = './index.html'
}
  