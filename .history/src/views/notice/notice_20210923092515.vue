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
      <el-button icon="el-icon-search" @click="btn(input)"></el-button>
      <el-button type="primary" @click="ON">添加用户</el-button>
    </div>
    <!-- 添加用户弹出层 -->
    <el-dialog
      title="添加用户"
      v-model="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <div style="margin-top: 10px">
        <el-form :model="swiper" ref="ruleForm" class="demo-ruleForm">
          <el-form-item label="通知内容" prop="username">
            <el-input v-model="swiper.username" class="inpud"></el-input>
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
        <el-table-column label="用户头像">
          <template #default="scope">
            <img :src="scope.row.avatar" class="imgBox" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" width="150px">
        </el-table-column>
        <el-table-column prop="mobile" label="用户电话" width="400px">
        </el-table-column>
        <el-table-column prop="email" label="用户邮箱" width="400px">
        </el-table-column>
        <el-table-column fixed="right" label="是否禁用" width="80px">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
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

interface Obj {
  content: string;
}
let input = ref<any>("");
let fileList = ref<any>([]);
let dialogVisible = ref<boolean>(false);
let abc = { Authorization: localStorage.getItem("token") };
let num = ref<number>(0);
let tableData = ref<any>([]);
let swiper = ref<Obj>({
  content: "",
});
//搜索
let btn = (e: any) => {
  api
    .getBanner({
      current: current.value,
      pageSize: pageSize.value,
      query: e,
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
//删除
let reduce = (e: any) => {
  api
    .delUser(e._id)
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
    .showUser({
      id: e._id,
      status: e.status,
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
  id.value = e._id;
  swiper.value.content = e.content;
  dialogVisible.value = false;
  num.value = 2;
};
//确定按钮
let getlong = () => {
  console.log(swiper.value);
  if (num.value == 1) {
    api
      .addUser({
        content: swiper.value.content,
        status: true,
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
  } else {
    api
      .updateUser({
        content: swiper.value.content,
        status: true,
        id: id.value,
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
    .getNotice({
      current: current.value,
      pageSize: pageSize.value,
      query: "",
    })
    .then((res: any) => {
      if (res.code == 200) {
        // console.log(res.data);
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