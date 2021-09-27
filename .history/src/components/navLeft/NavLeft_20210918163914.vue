<template>
  <el-menu
    :uniqueOpened="true"
    default-active="2"
    class="el-menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
  >
    <el-menu-item index="2">
      <component :is="arr[0]"></component>
      <template #title>导航二</template>
    </el-menu-item>
    <el-sub-menu index="5">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1">选项1</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>
  </el-menu>
</template>

<script lang='ts' setup>
import { ref } from "vue";
let arr = ref<any>(["el-icon-home"]);
let props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang='scss' scoped>
.el-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>