var express = require('express');
var router = express.Router();

//引入连接数据库模块（myspl） 此接口由 connect.js暴露出来的

const connection = require('./connect')

//设置统一的响应头 解决跨域的问题 next  代表 继续执行下一个响应头
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

//登录验证的路由  
router.post('/checklogin',(req,res) => {
  //接收来自前端发送 的数据  
  let{ username, password} = req.body;

  //构造sql语句  
   let sqlStr = `select * from account where username='${username}' and password='${password}'`;

  //执行sql语句
    connection.query(sqlStr,(err,data) =>{
      if (err) throw err;
      //判断有没有数据
      if( !data.length ){//如果没有数据
      
         res.send({'error_code':1,'reason':'请检查用户名或密码是否正确'})
        } else{//存在
         res.send({'error_code':0,'reason':'欢迎您,登录成功！'})

      }
    })
  res.send('1')



})

module.exports = router;
