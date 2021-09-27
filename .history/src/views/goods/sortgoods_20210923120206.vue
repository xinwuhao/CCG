<template>
  <div class="box">
    <!-- 左边 -->
    <div>123</div>
    <!-- 右边 -->
    <div>
      <div class="newlyBox">
        <div>新增分类</div>
        <div>确认</div>
      </div>
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
  width: 100%;
  justify-content: space-between;
  padding: 20px;
}
</style>