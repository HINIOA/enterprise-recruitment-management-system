<template>
  <el-dialog
    title="职位申请"
    v-model="visible"
    custom-class="job-apply"
    top="10vh"
    center
  >
    <div class="job-apply__info">
      <p class="job-apply__info-company">{{ jobInfo.company }}</p>
      <p class="job-apply__info-name">{{ jobInfo.name }}</p>
      <div class="job-apply__info-other">
        <p class="job-apply__info-other-type">
          {{ jobInfo.types.join("｜") }}
        </p>
        <p class="job-apply__info-other-location">
          {{ jobInfo.location }}
        </p>
        <p class="job-apply__info-other-time">发布时间：{{ jobInfo.time }}</p>
      </div>
    </div>
    <el-form :model="form" :rules="rules" ref="formEl" label-width="auto">
      <div class="job-apply__form">
        <el-form-item label="上传简历" prop="resume">
          <el-upload
            class="job-apply__form-upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            drag
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将简历拖到此处，或<em>点击上传</em>
            </div>
            <template #tip>
              <div class="el-upload__tip">
                支持pdf、doc、docx、jpg、jpeg、png等简历格式
              </div>
            </template>
          </el-upload>
        </el-form-item>
        <div class="row">
          <div class="col">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="form.sex">
                <el-radio label="男" value="man"></el-radio>
                <el-radio label="女" value="woman"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <el-form-item label="年龄" prop="age">
              <el-input v-model="form.age"></el-input>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item label="最高学历" prop="highestEducation">
              <el-select v-model="form.highestEducation" placeholder="请选择">
                <el-option label="本科" value="undergraduate"></el-option>
                <el-option label="硕士" value="master"></el-option>
                <el-option label="博士" value="doctor"></el-option>
                <el-option label="大专" value="juniorCollege"></el-option>
                <el-option label="高中" value="highSchool"></el-option>
                <el-option label="其他" value="other"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm"
          :disabled="isSubmiting"
          :loading="isSubmiting"
          >{{ isSubmiting ? "提交中" : "提 交" }}</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "JobApplyDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      require: true,
    },
    jobInfo: {
      type: Object,
      require: true,
    },
  },
  emits: ['submit'],
  setup(props, ctx) {
    const visible = computed(() => props.dialogVisible);
    const form = ref({
      name: "",
      phone: "",
      email: "",
      sex: "",
      age: "",
      highestEducation: "",
    });
    const rules = {
      resume: [{ required: true, message: "请上传您的简历", trigger: "blur" }],
      name: [{ required: true, message: "请输入您的姓名", trigger: "blur" }],
      phone: [
        {
          type: "number",
          required: true,
          message: "请输入您的手机号码",
          trigger: "blur",
        },
      ],
      email: [{ required: true, message: "请输入您的邮箱", trigger: "blur" }],
    };
    const formEl = ref(null);
    const isSubmiting = ref(false);

    const submitForm = () => {
      (formEl.value! as {
        validate(cb: (valid: boolean) => void): void;
      }).validate((valid) => {
        console.log(valid);
        if (valid) {
          isSubmiting.value = true;
          setTimeout(() => {
            isSubmiting.value = false;
            ctx.emit("submit", form);
          }, 1000);
        } else {
          return false;
        }
      });
    };

    return {
      visible,
      form,
      rules,
      formEl,
      isSubmiting,
      submitForm,
    };
  },
});
</script>

<style lang="scss">
.job-apply {
  .el-dialog__body {
    padding: 0;
  }

  &__info {
    padding: 1.5rem 2rem 1rem 2rem;
    border-bottom: 1px solid #dddfe3;

    &-company {
      font-size: 1rem;
      color: #89909e;
      font-weight: bold;
      margin-bottom: 7px;
    }

    &-name {
      font-size: 1.5rem;
      line-height: 2rem;
      color: #575d6a;
    }

    &-other {
      font-size: 1rem;
      margin-top: 0.5rem;
      line-height: 1.5rem;
      color: #575d6a;

      &-type {
        display: inline-block;
      }

      &-location {
        margin-left: 0.8rem;
        display: inline-block;
      }

      &-time {
        float: right;
        font-size: 0.8rem;
        color: #89909e;
      }
    }
  }

  &__form {
    padding: 2rem;

    &-upload {
      width: 100%;

      .el-upload {
        width: 100%;

        &-dragger {
          width: 100%;
        }
      }
    }
  }
}
</style>
