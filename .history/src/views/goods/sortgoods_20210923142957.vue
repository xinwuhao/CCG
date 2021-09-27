<template>
  <div class="box">
    <!-- 左边 -->
    <div>123</div>
    <!-- 右边 -->
    <div>
      <div class="newlyBox">
        <div>新增分类</div>
        <div class="blueColor" @click="affirm">确认</div>
      </div>
      <div>
        <div style="margin-top: 10px">
          <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="title">
              <el-input
                v-model="swiper.title"
                class="inpud"
                placeholder="请输入分类名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="上级分类" prop="path">
              <el-select
                v-model="swiper.img"
                clearable
                placeholder="请选择上级分类"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类别名" prop="path">
              <el-input
                v-model="swiper.path"
                class="inpud"
                placeholder="请输入分类别名"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../http/aip";

interface Obj {
  name: string;
  path: string;
  img: string;
}

let swiper = ref<Obj>({
  name: "",
  path: "",
  img: "",
});
let options = ref<any>([]);
let affirm=()=>{

}



</script>

<style scoped>
.box {
  display: flex;
  justify-content: space-between;
  width: 98%;
  padding: 20px;
}
.newlyBox {
  display: flex;
  width: 600px;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.blueColor {
  color: #1e90ff;
  padding: 15px;
  cursor: pointer;
}
</style>