

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import api from "../../http/aip";

interface Obj {
  username: string;
  password: string;
}

export default defineComponent({
  setup() {
    //定义变量
    const ruleFormsss = ref(null);
    let ruleForm = ref<Obj>({
      username: "",
      password: "",
    });
    let router = useRouter();
    let rules = {
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };
    //   //定义方法
    let submitForm = () => {
      api
        .login({
          username: ruleForm.value.username,
          password: ruleForm.value.password,
        })
        .then((res: any) => {
          if (res.code == 200) {
            ElMessage.success("登录成功");
            localStorage.setItem("login", JSON.stringify(res.data));
            localStorage.setItem("token", res.token);
            router.push("/");
          } else {
            ElMessage.error("用户名或密码有误，请重新输入");
          }
        })
        .catch((err: any) => {
          console.log(err);
        });
    };

  },
});
</script>

<style scoped>

</style>