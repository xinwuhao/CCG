<template>
  <div>
    <div>
      <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
      <el-button type="primary" btn>主要按钮</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let input = ref<any>("");
let btn = () => {
  console.log(input);
};
</script>

<style scoped>
</style>