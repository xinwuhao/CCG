<template>
  <div>
    <div class="searchBox">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable
        class="inputBox"
      >
      </el-input>
      <el-button icon="el-icon-search" @click="btn(input)"></el-button>
      <el-button type="primary">添加轮播图</el-button>
    </div>
    <div>
      <div>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传 jpg/png 文件，且不超过 500kb
            </div>
          </template>
        </el-upload>
      </div>
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
      <div class="buttop">
        <el-button type="primary" @click="getlong">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Obj {
  username: string;
  password: string;
}
let input = ref<any>("");
let fileList = ref<any>([]);
let btn = (e: any) => {
  console.log(e);
};
let user = ref<Obj>({
  username: "",
  password: "",
});
let rules = ref<any>({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
let getlong = () => {
  console.log(user.value);
};
let handleRemove = (file: any, fileList: any) => {
  console.log(file, fileList);
};
let    handlePreview=(file) {
        console.log(file)
      },
</script>

<style scoped>
.searchBox {
  display: flex;
}
.inputBox {
  width: 300px;
}
</style>