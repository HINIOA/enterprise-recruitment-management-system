<template>
  <el-dialog
    :title="isLogin ? '登录' : '注册'"
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    width="400px"
    top="34vh"
  >
    <el-form :model="form" :rules="loginRules" ref="formRef">
      <el-form-item prop="phone" :error="phoneError">
        <el-input
          v-model.number="form.phone"
          placeholder="请输入手机号码"
          prefix-icon="el-icon-mobile-phone"
        >
        </el-input>
      </el-form-item>
      <el-form-item prop="password" :error="passwordError">
        <el-input
          v-model="form.password"
          placeholder="请输入密码"
          show-password
          prefix-icon="el-icon-lock"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="submitHandler"
          :style="{ width: '100%' }"
        >
          {{ isLogin ? "登 录" : "注 册" }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { checkPhone } from "../utils/form";
import { signIn, login } from "../api/candidate";
import store from "../common/store";

export default defineComponent({
  props: ["modelValue", "isLogin"],
  emit: ["update:modelValue", "success"],
  setup(props, ctx) {
    const formRef = ref(null);
    const form = ref({
      phone: "",
      password: "",
    });
    const loginRules = ref({
      phone: [
        {
          type: "number",
          required: true,
          validator: checkPhone,
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "请输入密码",
          trigger: "blur",
        },
      ],
    });
    const phoneError = ref("");
    const passwordError = ref("");

    const submitHandler = () => {
      (formRef.value! as {
        validate(cb: (valid: boolean) => void): void;
      }).validate((valid: boolean) => {
        if (valid) {
          if (props.isLogin) {
            login(form.value).then((data) => {
              const { success, code, token, validTime, isApplied } = data;

              if (success) {
                store.setToken(token, validTime);
                store.setPhone(form.value.phone);
                store.setIsApplied(isApplied);
                ctx.emit("update:modelValue", false);
              } else {
                if (code === 1) phoneError.value = "手机号未注册";
                else passwordError.value = "密码错误";
              }
            });
          } else {
            signIn(form.value).then((data) => {
              const { success } = data;

              if (success) {
                ctx.emit("update:modelValue", false);
              } else {
                phoneError.value = "手机号已注册，请直接登录";
              }
            });
          }
        }
      });
    };

    return {
      formRef,
      form,
      loginRules,
      phoneError,
      passwordError,
      submitHandler,
    };
  },
});
</script>

<style></style>
