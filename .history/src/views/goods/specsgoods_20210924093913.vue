<template>
  <div>
    <div class="searchBox">
      <el-select
        v-model="input"
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
      <div style="margin: 0px 20px">
        <el-button type="primary" icon="el-icon-search" @click="obtain"
          >查询</el-button
        >
      </div>
      <el-button icon="el-icon-refresh-left" @click="obtain">重置</el-button>
    </div>
    <div v-if="input !== ''">
      <el-button type="primary" @click="ON" icon="el-icon-plus"
        >添加模型</el-button
      >
    </div>
    <!-- 添加模型弹出层 -->
    <el-dialog
      title="添加模型"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="margin-top: 10px">
        <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="模型名称" prop="content">
            <el-input v-model="swiper.name" class="inpud"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getlong">确 定</el-button>
      </template>
    </el-dialog>
    <!-- 表格 -->
    <div style="margin-top: 20px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" width="50" align="center">
        </el-table-column>
        <el-table-column prop="name" label="模型名称" align="center">
        </el-table-column>
        <el-table-column prop="name" label="所属模型" align="center">
        </el-table-column>
        <el-table-column prop="name" label="展示方式" align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="规格选项"
          width="800px"
          align="center"
        >
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button @click="reduce(scope.row)" type="text" size="small"
              >删除</el-button
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
  name: string;
}
let input = ref<any>("");
let options = ref<any>([]);
let fileList = ref<any>([]);
let dialogVisible = ref<boolean>(false);
let abc = { Authorization: localStorage.getItem("token") };
let num = ref<number>(0);
let tableData = ref<any>([]);
let swiper = ref<Obj>({
  name: "",
});
let goto = (e: any) => {
  console.log(e);
};
//删除
let reduce = (e: any) => {
  api
    .delModel(e._id)
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
  dialogVisible.value = true;
};

//确定按钮
let getlong = () => {
  api
    .addModel({
      name: swiper.value.name,
    })
    .then((res: any) => {
      if (res.code == 200) {
        dialogVisible.value = false;
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
//关闭按钮
let handleClose = (done: any) => {
  dialogVisible.value = false;
};
let current = ref<number>(1);
let pageSize = ref<number>(10);
//获取模型
let model = () => {
  api
    .getModel({
      current: 1,
      pageSize: 99999,
      query: input.value,
    })
    .then((res: any) => {
      if (res.code == 200) {
        console.log(res.data);
        options.value = res.data;
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
//获取数据
let obtain = () => {
  api
    .getModel({
      current: current.value,
      pageSize: pageSize.value,
      query: "",
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
  model()
});
</script>

<style scoped>
.searchBox {
  display: flex;
  margin-bottom: 10px;
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