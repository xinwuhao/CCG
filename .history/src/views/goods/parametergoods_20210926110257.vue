<template>
  <div>
    <div class="searchBox">
      <el-select
        v-model="input"
        clearable
        filterable
        placeholder="请选择所属商品"
      >
        <el-option
          v-for="item in options"
          :key="item._id"
          :label="item.name"
          :value="item._id"
        >
        </el-option>
      </el-select>
      <el-button icon="el-icon-search" @click="obtain"></el-button>
      <el-button type="primary" @click="ON">添加参数</el-button>
    </div>
    <!-- 添加参数弹出层 -->
    <el-dialog
      title="添加参数"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="margin-top: 10px">
        <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="图片地址:" prop="img">
            <el-upload
              class="upload-demo"
              action="http://localhost:1001/admin/upload"
              :headers="abc"
              :on-success="upimg"
              list-type="picture"
              :show-file-list="false"
              :file-list="fileList"
            >
              <div class="blueFont">点击上传图片</div>
            </el-upload>
            <div v-if="swiper.img">
              <img :src="swiper.img" class="imgBox" />
            </div>
          </el-form-item>
          <el-form-item label="参数名称:" prop="name">
            <el-input v-model="swiper.name" class="inpud"></el-input>
          </el-form-item>
          <el-form-item label="参数描述:" prop="desc">
            <el-input v-model="swiper.desc" class="inpud"></el-input>
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
        <el-table-column label="图片" align="center">
          <template #default="scope">
            <img :src="scope.row.url" class="imgBox" />
          </template>
        </el-table-column>
        <el-table-column prop="url" label="路径" align="center">
        </el-table-column>
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
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

let input = ref<any>("");
let fileList = ref<any>([]);
let dialogVisible = ref<boolean>(false);
let abc = { Authorization: localStorage.getItem("token") };
let num = ref<number>(0);
let tableData = ref<any>([]);
//删除
let reduce = (e: any) => {
  api
    .delBanner(e._id)
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
//编辑
let id = ref<string>("");
let alter = (e: any) => {
  id.value = e._id;
  swiper.value.name = e.name;
  swiper.value.desc = e.desc;
  swiper.value.img = e.url;
  dialogVisible.value = true;
  num.value = 2;
  console.log(id.value)
};
let swiper = ref<any>({
  name: "",
  desc: "",
  img: "",
});
//上传图片请求成功
let upimg = (file: any) => {
  swiper.value.img = file.data;
};
//添加按钮
let ON = () => {
  dialogVisible.value = true;
  num.value = 1;
};
//确定按钮
let getlong = () => {
  if (num.value == 1) {
    api
      .addParams({
        url: swiper.value.img,
        name: swiper.value.name,
        desc: swiper.value.desc,
        parentId: input.value,
      })
      .then((res: any) => {
        if (res.code == 200) {
          dialogVisible.value = false;
          swiper.value.img = "";
          swiper.value.title = "";
          swiper.value.path = "";
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
  } else {
    api
      .updateParams({
        url: swiper.value.img,
        name: swiper.value.name,
        desc: swiper.value.desc,
        id: id.value,
      })
      .then((res: any) => {
        if (res.code == 200) {
          dialogVisible.value = false;
          swiper.value.img = "";
          swiper.value.title = "";
          swiper.value.path = "";
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
//关闭按钮
let handleClose = (done: any) => {
  dialogVisible.value = false;
};
//下拉框数据
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
//获取数据
let obtain = () => {
  api
    .getParams({
      parentId: input.value,
    })
    .then((res: any) => {
      if (res.code == 200) {
        tableData.value = res.data;
        console.log(res);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
onMounted(() => {
  goods();
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