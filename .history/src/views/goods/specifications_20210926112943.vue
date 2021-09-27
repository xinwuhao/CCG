<template>
  <div>
    <div id="div1"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

let editor = ref<any>();
let discount = ref<any>();

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