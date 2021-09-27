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
      <el-button type="primary" @click="ON">添加秒杀</el-button>
    </div>
    <!-- 添加秒杀弹出层 -->
    <el-dialog
      title="添加秒杀"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="margin-top: 10px">
        <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="秒杀商品：" prop="amount">
            <el-input v-model="swiper.amount" class="inpud"></el-input>
          </el-form-item>
          <el-form-item label="开始时间：" prop="start_time">
            <el-date-picker
              v-model="swiper.start_time"
              type="datetime"
              placeholder="选择时间"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间：" prop="end_time">
            <el-date-picker
              v-model="swiper.end_time"
              type="datetime"
              placeholder="选择时间"
              style="width: 100%"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="秒杀价格：" prop="number">
            <el-input v-model="swiper.number" class="inpud"></el-input>
          </el-form-item>
          <el-form-item label="秒杀数量：" prop="number">
            <el-input v-model="swiper.number" class="inpud"></el-input>
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
        <el-table-column prop="name" label="优惠券名称"> </el-table-column>
        <el-table-column label="开始时间">
          <template #default="scope">
            {{ dayjs(scope.row.start_time).format("YYYY-MM HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column label="结束时间">
          <template #default="scope">
            {{ dayjs(scope.row.end_time).format("YYYY-MM HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column prop="threshold" label="优惠金额" width="100px">
        </el-table-column>
        <el-table-column prop="amount" label="使用门槛" width="150px">
        </el-table-column>
        <el-table-column prop="number" label="发放数量" width="150px">
        </el-table-column>
        <el-table-column fixed="right" label="是否禁用" width="80px">
          <template #default="scope">
            <el-switch
              v-model="scope.row.isShow"
              active-color="#13ce66"
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
import dayjs from "dayjs";

interface Obj {
  name: string;
  amount: string;
  threshold: string;
  start_time: string;
  end_time: string;
  number: any;
}
let input = ref<any>("");
let fileList = ref<any>([]);
let dialogVisible = ref<boolean>(false);
let abc = { Authorization: localStorage.getItem("token") };
let num = ref<number>(0);
let tableData = ref<any>([]);
//删除
let reduce = (e: any) => {
  api
    .delCoupon(e._id)
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
    .showCoupon({
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
//编辑
let id = ref<string>("");
let alter = (e: any) => {
  id.value = e._id;
  swiper.value.name = e.name;
  swiper.value.end_time = e.end_time;
  swiper.value.start_time = e.start_time;
  swiper.value.threshold = e.threshold;
  swiper.value.amount = e.amount;
  swiper.value.number = e.number;
  dialogVisible.value = true;
  num.value = 2;
};
let swiper = ref<Obj>({
  name: "",
  amount: "",
  threshold: "",
  start_time: "",
  end_time: "",
  number: "",
});
//添加按钮
let ON = () => {
  dialogVisible.value = true;
  num.value = 1;
};
//确定按钮
let getlong = () => {
  if (num.value == 1) {
    api
      .addCoupon({
        name: swiper.value.name,
        amount: swiper.value.amount,
        threshold: swiper.value.threshold,
        start_time: swiper.value.start_time,
        end_time: swiper.value.end_time,
        number: swiper.value.number,
        isShow: true,
      })
      .then((res: any) => {
        if (res.code == 200) {
          dialogVisible.value = false;
          swiper.value.name = "";
          swiper.value.amount = "";
          swiper.value.threshold = "";
          swiper.value.start_time = "";
          swiper.value.end_time = "";
          swiper.value.number = "";
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
      .updateCoupon({
        name: swiper.value.name,
        amount: swiper.value.amount,
        threshold: swiper.value.threshold,
        start_time: swiper.value.start_time,
        end_time: swiper.value.end_time,
        number: swiper.value.number,
        isShow: true,
        id: id.value,
      })
      .then((res: any) => {
        if (res.code == 200) {
          dialogVisible.value = false;
          // swiper.value.img = "";
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
    .getCoupon({
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
  width: 200px;
  height: 80px;
}
</style>