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
      <el-button type="primary" @click="ON">添加轮播图</el-button>
    </div>
    添加轮播图
    <el-dialog
      title="添加轮播图"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="margin-top: 10px">
        <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="图片地址:" prop="img">
            <el-upload
              class="upload-demo"
              action="http://localhost:1001/admin/upload"
              :headers="abc"
              :on-success="upimg"
              :file-list="fileList"
              list-type="picture"
            >
              <div class="blueFont">点击上传图片</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="图片标题：" prop="title">
            <el-input v-model="swiper.title" class="inpud"></el-input>
          </el-form-item>
          <el-form-item label="图片链接：" prop="path">
            <el-input v-model="swiper.path" class="inpud"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getlong((val = 1))">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "../../http/aip";

interface Obj {
  title: string;
  path: string;
  img: string;
}
let input = ref<any>("");
let fileList = ref<any>([]);
let dialogVisible = ref<boolean>(false);
let abc = { Authorization: localStorage.getItem("token") };
let num = ref<number>(0);
let btn = (e: any) => {
  console.log(e);
};
let swiper = ref<Obj>({
  title: "",
  path: "",
  img: "",
});
//上传图片请求成功
let upimg = (file: any) => {
  swiper.value.img = file.data;
};
let ON = () => {
  dialogVisible.value = true;
  num.value = 1;
};
//确定按钮
let getlong = (val: any) => {
  if (num.value == 1) {
    api
      .addBanner({
        url: swiper.value.img,
        title: swiper.value.title,
        link: swiper.value.path,
      })
      .then((res: any) => {
        if (res.code == 200) {
          dialogVisible.value = false;
          swiper.value.img = "";
          swiper.value.title = "";
          swiper.value.path = "";
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
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
}
</style>