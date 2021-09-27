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
      <el-button type="primary" @click="dialogVisible = true"
        >添加轮播图</el-button
      >
    </div>
    <el-dialog
      title="添加轮播图"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>图片地址:</span>
      <template #footer>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :file-list="fileList"
          list-type="picture"
        >
          <div class="blueFont">点击上传图片</div>
        </el-upload>
        <el-form :model="user" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="图片标题：" prop="username">
            <el-input v-model="user.username" class="inpud"></el-input>
          </el-form-item>
          <el-form-item label="图片标题：" prop="username">
            <el-input v-model="user.username" class="inpud"></el-input>
          </el-form-item>
          <el-form-item label="图片链接：" prop="password">
            <el-input v-model="user.password" class="inpud"></el-input>
          </el-form-item>
        </el-form>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getlong">确 定</el-button>
      </template>
    </el-dialog>
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
let dialogVisible = ref<boolean>(false);
let btn = (e: any) => {
  console.log(e);
};
let user = ref<Obj>({
  username: "",
  password: "",
});
let getlong = () => {
  console.log(user.value);
};
let handleRemove = (file: any, fileList: any) => {
  console.log(file, fileList);
};
let handlePreview = (file: any) => {
  console.log(file);
};
let handleClose = (done: any) => {};
</script>

<style scoped>
.searchBox {
  display: flex;
}
.inputBox {
  width: 300px;
}
.blueFont {
  color: #1e90ff;
}
</style>