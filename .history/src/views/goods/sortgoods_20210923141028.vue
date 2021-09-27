<template>
  <div class="box">
    <!-- 左边 -->
    <div>123</div>
    <!-- 右边 -->
    <div>
      <div class="newlyBox">
        <div>新增分类</div>
        <div class="blueColor">确认</div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
}
</style>