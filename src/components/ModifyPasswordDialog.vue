<template>
  <el-dialog
    title="修改密码"
    :model-value="modelValue"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    custom-class="modify-password-dialog"
    width="400px"
    top="34vh"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="auto">
      <el-form-item label="旧密码" prop="oldPassword" :error="oldPasswordError">
        <el-input
          v-model="form.oldPassword"
          placeholder="请输入旧密码"
          show-password
        >
        </el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          v-model="form.newPassword"
          placeholder="请输入新密码"
          show-password
        >
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('update:modelValue', false)">取 消</el-button>
        <el-button type="primary" @click="submitHandler"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { modifyPassword } from "@/api/candidate";
import { ElMessage } from "element-plus";
import { defineComponent, ref } from "vue";

export default defineComponent({
  props: ["modelValue"],
  emit: ["update:modelValue"],
  setup(_, ctx) {
    const formRef = ref(null);
    const form = ref({
      oldPassword: "",
      newPassword: "",
    });
    const rules = ref({
      oldPassword: [
        {
          required: true,
          message: "请输入旧密码",
          trigger: "blur",
        },
      ],
      newPassword: [
        {
          required: true,
          message: "请输入新密码",
          trigger: "blur",
        },
      ],
    });
    const oldPasswordError = ref("");

    const submitHandler = () => {
      (formRef.value! as {
        validate(cb: (valid: boolean) => void): void;
      }).validate((valid: boolean) => {
        if (valid) {
          modifyPassword(form.value).then((res) => {
            if (res.success) {
              ctx.emit("update:modelValue", false);
              ElMessage.success("修改成功");
            } else {
              oldPasswordError.value = "旧密码错误，请重新输入";
            }
          });
        }
      });
    };

    return {
      formRef,
      form,
      rules,
      oldPasswordError,
      submitHandler,
    };
  },
});
</script>

<style lang="scss">
.modify-password-dialog {
  .el-dialog__body {
    padding: 22px 20px 0;
  }
}
</style>
