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
            <el-form-item label="商品名称:" prop="name">
              <el-input v-model="swiper.name" class="inpud"></el-input>
            </el-form-item>
            <el-form-item label="商品分类:" prop="category">
              <el-select
                v-model="swiper.category"
                placeholder="Select"
                style="width: 100%"
              >
                <el-option-group
                  v-for="group in options"
                  :key="group.name"
                  :label="group.name"
                >
                  <el-option
                    v-for="item in group.list"
                    :key="item.name"
                    :label="item.name"
                    :value="item._id"
                  >
                  </el-option>
                </el-option-group>
              </el-select>
            </el-form-item>
            <el-form-item label="商品原价:" prop="originalPrice">
              <el-input v-model="swiper.originalPrice" class="inpud"></el-input>
            </el-form-item>
            <el-form-item label="商品现价:" prop="presentPrice">
              <el-input v-model="swiper.presentPrice" class="inpud"></el-input>
            </el-form-item>
            <el-form-item label="封面图:" prop="cover">
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
            <el-form-item label="商品单位:" prop="company">
              <el-input v-model="swiper.company" class="inpud"></el-input>
            </el-form-item>
            <el-form-item label="商品库存" prop="stock">
              <el-input v-model="swiper.stock" class="inpud"></el-input>
            </el-form-item>
            <el-form-item label="商品简介" prop="introduction">
              <el-input
                v-model="swiper.introduction"
                :rows="2"
                type="textarea"
                placeholder="请输入商品简介"
              />
            </el-form-item>
            <el-form-item label="推荐介绍" prop="sellDesc">
              <el-input
                v-model="swiper.sellDesc"
                :rows="4"
                type="textarea"
                placeholder="请输入推荐介绍"
              />
            </el-form-item>

            <el-form-item label="是否新品" prop="isNewGood">
              <el-switch
                v-model="swiper.isNewGood"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="chen"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="是否热销" prop="isHot">
              <el-switch
                v-model="swiper.isHot"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="chen"
              >
              </el-switch>
            </el-form-item>
            <el-form-item label="是否推荐" prop="isRecommend">
              <el-switch
                v-model="swiper.isRecommend"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="chen"
              >
              </el-switch>
            </el-form-item>
          </el-form>
          <div>
            <el-button @click="judge = '0'">取消</el-button>
            <el-button type="primary" @click="confirm">确定</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="媒体信息" name="2" disabled>
          <el-upload
            action="http://localhost:1001/admin/upload"
            :headers="abc"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-success="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <div class="zebox">
              <img :src="img" class="imgbox" />
            </div>
          </el-dialog>
          <div>
            <el-button @click="judge = '1'">取消</el-button>
            <el-button type="primary" @click="confirm1">确定</el-button>
          </div>
        </el-tab-pane>

        <el-tab-pane label="商品规格" name="3" disabled>
          <el-form :model="user" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="所属模型" prop="parentId1">
              <el-select
                v-model="user.parentId"
                placeholder="请选择所属模型"
                @change="emmm"
              >
                <div v-for="(item, index) in arr" :key="index">
                  <el-option :value="item._id" :label="item.name">{{
                    item.name
                  }}</el-option>
                </div>
              </el-select>
            </el-form-item>
            <el-form-item label="商品规格" prop="spec">
              <!-- 商品规格 -->
              <div class="specd">
                <div class="spBox">
                  <div v-for="(item, index) in arr" :key="index">
                    <el-checkbox
                      v-model="item.check"
                      @change="handleCheckAllChange($event, item)"
                      >{{ item.name }}
                    </el-checkbox>

                    <el-checkbox-group
                      v-model="item.checkList"
                      @change="handleCheckedCitiesChange2($event, item)"
                    >
                      <el-checkbox
                        v-for="(item1, index1) in item.spec_item.split('\n')"
                        :key="index1"
                        :label="item1"
                        >{{ item1 }}</el-checkbox
                      >
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
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
let input1 = ref<any>("");
//切换层
let judge = ref<string>("3");
//上传图片token
let abc = { Authorization: localStorage.getItem("token") };
//接受图片路径
let fileList = ref<any>([]);
// 下拉
let options = ref<any>([]);
let options1 = ref<any>([]);
//表格数据
let tableData = ref<any>([]);
//表单
let swiper = ref<any>({
  name: "",
  category: "",
  cover: "",
  isHot: true,
  isRecommend: true,
  originalPrice: "",
  presentPrice: "",
  introduction: "",
  company: "",
  stock: "",
  isNewGood: true,
  sellDesc: "",
});
//表单确定键
let confirm = () => {
  judge.value = "2";
};
//媒体
let img = ref<string>("");
let dialogVisible = ref<boolean>(false);
let handleRemove = (e: any) => {
  img.value = e.data;
};
let confirm1 = () => {
  judge.value = "3";
};
let handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true;
};
//规格
let user = ref<any>({
  parentId: "",
  spec: [],
});
let arr = ref<any>([]);
let emmm = () => {
  api
    .getSpec({
      parentId: input1.value,
    })
    .then((res: any) => {
      if (res.code == 200) {
        res.data.map((item: any) => {
          item.check = false;
          item.checkList = [];
        });
        arr.value = res.data;
        console.log(arr.value);
      }
    })
    .catch((err: any) => {
      console.log(err);
    });
};
// 全选
let handleCheckAllChange = (e: any, item: any) => {
  if (e) {
    item.checkList = item.spec_item.split("\n");
  } else {
    item.checkList = [];
  }
};
// 单选
let handleCheckedCitiesChange2 = (e: any, item: any) => {
  item.check = e.length === item.spec_item.split("\n").length ? true : false;
};

//添加按钮
let ON = () => {
  judge.value = "1";
};
//上传图片请求成功
let upimg = (file: any) => {
  swiper.value.cover = file.data;
};
// 获取分类
let sort = () => {
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
        options1.value = res.data;
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
  model();
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
.imgbox {
  width: 500px;
  height: 500px;
}
.zebox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>