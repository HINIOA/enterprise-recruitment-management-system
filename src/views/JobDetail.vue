<template>
  <el-card class="job-detail__container">
    <div class="job-detail__header">
      <p class="job-detail__time">发布时间：{{ jobInfo.time }}</p>
      <p class="job-detail__name">{{ jobInfo.name }}</p>
      <p class="job-detail__info">
        {{ Array.isArray(jobInfo.types) ? jobInfo.types.join("｜") : "" }}
      </p>
      <p class="job-detail__location">{{ jobInfo.location }}</p>
      <el-button type="primary" size="medium" @click="dialogVisible = true">申请职位</el-button>
    </div>
    <div class="job-detail__main">
      <div class="job-detail__desc-title">
        职位描述
        <div class="job-detail__desc-title--hr"></div>
      </div>
      <p v-for="duty in jobDuties" :key="duty">
        {{ duty === "\n" ? "&nbsp;" : duty }}
      </p>
    </div>
    <div class="job-detail__footer">
      <el-button type="primary" @click="dialogVisible = true">申请职位</el-button>
    </div>
  </el-card>
  <job-apply-dialog
    :job-info="jobInfo"
    :dialog-visible="dialogVisible"
    @cancel="dialogVisible=false"
    @submit="submitForm"
  ></job-apply-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ElMessage } from "element-plus";
import JobApplyDialog from "@/components/JobApplyDialog.vue";
import { useRoute } from "vue-router";
import { queryJobs } from "@/api/jobs";
import applyJob from "../api/candidate";

async function getJobData(id: string | string[]) {
  const { job } = await queryJobs({ id });
  const { name, types, location, time, desc } = job;

  return {
    jobInfo: ref({
      name,
      company,
      types,
      location,
      time,
    }),
    jobDuties: ref(jobDutiesText.split("|")),
  };
}

export default defineComponent({
  name: "JobDetail",
  components: {
    JobApplyDialog,
  },
  setup() {
    const route = useRoute();
    const jobInfo = ref({
      name: "",
      company: "深圳虾皮信息科技有限公司",
      types: "",
      location: "",
      time: "",
    });
    const jobDuties = ref([]);
    const dialogVisible = ref(false);

    const submitForm = (value: any) => {
      dialogVisible.value = false;
      value.job = jobInfo.value.name;
      applyJob(value).then((res) => {
        ElMessage.success("提交成功");
      });
    };

    onMounted(async () => {
      const { info, desc } = await getJobData(route.params.id);

      jobInfo.value = info;
      jobDuties.value = desc;
    });

    return {
      jobInfo,
      jobDuties,
      dialogVisible,
      submitForm,
    };
  },
});
</script>

<style lang="scss">
.job-detail {
  &__container {
    padding: 2rem;
    max-width: 75rem;
    margin: 0 auto;
  }

  // 头部

  &__header {
    padding: 1rem;
    position: relative;

    .el-button {
      position: absolute;
      right: 0;
    }
  }

  &__time {
    color: #89909e;
    font-size: 0.8rem;
  }

  &__name {
    margin-top: 0.5rem;
    font-size: 1.2rem;
    line-height: 1.8rem;
    color: #222831;
  }

  &__info {
    margin-top: 1rem;
    color: #89909e;
  }

  &__location {
    display: inline-block;
    margin-top: 0.5rem;
    color: #575d6a;
  }

  // 主体（职位描述）

  &__main {
    padding: 1rem;
    font-size: 0.9rem;
    color: #292c32;
  }

  &__desc {
    &-title {
      display: flex;
      align-items: center;
      margin-bottom: 1rem;
      font-size: 1rem;
      color: #222831;

      &--hr {
        flex: 1;
        margin-left: 1rem;
        height: 1px;
        background-color: #f4f4f5;
      }
    }
  }

  &__footer {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }
}
</style>
