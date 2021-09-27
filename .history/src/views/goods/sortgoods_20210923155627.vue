<template>
  <div class="box">
    <!-- 左边 -->
    <div>
      <!-- <el-tree
        :data="options"
        :props="defaultProps"
        accordion
        @node-click="handleNodeClick"
      /> -->
      <div class="custom-tree-container">
        <div class="block">
          <p>Using render-content</p>
          <el-tree
            :data="options"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
            :render-content="renderContent"
          />
        </div>
        <div class="block">
          <p>Using scoped slot</p>
          <el-tree
            :data="options"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <a @click="append(data)"> Append </a>
                  <a @click="remove(node, data)"> Delete </a>
                </span>
              </span>
            </template>
          </el-tree>
        </div>
      </div>
    </div>
    <!-- 右边 -->
    <div>
      <div class="newlyBox">
        <div>新增分类</div>
        <div class="blueColor" @click="affirm(swiper)">确认</div>
      </div>
      <div>
        <div style="margin-top: 10px">
          <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="分类名称" prop="name">
              <el-input
                v-model="swiper.name"
                class="inpud"
                placeholder="请输入分类名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="上级分类" prop="parentId">
              <el-select
                v-model="swiper.parentId"
                clearable
                filterable
                placeholder="请选择上级分类"
                style="width: 100%"
              >
                <el-option
                  v-for="item in options"
                  :key="item._id"
                  :label="item.name"
                  :value="item._id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="分类别名" prop="short_name">
              <el-input
                v-model="swiper.short_name"
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
import { ElMessage } from "element-plus";

interface Obj {
  name: string;
  parentId: string;
  short_name: string;
}

let swiper = ref<Obj>({
  name: "",
  parentId: "",
  short_name: "",
});
let options = ref<any>([]);
let affirm = (e: any) => {
  //一级
  if (e.parentId == "") {
    api
      .addCategory({
        name: e.name,
        short_name: e.short_name,
      })
      .then((res: any) => {
        if (res.code == 200) {
          swiper.value.name = "";
          swiper.value.parentId = "";
          swiper.value.short_name = "";
          ElMessage.success({
            message: `${res.msg}`,
            type: "success",
          });
        } else ElMessage.error(`${res.msg}`);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  //二级
  else {
    api
      .addSecondCategory({
        name: e.name,
        parentId: e.parentId,
      })
      .then((res: any) => {
        console.log(res);
        if (res.code == 200) {
          swiper.value.name = "";
          swiper.value.parentId = "";
          swiper.value.short_name = "";
          ElMessage.success({
            message: `${res.msg}`,
            type: "success",
          });
        } else ElMessage.error(`${res.msg}`);
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
  obtain();
};
let defaultProps = ref<any>({
  children: "list",
  label: "name",
});
let handleNodeClick = (data: any) => {
  console.log(data);
};
//获取
let obtain = () => {
  api
    .getCategory("")
    .then((res: any) => {
      if (res.code == 200) {
        options.value = res.data;
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