<template>
  <el-card class="job-detail__container">
    <div class="job-detail__header">
      <p class="job-detail__time">发布时间：{{ jobInfo.time }}</p>
      <p class="job-detail__name">{{ jobInfo.name }}</p>
      <p class="job-detail__info">{{ jobInfo.types.join("｜") }}</p>
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
import { useRoute } from 'vue-router';

// 从后端获取岗位职责文本并处理
function getJobData(jobId: string | string[]) {
  console.log(jobId);
  const data = {
    name: "前端开发工程师",
    company: "深圳虾皮信息科技有限公司",
    types: ["全职", "研发类"],
    location: "广东·深圳市",
    time: "2021-01-31",
    jobDutiesText:
      "Role and Responsibilitiesz|负责东南亚、台湾地区等市场领先的O2O平台体系搭建，参与核心业务产品前端研发；|参与亿级用户量的C端业务产品研发，具体产品形态跟随业务发展和市场需求不停的增加，目前有虚拟商品交易平台、信息流平台、直播平台、社交广告平台、社交类和营销类H5游戏、智能化客服服务系统。当前着重发展O2O相关业务；|当前业务群项目都需要在高性能、高并发、高可用的场景下，实现最优质的用户交互体验的同时，实现快速动态扩容和灾备机制。 |\n|Qualifications and Education Requirements|计算机相关专业；|本科及以上。|\n|Preferred Skills|全日制本科及以上学历，良好的英文文档读写能力；|扎实的计算机科学相关基础知识；|良好的算法思维；|熟悉前端开发基础技术(HTML/JS/CSS)，并且对新特性有一定掌握；|熟悉前端项目构建流程，依赖管理和模块加载相关原理；|熟悉React或Vue，并有一定的实践经验。|\n|Additional Notes|对Web后端开发有一定了解，熟悉Python/Golang/Node其中之一；|有ReactNative或者Flutter项目经验；|有移动端开发和适配相关经验。",
  };
  const { name, company, types, location, time, jobDutiesText } = data

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
    const route = useRoute()
    const jobId = route.params.id
    const { jobInfo, jobDuties } = getJobData(jobId);
    const dialogVisible = ref(false);

    const submitForm = () => {
      dialogVisible.value = false;
      ElMessage.success("提交成功");
    };

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
