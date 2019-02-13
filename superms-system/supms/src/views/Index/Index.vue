<template>
  <div class="index">
    <!-- 内容容器 -->
    <el-container>
      <!-- 内容左侧 -->
      <el-aside width="200px">
        <el-menu background-color='#2d3a4b' unique-opened active-text-color='#409EFF' :default-active="this.$route.path" router>
          <!-- 左侧导航1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-setting"></i>系统管理
            </template>
            <el-menu-item index="/">系统信息</el-menu-item>
          </el-submenu>

          <!-- 左侧导航2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-edit-outline"></i>账号管理
            </template>
            <el-menu-item index="/accountmanage">账号管理</el-menu-item>
            <el-menu-item index="/accountadd">添加账号</el-menu-item>
            <el-menu-item index="/passwordmodify">密码修改</el-menu-item>
          </el-submenu>

          <!-- 左侧导航3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-goods"></i>商品管理
            </template>
            <el-menu-item index="/goods">商品管理</el-menu-item>
            <el-menu-item index="/goodsadd">添加商品</el-menu-item>
          </el-submenu>

          <!-- 左侧导航4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-edit"></i>统计管理
            </template>
            <el-menu-item index="/salesstatistics">销售统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 内容右侧 -->
      <el-container>
        <!-- 头部 -->
        <el-header>


        </el-header>
        <!-- 中间内容 -->
        <el-main>

          <!-- 路由出口 -->
          <router-view></router-view>
         
        </el-main>
        <!-- 脚步内容 -->
        <el-footer>


        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>


<style lang='less'>
.index {
  height: 100%;
  .el-container {
    height: 100%;
    .el-aside {
      background-color: #2d3a4b;
      color: #333;
      text-align: center;
      .el-menu {
        border: none;
        .el-submenu {
          .el-submenu__title {
            color: #fff;
          }
        }
        .el-menu-item {
          color: #fff;
        }
      }
    }

    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
    }
    .el-header,
    .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
  }
}
</style>

