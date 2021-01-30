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
        <el-row v-for="item in 4" :key="item" :gutter="10">
          <el-col v-for="item in 3" :key="item" :span="8">
            <div class="item">
              <router-link to="/job-apply" class="link">
                <p class="name">前端开发工程师</p>
                <p class="info">研发类 | 广东·深圳市</p>
              </router-link>
            </div>
          </el-col>
        </el-row>
      </div>
    </title-card>
    <!-- 关于 -->
    <title-card title="关于" class="about">
      <div class="about-container">
        <p class="about-text">
          Shopee是东南亚领航电商平台，覆盖新加坡、马来西亚、菲律宾、印度尼西亚、泰国和越南等市场。同时在中国深圳、上海和香港设立跨境业务办公室。2019
          年 Shopee总订单量高达12亿，同比增长100.5%。根据权威移动数据分析平台
          App
          Annie，2019年Shopee强势跻身全球购物类App下载量前五，同时斩获东南亚及台湾市场购物类App年度总下载量、平均月活数、安卓使用总时长三项冠军，并领跑东南亚两大头部市场，拿下印尼及越南年度购物类App下载量与月活数双冠王。
        </p>
        <p class="about-text"><br></p>
        <p class="about-text">
          Shopee母公司Sea为首间于纽交所上市的东南亚互联网企业(股票代码:SE)。除Shopee外，其核心业务还包括旗下的电子娱乐业务Garena及数字金融服务业务SeaMoney。Sea集团的理念为运用科技的力量改善当地消费者及中小企业的生活。
        </p>
      </div>
    </title-card>
  </div>
</template>

<script lang="ts">
import BaseTitleCard from "@/components/BaseTitleCard.vue";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "Home",
  components: {
    TitleCard: BaseTitleCard,
  },
  setup() {
    const bannerUrls = ref([
      "https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2021/jpeg/622241/1611970498818-resources/10998040/jpg/b71e0278-895f-4c7b-be8f-d2058b088696.jpeg?OSSAccessKeyId=LTAI4GGhPJmQ4HWCmhDAn4F5&Expires=1611972302&Signature=9XjoUIgMfYSWWGk2h88pbSHUaXE%3D",
      "https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2021/jpeg/622241/1611969742090-resources/10998040/jpg/321f4ecb-49fd-4213-92db-8036e9481381.jpeg?OSSAccessKeyId=LTAI4GGhPJmQ4HWCmhDAn4F5&Expires=1611971546&Signature=VwlTTQCaAk1WBG%2BD7SpS%2FFNC25c%3D",
      "https://lark-assets-prod-aliyun.oss-cn-hangzhou.aliyuncs.com/yuque/0/2021/jpeg/622241/1611970311330-resources/10998040/jpg/1517e143-529e-412d-a9f3-cdcbf1ae9f73.jpeg?OSSAccessKeyId=LTAI4GGhPJmQ4HWCmhDAn4F5&Expires=1611972137&Signature=ZT6hKD4TaSZL%2BJA2pm8bjCWc%2B5U%3D",
    ]);

    return {
      bannerUrls,
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
