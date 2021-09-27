<template>
  <div class="header">
    <div @click="toggle" class="cent">
      <el-icon-expand v-if="isCollapse"></el-icon-expand>
      <el-icon-fold v-else></el-icon-fold>
      <div class="cenn">
        <iframe
          width="200"
          height="24"
          frameborder="0"
          scrolling="no"
          hspace="0"
          src="https://i.tianqi.com/?c=code&id=11"
        ></iframe>
        <div>
          <component :is="ionc"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { ref } from "vue";
import { Fold, Expand } from "@element-plus/icons";

let props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
});
let emits = defineEmits(["update:isCollapse"]);
let ionc = ref<string>("el-icon-user");
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
  width: 100%;
}
.cenn {
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
</style>