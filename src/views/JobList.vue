<template>
  <div class="job-list__container">
    <el-card class="job-list__filter">
      <p class="job-list__filter-title">职位筛选</p>
      <search
        placeholder="输入职位关键字"
        buttonText="搜索职位"
        @search="handleSearch"
      ></search>
    </el-card>
    <el-card v-loading="loading" class="job-list__content">
      <template v-if="jobList.length > 0">
        <div
          class="job-list__item"
          v-for="job in jobList"
          :key="job.id"
          @click="toJobDetail(job['_id'])"
        >
          <div class="job-list__item-container">
            <p class="job-list__item-name">{{ job.name }}</p>
            <p class="job-list__item-info--middle">
              {{ job.types.join("｜") }}
            </p>
            <div class="job-list__item-info--bottom">
              <p class="job-list__item-info--position">{{ job.location }}</p>
              <p class="job-list__item-info--time">
                发布时间：{{ job.cTime.split("T")[0] }}
              </p>
            </div>
          </div>
        </div>
      </template>
      <div v-else class="job-list__empty-tips">
        尚无任何相关职位
      </div>
    </el-card>
    <div v-if="jobList.length > 0" class="job-list__pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="page.size"
        :total="page.total"
        @update:current-page="handleCurPageUpdate"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import Search from "../components/BaseSearch.vue";
import { queryJobs } from "../api/jobs";

export default defineComponent({
  name: "JobList",
  components: {
    Search,
  },
  setup() {
    const router = useRouter();
    const jobList = ref([]);
    const page = ref({
      size: 10,
      total: 0,
      current: 1,
    });
    const loading = ref(false);

    const getDataAndSet = async (name?: string) => {
      loading.value = true;
      const { data, total } = await queryJobs(null, {
        name,
        current: page.value.current,
        pageSize: page.value.size,
      });

      jobList.value = data;
      page.value.total = total;
      loading.value = false;
    };

    const toJobDetail = (jobId: string) => {
      router.push("/job-detail/" + jobId);
    };

    const handleSearch = async (input: string) => getDataAndSet(input);

    const handleCurPageUpdate = (current: number) => {
      page.value.current = current;
      getDataAndSet();
    };

    onMounted(async () => getDataAndSet());

    return {
      jobList,
      page,
      loading,
      handleSearch,
      handleCurPageUpdate,
      toJobDetail,
    };
  },
});
</script>

<style lang="scss">
.job-list {
  &__container {
    padding: 2rem;
    margin: 0 auto;
    max-width: 75rem;
  }

  &__filter {
    margin-bottom: 1rem;

    &-title {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }
  }

  &__content {
    margin-bottom: 2rem;

    .el-card__body {
      padding: 0 !important;
    }
  }

  &__item {
    padding: 0 2rem;
    cursor: pointer;

    &:last-of-type {
      border-bottom: 0;
    }

    &:hover {
      background-color: rgb(249, 249, 250);
    }

    &-container {
      padding: 1.5rem 0;
      border-bottom: 1px solid rgb(238, 238, 238);
    }

    &-name {
      max-width: 20rem;
      font-size: 1.2rem;
      font-weight: bold;
      line-height: 1.5rem;
      color: #222831;
      margin-bottom: 0.8rem;
    }

    &-info {
      &--middle {
        font-size: 1rem;
        line-height: 1.5rem;
        color: #a2a4a8;
        margin-bottom: 0.8rem;
      }

      &--bottom {
        display: flex;
        justify-content: space-between;
      }

      &--position {
        font-size: 1rem;
        color: #575d6a;
      }

      &--time {
        font-size: 0.8rem;
        color: #a2a4a8;
      }
    }
  }

  &__pagination {
    display: flex;
    justify-content: center;
  }

  &__empty-tips {
    padding: 1rem 0;
    text-align: center;
  }
}
</style>
