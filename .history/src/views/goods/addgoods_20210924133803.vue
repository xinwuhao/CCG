<template>
  <div>
    <div v-if="judge == 0">
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

    <!-- 添加商品弹出层 -->
    <div v-if="judge !== 0">
      <el-tabs v-model="judge">
        <el-tab-pane label="基础设" name="1" disabled>
          <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="商品名称:" prop="title">
              <el-input v-model="swiper.title" class="inpud"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="parentId">
              <el-select v-model="swiper.parentId" placeholder="Select" style="width:100%">
                <el-option-group
                  v-for="group in options"
                  :key="group.name"
                  :label="group.name"
                >
                  <el-option
                    v-for="item in group.options"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="图片地址:" prop="img">
              <el-upload
                class="upload-demo"
                action="http://localhost:1001/admin/upload"
                :headers="abc"
                :on-success="upimg"
                list-type="picture"
                :file-list="fileList"
              >
                <div class="blueFont">点击上传图片</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="图片标题：" prop="title">
              <el-input v-model="swiper.title" class="inpud"></el-input>
            </el-form-item>
            <el-form-item label="图片链接：" prop="path">
              <el-input v-model="swiper.path" class="inpud"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="媒体信息" name="2" disabled>Config</el-tab-pane>
        <el-tab-pane label="商品规格" name="3" disabled>Role</el-tab-pane>
        <el-tab-pane label="商品详情" name="4" disabled>Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import api from "../../http/aip";
import { ElMessage } from "element-plus";

// 输入框
let input = ref<any>("");
//切换层
let judge = ref<string>("1");
//上传图片token
let abc = { Authorization: localStorage.getItem("token") };
//接受图片路径
let fileList = ref<any>([]);
// 下拉
let options = ref<any>([]);
//表格数据
let tableData = ref<any>([]);
//表单
let swiper = ref<any>({
  content: "",
});
//添加按钮
let ON = () => {
  judge.value = "1";
};
//上传图片请求成功
let upimg = (file: any) => {
  swiper.value.img = file.data;
};
// 获取分类
let sort = () => {
  api
    .getCategory("")
    .then((res: any) => {
      if (res.code == 200) {
        options.value = res.data;
        console.log(options.value);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
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
  sort();
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