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
      <el-upload
        class="upload-demo"
        action="http://localhost:1001/admin/upload"
        :headers="abc"
        :on-success="getlong(_"
        :on-preview="handlePreview"
        :file-list="fileList"
        list-type="picture"
      >
        <div class="blueFont">点击上传图片</div>
      </el-upload>
      <div style="margin-top: 10px">
        <el-form :model="user" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="图片标题：" prop="username">
            <el-input v-model="user.username" class="inpud"></el-input>
          </el-form-item>
          <el-form-item label="图片链接：" prop="password">
            <el-input v-model="user.password" class="inpud"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
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
let abc = { Authorization: localStorage.getItem("token") };
let btn = (e: any) => {
  console.log(e);
};
let user = ref<Obj>({
  username: "",
  password: "",
});
//确定按钮
let getlong = (response, file, fileList) => {
  console.log(user.value);
};
//点击图片
let handlePreview = (file: any) => {
  console.log(file);
};
let handleClose = (done: any) => {
  dialogVisible.value = false;
};
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
  position: relative;
  bottom: 15px;
  left: 80px;
}
</style>