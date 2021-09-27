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
      <!-- <component :is="arr" class="iconbox"></component> -->
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
let arr = ref<any>([
  { nam: "首页", i: "el-icon-house" },
  { nam: "轮播图管理", i: "" },
  { nam: "推荐导航", i: "" },
  { nam: "用户管理", i: "" },
  { nam: "商品管理", i: "" },
  { nam: "秒杀管理", i: "" },
  { nam: "优惠券管理", i: "" },
  { nam: "订单管理", i: "" },
  { nam: "通知管理", i: "" },
  { nam: "客服消息", i: "" },
]);
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
.iconbox {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
</style>