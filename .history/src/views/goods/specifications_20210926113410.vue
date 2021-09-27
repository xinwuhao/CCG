<template>
  <div>
    <div>
      <div class="searchBox">
        <el-select
          v-model="input"
          clearable
          filterable
          placeholder="请选择所属商品"
        >
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
        <el-button icon="el-icon-search" @click="obtain"></el-button>
      </div>
    </div>
    <div id="div1"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

let editor = ref<any>();
let discount = ref<any>();
import E from "wangeditor";

onMounted(() => {
  let editor1 = new E(document.getElementById("div1"));
  editor1.create();
  editor.value = editor1;
  editor1.config.onchange = function (newHtml: any) {
    discount.value = newHtml;
  };
});
</script>

<style scoped>
</style>