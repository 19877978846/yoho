
var button = document.querySelector('[type="button"]')
var user = document.querySelector('[type="text"]')
var pass = document.querySelector('[type="password"]')
button.onclick = function(){
    console.log(11);
    var u1 = user.value
    var p1 = pass.value
    ajax({
        url:'../php/login.php',
        type:"get",
        data:'username='+u1+'&password='+p1,
        success:function(dt){
            console.log(dt);
            var str = dt.split('')
            var uname = str[0]
            var str1 = str[str.length-1]
            console.log(str1);
            if(str1 == 1){
                alert('登陆成功')
                location.href = `../html/index.html?=${uname}`
            }else{
                alert('登陆失败')
            }
        }
    })
    console.log(location);
}