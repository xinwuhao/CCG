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
    <div v-for="(item, index) in arr" :key="index">
      <div>
        <el-menu-item :index="item.name">
          <component :is="item.i" class="iconbox"></component>
          <template #title>{{ item.name }}</template>
        </el-menu-item>
      </div>
    </div>
    <!-- <el-sub-menu index="5">
      <template #title>
        <i class="el-icon-location"></i>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1">选项1</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu> -->
  </el-menu>
</template>

<script lang='ts' setup>
import { ref } from "vue";
let arr = ref<any>([
  { name: "首页", i: "el-icon-house" },
  { name: "轮播图管理", i: "el-icon-picture-outline" },
  { name: "导航管理", i: "el-icon-data-line" },
  { name: "推荐导航", i: "el-icon-document-copy" },
  { name: "用户管理", i: "el-icon-user" },
  { name: "商品管理", i: "el-icon-s-grid" },
  { name: "秒杀管理", i: "el-icon-time" },
  { name: "优惠券管理", i: "el-icon-coin" },
  { name: "订单管理", i: "el-icon-set-up" },
  { name: "通知管理", i: "el-icon-microphone" },
  { name: "客服消息", i: "el-icon-chat-line-round" },
]);
let arr1 = ref<any>([
  { namee: "添加商品", i: "el-icon-document-add" },
  { namee: "商品分类", i: "el-icon-tickets" },
  { namee: "商品模型", i: "el-icon-mobile" },
  { namee: "商品参数", i: "el-icon-receiving" },
  { namee: "规格参数", i: "el-icon-notebook-1" },
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