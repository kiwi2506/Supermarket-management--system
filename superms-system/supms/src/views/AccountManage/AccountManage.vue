<template>
  <div class="account-manage">
    <!-- 面板组件 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号管理</span>
      </div>
      <div class="text item">
        <!-- 账号管理表格 -->
        <el-table
          ref="multipleTable"
          :data="accountTableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <!-- 单选框 -->
          <el-table-column type="selection" width="55"></el-table-column>

          <!-- 账号 -->
          <el-table-column prop="username" label="账号"></el-table-column>

          <!-- 用户组 -->
          <el-table-column prop="usergroup" label="用户组"></el-table-column>

          <!-- 日期 -->
          <el-table-column label="创建日期">
            <template slot-scope="scope">{{ scope.row.ctime | filterCtime }}</template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.row.id)">
                <i class="el-icon-edit"></i> 编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">
                <i class="el-icon-delete"></i> 删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
          <div style="margin-top: 20px; text-align:left;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[1, 3, 5, 10, 20, 50]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        <!-- 批量删除按钮 和  取消按钮 -->
        <div style="margin-top: 20px; text-align: left;">
          <el-button @click="batcDelete">批量删除</el-button>
          <el-button @click="cancelSelect()">取消选择</el-button>
        </div>
        <!-- 修改的弹出模态框 -->
        <el-dialog title="账号修改" width="400px" :visible.sync="flag">
          <!-- 回填表单 -->
          <el-form :model="editForm" label-width="60px">
            <!-- 账号 -->
            <el-form-item label="账号" prop="username">
              <el-input
                style="width: 217px;"
                type="text"
                v-model="editForm.username"
                autocomplete="off"
              ></el-input>
            </el-form-item>

            <!-- 选中用户组 -->
            <el-form-item label="用户组" prop="usergroup">
              <el-select v-model="editForm.usergroup" placeholder="请选择用户组">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="高级管理员" value="高级管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <!-- 表单的尾部 -->
          <div slot="footer" class="dialog-footer">
            <el-button @click="flag = false">取 消</el-button>
            <el-button type="primary" @click="saveEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>
<script>
//引入moment 模块 时间格式化
import moment from "moment";
//引入qs
import qs from "qs";
export default {
  //数据
  data() {
    return {
      accountTableData: [], //后端传过来的账户数据
      flag: false, //控制模态框的显示和隐藏
      editForm: {
        // 修改的表单数据
        username: "",
        usergroup: ""
      },
      editId: "", //要修改的数据的 id   就是原来的id
      selectedAccount: [], // 定义的变量保存 被选中数据
       total: 0, // 数据总条数
      currentPage: 1, // 当前页
      pageSize: 3 // 默认每页显示3条
    };
  },
  //生命周期的钩子函数  created 自动触发 vue的组件实例对象创建完成dom 好没有绑定
  created() {
    //调用方法里面的自动触发函数
    this.getAccountlistByPage();
  },

  //方法
  methods: {
    //请求所有分页的 数据 自动触发  
    getAccountlistByPage(){
      //获取当前条数 和当前页码
      let pageSize = this.pageSize;
      let currentPage = this.currentPage;

      //发送 axios 给后端
      this.axios.get('http://127.0.0.1:3000/account/accountlistbypage',
      {
        params:{
          pageSize,
          currentPage
      }
      })
      .then(response => {
        console.log(response.data)
        //接收后端发回来的数据  
        let {total,data} = response.data;
        //把收到的数据赋值给 对应的变量
        this.total = total;
        this.accountTableData =data;
      })
      .catch(err =>{
        console.log(err)
      })

    },
      // 当页面尺寸(每页显示多少条)改变 就触发这个函数 传入当前页面尺寸
    handleSizeChange(val) {
      // 保存当前 条数的值  需要调动发给后端
      this.pageSize = val;
      // 调用获取数据的函数
      this.getAccountlistByPage();
          },
    // 当页码改变 就会触发这个函数 传入当前页码
    handleCurrentChange(val) {
      // 重置保存当前页码 
      this.currentPage = val;
      // 调用获取数据的函数
      this.getAccountlistByPage();
      

    },

    //请求所有数据的封装函数
    // getAccountlist() {
    //   //console.log('自动触发') //相当于刷新页面  自动发送请求  获取后端的数据
    //   this.axios
    //     .get("http://127.0.0.1:3000/account/accountlist")
    //     .then(response => {
    //       this.accountTableData = response.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },

    //单选框的选择状态  就会触发
    handleSelectionChange(val) {
      this.selectedAccount = val;
    },
    
    //取消选中
    cancelSelect() {
      this.$refs.multipleTable.clearSelection();
    },

    //批量删除
    batcDelete() {
      //收集 选中的数据（选中的数据是一个数组需要遍历 map 产生一个新的数组）
      let selectedId = this.selectedAccount.map(v => v.id);

      //在发送请求之前 如果用户没有选择 弹出提示 并且return结束发送 请求
      if (!selectedId.length) {
        this.$message.error("请选择以后再操作!");
        return;
      }
      //确认删除
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(response => {
          //发送axios 把需要删除的数据 发给后端
          this.axios
            .get(`http://127.0.0.1:3000/account/batchdelete`, {
              params: {
                selectedId
              }
            })
            .then(response => {
              //接收后端发来的 错误 提示信息
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                //删除数据成功  弹出提示
                this.$message({
                  type: "success",
                  message: reason
                });
                //删除成功并且刷新页面
                this.getAccountlistByPage();
              } else {
                //删除失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    //编辑信息
    handleEdit(id) {
      //先把要修改的id 保存下俩
      this.editId = id;
      // 显示模态框
      this.flag = true;
      //发送axios id给后端
      this.axios
        .get(`http://127.0.0.1:3000/account/accountedit?id=${id}`)
        .then(response => {
          //返回的数据是 数组 获取数组的 索引为0 的那个对象   （实际上也只有一个对象 因为没有批量修改）
          let result = response.data[0];
          //回填数据  双向绑定的  方式来回填数据
          this.editForm.username = result.username;
          this.editForm.usergroup = result.usergroup;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //保存修改
    saveEdit() {
      //收集数据  和  id  发给后端
      let params = {
        username: this.editForm.username,
        usergroup: this.editForm.usergroup,
        editId: this.editId
      };

      //发送axios 请求给后端
      this.axios
        .post(
          "http://127.0.0.1:3000/account/saveeditaccount",
          qs.stringify(params)
        )
        .then(response => {
          //接收错误信息提示 数据
          let { error_code, reason } = response.data;
          //前端接收 后端更新后的数据
          if (error_code === 0) {
            // 修改成功 弹出成功的提示
            this.$message({
              type: "success",
              message: reason
            });
            // 刷新列表（重新请求所有账号数据）
            this.getAccountlistByPage();
          } else {
            //修改失败
            this.$message.error(reason);
          }

          //确定保存后隐藏模态框
          this.flag = false;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //删除按钮
    handleDelete(id) {
      //删除提示信息
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(response => {
          //发送axios 把id发给后端
          this.axios
            .get(`http://127.0.0.1:3000/account/accountdel?id=${id}`)
            .then(response => {
              // 接收后端返回的错误码 和 提示信息
              let { error_code, reason } = response.data;
              //前端接收后端删除账户 返回来的数据
              if (error_code === 0) {
                //删除数据成功  弹出提示
                this.$message({
                  type: "success",
                  message: reason
                });
                //删除成功并且刷新页面
                this.getAccountlistByPage();
              } else {
                //删除失败提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },

  //表格时间的过滤器 过滤时间函数  格式化时间
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.account-manage {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>