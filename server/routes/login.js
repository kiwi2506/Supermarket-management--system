var express = require('express');
var router = express.Router();

//引入连接数据库模块（myspl） 此接口由 connect.js暴露出来的

const connection = require('./connect')
// 引入express-jwt 用于验证token
const expressJwt = require('express-jwt');

//引入 jwt  
const jwt = require('jsonwebtoken');
// 定义密钥   用户登录成功 分发token 有权限进入
const secretKey = 'itsource';


//设置统一的响应头 解决跨域的问题 next  代表 继续执行下一个响应头
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "authorization");
 
  next();
})
// 使用模块 express-jwt 验证token
router.use(expressJwt ({
  secret:  secretKey 
}).unless({
  path:['/login/checklogin'] //不需要验证token 只有登录进去才会有token 如果这一步验证 就登录不了
}));

//拦截器
router.use( (err, req, res, next) => {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
      //这个需要根据自己的业务逻辑来处理
      res.status(401).send('无效的token 未授权...');
  }
});

//登录验证的路由  
router.post('/checklogin',(req,res) => {
  //接收来自前端发送 的数据  
  let{ username, password} = req.body;

  //构造sql语句  
   const sqlStr = `select * from account where username='${username}' and password='${password}'`;

  //执行sql语句
    connection.query(sqlStr,(err,data) =>{
      if (err) throw err;
      //判断有没有数据
      if( !data.length ){//如果没有数据
      
         res.send({'error_code':1,'reason':'请检查用户名或密码是否正确'})
        } else{//存在
              // 当前登录账号数据
          const obj = data[0];
          // 转为字符串
          const objStr = JSON.stringify(obj);
          // 生成一个全新对象
          const accountInfo = JSON.parse(objStr);
          // 生成token
          const token = jwt.sign(accountInfo, secretKey, {expiresIn: 60 * 60})

         res.send({'error_code':0,'reason':'欢迎您,登录成功！',"username":accountInfo.username,token})

      }
    })
})

module.exports = router;
