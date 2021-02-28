<?php
header("content-type:text/html;charset=utf-8");
//获取传入的参数
$u=$_REQUEST['username'];
$p=$_REQUEST['password'];
echo $u.$p;
// die();
// //连接数据库
$link=mysqli_connect("localhost",'root','','shop');
//设置编码
if($link){
  echo '连接成功';
}else{
  echo '连接失败';
}
mysqli_set_charset($link,"utf8");
// //SQL语句
$sql="select * from user where name='$u' and psw='$p'";
// //执行SQL语句，并返回结果集
$result=mysqli_query($link,$sql);
// //判断当前结果集中是否存在数据
if(mysqli_fetch_assoc($result)){
    echo '1';
}else{
    echo '0';
}
// //关闭连接
mysqli_close($link);

?>