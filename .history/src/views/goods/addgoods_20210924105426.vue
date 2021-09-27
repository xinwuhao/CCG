<template>
  <div>
    <div class="searchBox">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable
        class="inputBox"
      >
      </el-input>
      <el-button icon="el-icon-search" @click="obtain"></el-button>
      <el-button type="primary" @click="ON">添加商品</el-button>
    </div>
    <!-- 添加商品弹出层 -->

    <!-- 表格 -->
    <div style="margin-top: 20px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" width="50"> </el-table-column>
        <el-table-column prop="content" label="商品名称"> </el-table-column>
        <el-table-column prop="content" label="商品原价"> </el-table-column>
        <el-table-column prop="content" label="商品现价"> </el-table-column>
        <el-table-column prop="content" label="商品库存"> </el-table-column>
        <el-table-column label="是否新品">
          <template #default="scope">
            <div>
              {{ scope.row.isShow == true ? "是" : "否" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否热卖">
          <template #default="scope">
            <div>
              {{ scope.row.isShow == true ? "是" : "否" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="是否推荐">
          <template #default="scope">
            <div>
              {{ scope.row.isShow == true ? "是" : "否" }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="上下架">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isShow"
              active-color="#1E90FF"
              inactive-color="#ff4949"
              @change="chen(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template #default="scope">
            <el-button @click="reduce(scope.row)" type="text" size="small"
              >删除</el-button
            >
            <el-button type="text" size="small" @click="alter(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../http/aip";
import { ElMessage } from "element-plus";

interface Obj {
  content: string;
}
let input = ref<any>("");
let fileList = ref<any>([]);

let abc = { Authorization: localStorage.getItem("token") };
let num = ref<number>(0);
let tableData = ref<any>([]);
let swiper = ref<Obj>({
  content: "",
});
//删除
let reduce = (e: any) => {
  api
    .delNotice(e._id)
    .then((res: any) => {
      if (res.code == 200) {
        ElMessage.success({
          message: `${res.msg}`,
          type: "success",
        });
        obtain();
      } else ElMessage.error(`${res.msg}`);
    })
    .catch((err: any) => {
      console.log(err);
    });
};
//显示
let chen = (e: any) => {
  api
    .showNotice({
      id: e._id,
      isShow: e.isShow,
    })
    .then((res: any) => {
      if (res.code == 200) {
        ElMessage.success({
          message: `${res.msg}`,
          type: "success",
        });
        obtain();
      } else ElMessage.error(`${res.msg}`);
    })
    .catch((err: any) => {
      console.log(err);
    });
};

//添加按钮
let ON = () => {
  num.value = 1;
};

//确定按钮
let getlong = () => {
  if (num.value == 1) {
    api
      .addNotice({
        content: swiper.value.content,
      })
      .then((res: any) => {
        if (res.code == 200) {
          ElMessage.success({
            message: `${res.msg}`,
            type: "success",
          });
          obtain();
        } else ElMessage.error(`${res.msg}`);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
};
let current = ref<number>(1);
let pageSize = ref<number>(10);
//获取数据
let obtain = () => {
  api
    .getNotice({
      current: current.value,
      pageSize: pageSize.value,
      query: input.value,
    })
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
.blueFont {
  color: #1e90ff;
}
.imgBox {
  width: 100px;
  height: 100px;
}
</style>