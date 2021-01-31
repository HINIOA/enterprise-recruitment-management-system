<template>
  <div class="job-list__container">
    <el-card class="job-list__filter">
      <p class="job-list__filter-title">职位筛选</p>
      <base-search
        placeholder="输入职位关键字"
        buttonText="搜索职位"
        @search="searchHandler"
      ></base-search>
    </el-card>
    <el-card class="job-list__content">
      <div class="job-list__item" v-for="job in jobList" :key="job.id" @click="toJobDetail(job.id)">
        <div class="job-list__item-container">
          <p class="job-list__item-name">{{ job.name }}</p>
        <p class="job-list__item-info--middle">{{ job.types.join('｜') }}</p>
        <div class="job-list__item-info--bottom">
          <p class="job-list__item-info--position">{{ job.position }}</p>
          <p class="job-list__item-info--time">发布时间：{{ job.time }}</p>
        </div>
        </div>
      </div>
    </el-card>
    <div class="job-list__pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-count="page.count">
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';
import BaseSearch from "../components/BaseSearch.vue";

function getData() {
  const data = {
    jobList: [
      {id: '1', name: '前端开发工程师', types: ['全职','研发类'], position: '广东·深圳市', time: '2021-01-30'},
      {id: '2', name: '前端开发工程师', types: ['全职','研发类'], position: '广东·深圳市', time: '2021-01-30'},
      {id: '3', name: '前端开发工程师', types: ['全职','研发类'], position: '广东·深圳市', time: '2021-01-30'},
      {id: '4', name: '前端开发工程师', types: ['全职','研发类'], position: '广东·深圳市', time: '2021-01-30'},
      {id: '5', name: '前端开发工程师', types: ['全职','研发类'], position: '广东·深圳市', time: '2021-01-30'},
    ],
    page: {
      next: 2,
      count: 10
    }
  }
  const { jobList, page } = data

  return {
    jobList: ref(jobList),
    page: ref(page),
  }
}

export default defineComponent({
  name: "JobList",
  components: {
    baseSearch: BaseSearch,
  },
  setup() {
    const router = useRouter()
    const { jobList, page } = getData()

    const searchHandler = (input: string) => {
      console.log(input);
    };

    const toJobDetail = (jobId: string) => {
      router.push('/job-detail/' + jobId)
    }

    return {
      jobList,
      page,
      searchHandler,
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
      background-color: rgb(249,249,250);
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
}
</style>
