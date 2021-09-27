<template>
  <div>
    <div>
      <el-input placeholder="请输入内容" v-model="input" clearable> </el-input>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let input = ref<any>("");

</script>

<style scoped>
</style>