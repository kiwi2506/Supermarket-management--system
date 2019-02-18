<template>
  <div class="index">
    <!-- 内容容器 -->
    <el-container>
      <!-- 内容左侧 -->
      <el-aside width="200px">
         <Nav></Nav>
      </el-aside>
      <!-- 内容右侧 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <!-- 头部样式 -->
         <Top></Top>

        </el-header>
        <!-- 中间内容 -->
        <el-main>

          <!-- 路由出口 -->
          <router-view></router-view>
         
        </el-main>
        <!-- 脚步内容 -->
        <el-footer>
          <!-- 底部样式 -->
         <Bottom></Bottom>

        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 引入导航组件
import Nav from '@/components/Nav/Nav.vue';
// 引入头部组件
import Top from '@/components/Top/Top.vue';
// 引入尾部组件
import Bottom from '@/components/Bottom/Bottom.vue';

export default {
    components: {  // 注册组件
        Nav,
        Top,
        Bottom
    }
};
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

