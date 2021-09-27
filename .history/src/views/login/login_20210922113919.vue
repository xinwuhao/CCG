<template>
  <div class="box">
    <div>
      <div class="siez1">小米Lite</div>
      <div class="size">欢迎来到小米lite后台管理系统</div>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleFormsss"
        label-width="120px"
        class="bo"
      >
        <el-form-item label="请输入用户名" prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <div class="cent">
          <el-form-item>
            <el-button type="primary" size="medium" @click="submitForm"
              >立即登录</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import api from "../../http/aip";
</script>

<style scoped>
.box {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cent {
  display: flex;
  justify-content: center;
  margin: 20px 100px 0px 0px;
}
.size {
  font-size: 18px;
  color: #a9a9a9;
  text-align: center;
}
.bo {
  width: 550px;
  margin-top: 20px;
}
.siez1 {
  font-size: 25px;
  text-align: center;
  margin: 10px 0px;
  flex-wrap: wrap;
}
</style>