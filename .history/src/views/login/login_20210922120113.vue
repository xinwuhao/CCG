<template>
  <div class="box">
    <el-card class="box-card">
      <div class="text item">
        <div class="fontTile">欢迎来到小爱后台管理系统</div>
        <div class="fonts">
          欢迎来到小米lite
        </div>
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
import { defineComponent, ref } from "vue";
import api from "../../http/aip";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
interface Obj {
  username: string;
  password: string;
}

// 定义变量
let user = ref<Obj>({
  username: "",
  password: "",
});
let router = useRouter();

let rules = ref<any>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" },
  ],
});
// 点击确定
let getlong = () => {
  api
    .login({
      // 用户名
      username: user.value.username,
      // 密码
      password: user.value.password,
    })
    .then((res: any) => {
      if (res.code === 200) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("uname", JSON.stringify(res.data));
        router.push("/");
        ElMessage.success({
          message: res.msg,
          type: "success",
        });
      } else {
        ElMessage.error(res.msg);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-content: center;
}
.text {
  font-size: 14px;
}

.box-card {
  width: 700px;
  margin-top: 300px;
}
.fontTile {
  height: 80px;
  font-size: 26px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px #eeeeee solid;
}
.inpud {
  width: 400px;
}
.buttop {
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fonts {
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.urename {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
</style>