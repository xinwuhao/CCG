<template>
  <div class="box">
    <el-card class="box-card">
      <div class="text item">
        <div class="fontTile">欢迎来到小爱后台管理系统</div>
        <div>fonts</div>
        <!-- 表单 -->
        <div class="urename">
          <el-form
            :model="user"
            :rules="rules"
            ref="ruleForm"
            label-width="130px"
            class="demo-ruleForm"
          >
            <el-form-item label="请输入用户名" prop="username">
              <el-input v-model="user.username" class="inpud"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码" prop="password">
              <el-input v-model="user.password" class="inpud"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!-- 登录按钮 -->
        <div class="buttop">
          <el-button type="primary" @click="getlong">点击登录</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>