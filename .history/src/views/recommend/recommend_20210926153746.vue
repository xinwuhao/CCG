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
      <el-button type="primary" @click="ON">添加导航</el-button>
    </div>
    <!-- 添加导航弹出层 -->
    <el-dialog
      title="添加导航"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="margin-top: 10px">
        <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="通知内容" prop="name">
            <el-input v-model="swiper.name" class="inpud"></el-input>
          </el-form-item>
          <el-form-item label="导航描述" prop="desc">
            <el-input v-model="swiper.desc" class="inpud"></el-input>
          </el-form-item>
          <el-form-item label="通知内容" prop="goods">
            <el-select
              v-model="swiper.goods"
              clearable
              filterable
              multiple
              placeholder="请选择下属商品"
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
        <el-table-column label="#" type="index" width="50"> </el-table-column>
        <el-table-column prop="name" label="导航名称"> </el-table-column>
        <el-table-column prop="desc" label="导航描述"> </el-table-column>
        <el-table-column fixed="right" label="是否禁用">
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

let input = ref<any>("");
let fileList = ref<any>([]);
let dialogVisible = ref<boolean>(false);
let num = ref<number>(0);
let tableData = ref<any>([]);
let swiper = ref<any>({
  name: "",
  desc: "",
  goods: [],
});
//删除
let reduce = (e: any) => {
  api
    .delRecommendNav(e._id)
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
    .showRecommendNav({
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
  dialogVisible.value = true;
  num.value = 1;
};
//编辑
let id = ref<string>("");
let alter = (e: any) => {
  console.log(e);
  id.value = e._id;
  swiper.value.name = e.name;
  swiper.value.desc = e.desc;
  dialogVisible.value = true;
  num.value = 2;
};
//确定按钮
let getlong = () => {
  let arr = options.value.filter((item: any) => {
    return item._id == swiper.value.goods;
  });
  if (num.value == 1) {
    api
      .addRecommendNav({
        name: swiper.value.name,
        desc: swiper.value.desc,
        goods: arr[0],
      })
      .then((res: any) => {
        if (res.code == 200) {
          dialogVisible.value = false;
          swiper.value.name = "";
          swiper.value.desc = "";
          swiper.value.goods = "";
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
      .updateRecommendNav({
        name: swiper.value.name,
        desc: swiper.value.desc,
        goods: arr[0],
        id: id.value,
      })
      .then((res: any) => {
        if (res.code == 200) {
          dialogVisible.value = false;
          swiper.value.name = "";
          swiper.value.desc = "";
          swiper.value.goods = "";
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
let current = ref<number>(1);
let pageSize = ref<number>(10);
//获取数据
let obtain = () => {
  api
    .getRecommendNav({
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
onMounted(() => {
  obtain();
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