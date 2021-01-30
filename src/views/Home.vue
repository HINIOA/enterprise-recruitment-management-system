<template>
  <div class="home">
    <!-- Banner -->
    <el-carousel height="33.3vw" :autoplay="false">
      <el-carousel-item v-for="url in bannerUrls" :key="url">
        <img :src="url" alt="banner" class="banner" />
      </el-carousel-item>
    </el-carousel>
    <!-- 开放职位 -->
    <title-card title="开放职位" class="jobs">
      <div class="search">
        <el-input v-model="searchInput" placeholder="请输入职位关键字" />
        <el-button type="primary">搜索职位</el-button>
      </div>
      <div class="list">
        <el-row v-for="(row, idx) in jobListRows" :key="idx" :gutter="10">
          <el-col v-for="item in row" :key="item" :span="8">
            <div class="item">
              <router-link to="/job-apply" class="link">
                <p class="name">{{ item.name }}</p>
                <p class="info">{{ item.info }}</p>
              </router-link>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="more">
        <el-button type="primary" @click="routeToJobList">查看更多职位</el-button>
      </div>
    </title-card>
    <!-- 关于 -->
    <title-card title="关于 Shopee" class="about">
      <div class="about-container">
        <p class="about-text">{{ aboutText }}</p>
      </div>
    </title-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';
import BaseTitleCard from "@/components/BaseTitleCard.vue";

function getJobListRows() {
  const data = [
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
    { name: "前端开发工程师", info: "研发类 | 广东·深圳市" },
  ]
  const jobListRows = []

  for (let i = 0; i + 2 < data.length; i+=3) {
    jobListRows.push([data[i], data[i + 1], data[i + 2]])
  }

  return ref(jobListRows)
}

export default defineComponent({
  name: "Home",
  components: {
    TitleCard: BaseTitleCard,
  },
  setup() {
    const bannerUrls = ref([
      "https://img.imgdb.cn/item/601503083ffa7d37b3cca9b5.jpg",
      "https://img.imgdb.cn/item/601503083ffa7d37b3cca9b7.jpg",
      "https://img.imgdb.cn/item/601502bd3ffa7d37b3cc930f.jpg",
    ]);
    const jobListRows = getJobListRows()
    const aboutText = 'Shopee是东南亚领航电商平台，覆盖新加坡、马来西亚、菲律宾、印度尼西亚、泰国和越南等市场。同时在中国深圳、上海和香港设立跨境业务办公室。2019年 Shopee总订单量高达12亿，同比增长100.5%。根据权威移动数据分析平台 App Annie，2019年Shopee强势跻身全球购物类App下载量前五，同时斩获东南亚及台湾市场购物类App年度总下载量、平均月活数、安卓使用总时长三项冠军，并领跑东南亚两大头部市场，拿下印尼及越南年度购物类App下载量与月活数双冠王。'
    const searchInput = ref('')

    const router = useRouter()
    const routeToJobList = () => {
      router.push('/jobs')
    }

    return {
      bannerUrls,
      searchInput,
      jobListRows,
      aboutText,
      routeToJobList,
    };
  },
});
</script>

<style lang="scss">
.el-carousel__item {
  .banner {
    height: 100%;
  }
}

.jobs {
  background-color: rgba(0, 0, 0, 0.05);

  .search {
    display: flex;
    width: 50%;
    margin: 0 auto;

    .el-input {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .el-button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }

  .list {
    padding: 2rem;

    .el-row {
      margin-bottom: 10px;
    }

    .item {
      background-color: #fff;

      .link {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2rem 4rem 2rem 2rem;
        height: 6rem;
        text-decoration: none;

        .name {
          font-size: 1.5rem;
          font-weight: 400;
          line-height: 2rem;
          color: rgb(41, 44, 50);
        }

        .info {
          font-size: 1rem;
          color: rgb(162, 164, 168);
        }
      }
    }
  }

  .more {
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
