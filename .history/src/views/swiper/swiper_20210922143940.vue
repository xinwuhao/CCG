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
    <el-dialog
      title="添加轮播图"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>这是一段信息</span>
      <template #footer>
 
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="getlong"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
    
      <div class="buttop">
        <el-button type="primary" @click="getlong">确定</el-button>
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
let dialogVisible=ref<boolean>(false)
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