<template>
  <div>
    <!-- 表格 -->
    <div style="margin-top: 20px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" width="50"> </el-table-column>
        <el-table-column prop="threshold" label="订单日期"> </el-table-column>
        <el-table-column prop="amount" label="商品数量" width="150px">
        </el-table-column>
        <el-table-column prop="amount" label="订单价格" width="150px">
        </el-table-column>
        <el-table-column prop="number" label="商品名称"> </el-table-column>
        <el-table-column prop="number" label="订单地址"> </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../http/aip";
import { ElMessage } from "element-plus";
import dayjs from "dayjs";

let tableData = ref<any>([]);
//获取数据
let obtain = () => {
  api
    .getOrder()
    .then((res: any) => {
      if (res.code == 200) {
        tableData.value = res.data;
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
onMounted(() => {
  obtain();
});
</script>

<style scoped>
.searchBox {
  display: flex;
}
.inputBox {
  width: 300px;
}
</style>