var button = document.querySelector('[type="button"]')
var user = document.querySelector('[type="text"]')
var show = document.querySelector('.show')
var pass = document.querySelector('[type="password"]')
button.onclick = function () {
  var u1 = user.value
  var p1 = pass.value
  // console.log(p1, u1);
  ajax({
    url: '../php/register.php',
    type: "get",
    data: 'username=' + u1 + '&password=' + p1,
    success: function (dt) {
      console.log(dt);
      var str = dt.split('')
      var str1 = str[str.length - 1]
      console.log(str1);
      if (str1 == 0) {
        alert('注册成功');
        location.href = './login.html'

      } else {
        alert('注册失败,用户已存在')
        show.innerHTML = 'X'
        user.focus()

      }
    }
  })
}