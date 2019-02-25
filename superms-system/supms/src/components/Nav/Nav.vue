<template>
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

          <!-- 左侧导航5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-circle-plus"></i>进货管理
            </template>
            <el-menu-item index="/stockcontrol">库存管理</el-menu-item>
            <el-menu-item index="/addrepertory">添加库存</el-menu-item>
          </el-submenu>

          <!-- 左侧导航6 -->
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-remove"></i>出货管理
            </template>
            <el-menu-item index="/selllist">销售列表</el-menu-item>
            <el-menu-item index="/goodsdelivery">商品出库</el-menu-item>
            <el-menu-item index="/goodsreturn">商品退货</el-menu-item>
          </el-submenu>
          
          <!-- 左侧导航7 -->
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-star-on"></i>会员管理
            </template>
             <el-menu-item index="/vipaccountmanage">会员账号管理</el-menu-item>
            <el-menu-item index="/vipaccountadd">会员添加账号</el-menu-item>
          </el-submenu>

        </el-menu>
</template>
