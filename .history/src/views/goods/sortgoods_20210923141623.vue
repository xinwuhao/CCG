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
        <el-dialog
          title="添加轮播图"
          v-model="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <div style="margin-top: 10px">
            <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
              <el-form-item label="图片标题：" prop="title">
                <el-input v-model="swiper.title" class="inpud"></el-input>
              </el-form-item>
              <el-form-item label="图片链接：" prop="path">
                <el-input v-model="swiper.path" class="inpud"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <template #footer>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="getlong">确 定</el-button>
          </template>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../http/aip";

interface Obj {
  title: string;
  path: string;
  img: string;
}

let swiper = ref<Obj>({
  title: "",
  path: "",
  img: "",
});
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