<template>
  <div>
    <div>
      <div class="searchBox">
        <el-select
          v-model="input"
          clearable
          filterable
          placeholder="请选择所属商品"
          @change="obtain"
        >
          <el-option
            v-for="item in options"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div id="div1" class="box"></div>
    <div class="btnbox">
      <el-button type="primary" @click="reduce">雀定</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import E from "wangeditor";
import api from "../../http/aip";

let editor = ref<any>();
let discount = ref<any>();
let input = ref<any>("");

let options = ref<any>([]);
let goods = () => {
  api
    .getGoods({
      current: 1,
      pageSize: 9999,
      query: "",
    })
    .then((res: any) => {
      if (res.code == 200) {
        options.value = res.data;
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
let reduce = () => {
  api
    .addSpecParams({
      parentId: input.value,
      specParams: discount.value,
    })
    .then((res: any) => {
      console.log(res);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
let arr = ref<any>();
let obtain = () => {
  api
    .getSpecParams({ parentId: input.value })
    .then((res: any) => {
      editor.value.txt.html(res.data)
    })
    .catch((err: any) => {
      console.log(err);
    });
};
onMounted(() => {
  goods();
  let editor1 = new E(document.getElementById("div1"));
  editor1.create();
  editor.value = editor1;
  editor1.config.onchange = function (newHtml: any) {
    discount.value = newHtml;
  };
});
</script>

<style scoped>
.box {
  position: relative;
  z-index: 0;
  margin-top: 50px;
}
.btnbox {
  position: absolute;
  right: 20px;
  margin-top: 20px;
}
</style>