<template>
  <div>
      <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from "vue";
</script>

<style scoped>
</style>