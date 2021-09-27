<template>
  <div class="box">
    <!-- 左边 -->
    <div>
      <el-tree
        :data="dataSource"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
      />
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
let data = ref<any>([]);
let dataSource = ref<any>(JSON.parse(JSON.stringify(data)));
  let append=(data:any)=> {
      const newChild = { id: id++, label: 'testtest', children: [] }
      if (!data.children) {
        data.children = []
      }
      data.children.push(newChild)
      dataSource.value = [...dataSource]
    }
    
 let   remove=(node:any, data:any)=> {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d:any) => d.id === data.id)
      children.splice(index, 1)
     dataSource.value = [...dataSource]
    }
let renderContent=(h:any, { node, data, store }:{node:any, data:any, store:any })=>{
      return h(
        'span',
        {
          class: 'custom-tree-node',
        },
        h('span', null, node.label),
        h(
          'span',
          null,
          h(
            'a',
            {
              onClick: () =>append(data),
            },
            'Append '
          ),
          h(
            'a',
            {
              onClick: () =>remove(node, data),
            },
            'Delete'
          )
        )
      )
    },
//获取
let obtain = () => {
  api
    .getCategory("")
    .then((res: any) => {
      if (res.code == 200) {
        options.value = res.data;
        data.value = res.data.map((item: any) => {
          return {
            label: item.name,
            id: item._id,
            parentId: item.parentId,
            children: item.list.map((item1: any) => {
              return {
                label: item1.name,
                id: item1._id,
                parentId: item1.parentId,
              };
            }),
          };
        });
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