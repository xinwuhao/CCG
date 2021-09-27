<template>
  <el-menu
    :uniqueOpened="true"
    default-active="1"
    class="el-menu"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :collapse="isCollapse"
    :router="true"
  >
    <template v-for="(item, index) in arr" :key="index">
      <el-menu-item :index="item.path" v-if="item.name !== '商品管理'">
        <component :is="item.i" class="iconbox"></component>
        <template #title>{{ item.name }}</template>
      </el-menu-item>
      <template >
        <el-sub-menu :index="item.path" v-else>
          <template #title>
            <component :is="item.i" class="iconbox"></component>
            <span>{{ item.name }}</span>
          </template>
          <template v-for="(item1, index1) in arr1" :key="index1">
            <el-menu-item :index="item1.path">
              <component :is="item1.i" class="iconbox"></component>
              <span> {{ item1.name }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script lang='ts' setup>
import { ref } from "vue";
let arr = ref<any>([
  { name: "首页", i: "el-icon-house", path: "/" },
  { name: "轮播图管理", i: "el-icon-help", path: "/discount" },
  { name: "导航管理", i: "el-icon-data-line", path: "/discount" },
  { name: "推荐导航", i: "el-icon-document-copy", path: "/navigation" },
  { name: "用户管理", i: "el-icon-user", path: "/user" },
  { name: "商品管理", i: "el-icon-paperclip" },
  { name: "秒杀管理", i: "el-icon-reading", path: "/seckill" },
  { name: "优惠券管理", i: "el-icon-coin", path: "/discount" },
  { name: "订单管理", i: "el-icon-set-up", path: "/order" },
  { name: "通知管理", i: "el-icon-microphone", path: "/notice" },
  { name: "客服消息", i: "el-icon-chat-line-round", path: "/news" },
]);
let arr1 = ref<any>([
  { name: "添加商品", i: "el-icon-document-add", path: "/addgoods" },
  { name: "商品分类", i: "el-icon-tickets", path: "/sortgoods" },
  { name: "商品模型", i: "el-icon-set-up", path: "/modelgoods" },
  { name: "商品参数", i: "el-icon-cpu", path: "/parametergoods" },
  { name: "规格参数", i: "el-icon-takeaway-box", path: "/specifications" },
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