<template>
  <div class="header">
    <div @click="toggle" class="cent">
      <el-icon-expand v-if="isCollapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Fold, Expand } from "@element-plus/icons";

let props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
let emits = defineEmits(["update:isCollapse"]);

let toggle = () => {
  emits("update:isCollapse", !props.isCollapse);
};
</script>

<style lang='scss' scoped>
svg {
  width: 20px;
  height: 20px;
}
.header {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
.cent {
  display: flex;
}
</style>