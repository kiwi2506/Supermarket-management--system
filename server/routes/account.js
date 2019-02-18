/** 账号管理路由模块 */

const express = require('express');
const router = express.Router();

//引入连接数据库模块（myspl） 此接口由 connect.js暴露出来的

const connection = require('./connect')

//设置统一的响应头 解决跨域的问题 next  代表 继续执行下一个响应头
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  next();
})

/* 
  添加账号的路由 /accountadd
*/
router.post('/accountadd', (req, res) => {
  // 接收前端发送的添加账号的数据
  let { username, password, usergroup } = req.body;
  console.log('接收到前端发送过来的数据：', username, password, usergroup)

  // 把数据存入数据库
  // 构造增加账号的sql语句
  const sqlStr = `insert into account(username, password, usergroup) values('${username}', '${password}', '${usergroup}')`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 判断受影响的行数
    if (data.affectedRows > 0) {
      // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
      res.send({ "error_code": 0, "reason": "插入数据成功" });
    } else {
      // 失败：返回给前端失败的数据对象
      res.send({ "error_code": 1, "reason": "插入数据失败" });
    }
  })
})



//添加列表显示路由 /accountlist
// router.get('/accountlist',(req,res) =>{
//   //查询所有账号的数据 并且按照时间排序  才建立的排前面
//   //构造sql语句
//   const sqlStr = 'select * from account order by ctime desc';
//   //执行sql语句

//   connection.query(sqlStr,(err,data) =>{
//      if(err) throw err;
//      //把查询的数据响应个前端
//      res.send(data)
//   })
// })


//删除账号 /accountdel

router.get('/accountdel', (req, res) => {
  //接收前端发来的id 
  let { id } = req.query;
  //构造一个删除id数据的 sql 语句
  const sqlStr = `delete from account where id = ${id}`;

  //执行sql 语句 
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //根据后台删除的结果判断 
    if (data.affectedRows > 0) {
      //如果后台的affectedRows 影响大于0 删除成功 返回删除成功数据给前端提示
      res.send({ "error_code": 0, "reason": "删除账户成功" });
    } else {
      //否者失败 
      res.send({ "error_code": 1, "reason": "删除账户失败" });
    }
  })
})


//编辑账号 /accountedit 
router.get('/accountedit', (req, res) => {
  //接收前端发来的  id的数据  
  let { id } = req.query;
  //构造sql 语句  
  const sqlStr = `select * from account where id = ${id}`
  //执行构造语句  把后端查询到的数据 返回给前端
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //把数据返回给前端
    res.send(data)
  })
})

// //保存 编辑后的账号 /saveeditaccount
router.post('/saveeditaccount', (req, res) => {
  //  res.send('1')
  // 接收修改后的新数据 和 原来的id
  let { username, usergroup, editId } = req.body;
  // 构造sql
  const sqlStr = `update account set username='${username}', usergroup='${usergroup}' where id=${editId}`;
  // 执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 受影响行数大于0 就是修改成功
    if (data.affectedRows > 0) {
      // 返回成功的数据对象给前端
      res.send({ "error_code": 0, "reason": "修改账号成功" });
    } else {
      // 返回失败的数据对象给前端
      res.send({ "error_code": 1, "reason": "修改账号失败" });
    }
  })
})


//批量删除 /batchdelete 
router.get('/batchdelete', (req, res) => {
  //接收前端发来的数据请求
  let { selectedId } = req.query;
  //构造sql语句  

  const sqlStr = `delete from account where id in (${selectedId})`

  //执行sql语句  
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //判断删除 成功与否  返回给前端  
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "删除账号成功" })
    } else {
      res.send({ "error_code": 1, "reason": "删除账号失败" })
    }
  })
})

//分页显示 数据列表  /accountlistbypage
router.get('/accountlistbypage', (req, res) => {
  //接收 前端 发送给后端的 当前页 和 当前页数据条数给后端
  let { pageSize, currentPage } = req.query;

  // 默认值 
  pageSize = pageSize ? pageSize : 3;
  currentPage = currentPage ? currentPage : 1;

  //构造sql语句
  let sqlStr = `select * from account order by ctime desc`;
  //执行构造语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //计算总条数
    let total = data.length;//  获取数据总条数

    //分页的条件设置  
    let n = (currentPage - 1) * pageSize;

    //拼接上面的sql 语句  （注意不能用常量  只能用let 定义  limit 前面要加空格 不然会拼接错误）
    sqlStr += ` limit ${n},${pageSize}`;
    //执行 sql语句
    connection.query(sqlStr, (err, data) => {
      // res.send('1')
      if (err) throw err;
      //直接把 总条数 和 数据返回给前端
      res.send({
        total,
        data
      })
    })
  })
})


module.exports = router;
