<template>
  <el-card class="job-detail__container">
    <div class="job-detail__header">
      <p class="job-detail__time">发布时间：{{ jobInfo.time.split("T")[0] }}</p>
      <p class="job-detail__name">{{ jobInfo.name }}</p>
      <p class="job-detail__info">
        {{ Array.isArray(jobInfo.types) ? jobInfo.types.join("｜") : "" }}
      </p>
      <p class="job-detail__location">{{ jobInfo.location }}</p>
      <el-button type="primary" size="medium" @click="clickApplyHander"
        >申请职位</el-button
      >
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
      <el-button type="primary" @click="clickApplyHander">申请职位</el-button>
    </div>
  </el-card>
  <job-apply-dialog
    v-if="allowApply"
    :job-info="jobInfo"
    :dialog-visible="dialogVisible"
    @cancel="dialogVisible = false"
    @submit="submitForm"
  ></job-apply-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import JobApplyDialog from "@/components/JobApplyDialog.vue";
import { useRoute } from "vue-router";
import { queryJobs } from "@/api/jobs";
import { applyJob } from "../api/candidate";
import store from "@/common/store";

async function getJobData(id: string | string[]) {
  const { job } = await queryJobs({ id });
  const { name, types, location, cTime: time, description: desc } = job;

  return {
    info: {
      name,
      company: "深圳虾皮信息科技有限公司",
      types,
      location,
      time,
    },
    desc: desc.split("|"),
  };
}

export default defineComponent({
  name: "JobDetail",
  components: {
    JobApplyDialog,
  },
  setup() {
    const route = useRoute();
    const commonState = ref(store.state);
    const jobInfo = ref({
      name: "",
      company: "深圳虾皮信息科技有限公司",
      types: "",
      location: "",
      time: "",
    });
    const jobDuties = ref([]);
    const dialogVisible = ref(false);
    const allowApply = computed(
      () => commonState.value.token && !commonState.value.isApplied
    );

    const submitForm = (value: any) => {
      dialogVisible.value = false;
      value.job = jobInfo.value.name;
      value.token = commonState.value.token;
      applyJob(value).then((res: any) => {
        if (res.data.success) store.setIsApplied(true);
        ElMessage.success("提交成功");
      });
    };

    const clickApplyHander = () => {
      if (commonState.value.token) {
        if (commonState.value.isApplied)
          ElMessage.error("您的剩余投递次数为 0");
        else dialogVisible.value = true;
      } else {
        ElMessage.error("请先登录");
      }
    };

    onMounted(async () => {
      const { info, desc } = await getJobData(route.params.id);

      jobInfo.value = info;
      jobDuties.value = desc;
    });

    return {
      commonState,
      jobInfo,
      jobDuties,
      dialogVisible,
      allowApply,
      submitForm,
      clickApplyHander,
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
