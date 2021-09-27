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
      <el-button type="primary" @click="btn(input)">主要按钮</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let input = ref<any>("");
let btn = (e: any) => {
  console.log(e);
};
</script>

<style scoped>
.searchBox {
  display: flex;
}
.inputBox {
  width: 300px;
  margin-right: 10px;
}
</style>