<template>
  <div>
    <!-- 表格 -->
    <div style="margin-top: 20px">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" width="50"> </el-table-column>
        <el-table-column prop="threshold" label="订单日期" width="100px">
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