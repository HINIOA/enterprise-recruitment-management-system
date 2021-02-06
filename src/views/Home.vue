<template>
  <div class="home">
    <!-- Banner -->
    <el-carousel height="33.3vw" :autoplay="false" class="banner">
      <el-carousel-item v-for="url in bannerUrls" :key="url">
        <img :src="url" alt="banner" class="banner__image" />
      </el-carousel-item>
    </el-carousel>
    <!-- 开放职位 -->
    <div class="jobs">
      <title-card title="开放职位" class="jobs__container">
        <search
          placeholder="输入职位关键字"
          buttonText="搜索职位"
          class="jobs__search"
          @search="handleSearch"
        ></search>
        <div class="jobs__content">
          <el-row v-for="(row, idx) in jobListRows" :key="idx" :gutter="10">
            <el-col v-for="item in row" :key="item" :span="8">
              <div class="jobs__item">
                <router-link
                  :to="/job-detail/ + item.id"
                  class="jobs__item-link"
                >
                  <p class="jobs__item-name">{{ item.name }}</p>
                  <p class="jobs__item-info">
                    {{ `${item.types.join("·")}｜${item.location}` }}
                  </p>
                </router-link>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="jobs__more">
          <el-button type="primary" @click="routeToJobList"
            >查看更多职位</el-button
          >
        </div>
      </title-card>
    </div>

    <!-- 关于 -->
    <title-card title="关于 Shopee" class="about">
      <div class="about-container">
        <p class="about-text">{{ aboutText }}</p>
      </div>
    </title-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import TitleCard from "@/components/BaseTitleCard.vue";
import Search from "@/components/BaseSearch.vue";
import { queryJobs } from "../api/jobs";

async function getJobListRows() {
  const { data } = await queryJobs();
  const jobListRows = [];

  for (let i = 0; i + 2 < data.length && i < 9; i += 3) {
    jobListRows.push([data[i], data[i + 1], data[i + 2]]);
  }

  return jobListRows;
}

export default defineComponent({
  name: "Home",
  components: {
    TitleCard,
    Search,
  },
  setup() {
    const bannerUrls = ref([
      "https://img.imgdb.cn/item/601503083ffa7d37b3cca9b5.jpg",
      "https://img.imgdb.cn/item/601503083ffa7d37b3cca9b7.jpg",
      "https://img.imgdb.cn/item/601502bd3ffa7d37b3cc930f.jpg",
    ]);
    const jobListRows = ref<any>([]);
    const aboutText =
      "Shopee是东南亚领航电商平台，覆盖新加坡、马来西亚、菲律宾、印度尼西亚、泰国和越南等市场。同时在中国深圳、上海和香港设立跨境业务办公室。2019年 Shopee总订单量高达12亿，同比增长100.5%。根据权威移动数据分析平台 App Annie，2019年Shopee强势跻身全球购物类App下载量前五，同时斩获东南亚及台湾市场购物类App年度总下载量、平均月活数、安卓使用总时长三项冠军，并领跑东南亚两大头部市场，拿下印尼及越南年度购物类App下载量与月活数双冠王。";
    const searchInput = ref("");

    const router = useRouter();
    const routeToJobList = () => {
      router.push("/jobs");
    };

    const handleSearch = () => {
      routeToJobList();
    };

    onMounted(async () => {
      jobListRows.value = await getJobListRows();
    });

    return {
      bannerUrls,
      searchInput,
      jobListRows,
      aboutText,
      routeToJobList,
      handleSearch,
    };
  },
});
</script>

<style lang="scss">
.banner-image {
  height: 100%;
}

.jobs {
  background-color: rgba(0, 0, 0, 0.05);

  &__container {
    max-width: 75rem;
    margin: 0 auto;
  }

  &__search {
    width: 50%;
  }

  &__content {
    padding: 2rem;

    .el-row {
      margin-bottom: 10px;
    }
  }

  &__item {
    background-color: #fff;

    &:hover {
      opacity: 0.7;
    }

    &-link {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 2rem 4rem 2rem 2rem;
      text-decoration: none !important;
    }

    &-name {
      font-size: 1.5rem;
      font-weight: 400;
      line-height: 2rem;
      color: rgb(41, 44, 50);
    }

    &-info {
      font-size: 1rem;
      color: rgb(162, 164, 168);
    }
  }

  &__more {
    display: flex;
    justify-content: center;
  }
}

.about {
  &-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0 auto;
    max-width: 50rem;
    font-size: 1rem;
    color: rgba(51, 51, 51);
  }

  &-text {
    line-height: 1.5rem;
  }
}
</style>
