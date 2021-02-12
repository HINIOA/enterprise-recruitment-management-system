<template>
  <el-dialog
    title="登录"
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    width="400px"
    top="34vh"
  >
    <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
      <el-form-item prop="phone">
        <el-input v-model.number="loginForm.phone" placeholder="手机号码">
          <template #prepend>+86</template>
        </el-input>
      </el-form-item>
      <el-form-item prop="code" :error="codeError">
        <el-input v-model.number="loginForm.code" placeholder="验证码">
          <template #append>
            <el-link type="primary" :underline="false">获取验证码</el-link>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button
          type="primary"
          @click="loginHandler"
          :style="{ width: '100%' }"
        >
          登 录
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { checkPhone } from "../utils/form";
import { login } from "../api/candidate";
import store from "../store";

export default defineComponent({
  props: ["modelValue"],
  emit: ["update:modelValue", "success"],
  setup(_, ctx) {
    const loginFormRef = ref(null);
    const loginForm = ref({
      phone: "",
      code: "",
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
      code: [
        {
          required: true,
          message: "请输入收到的验证码",
          trigger: "blur",
        },
      ],
    });
    const codeError = ref("");

    const loginHandler = () => {
      (loginFormRef.value! as {
        validate(cb: (valid: boolean) => void): void;
      }).validate((valid: boolean) => {
        if (valid) {
          login(loginForm.value).then((data) => {
            const { success, token, validTime, isApplied } = data;

            if (success) {
              store.setToken(token, validTime);
              store.setPhone(loginForm.value.phone);
              store.setIsApplied(isApplied);
              ctx.emit("update:modelValue", false);
            } else {
              codeError.value = "验证码错误";
            }
          });
        }
      });
    };

    return {
      loginFormRef,
      loginForm,
      loginRules,
      codeError,
      loginHandler,
    };
  },
});
</script>

<style></style>
