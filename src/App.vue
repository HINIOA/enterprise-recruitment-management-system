<template>
  <el-container>
    <el-header class="app-header">
      <div class="app-header__container">
        <!-- Logo -->
        <div class="logo-container">
          <a href="#" class="logo-link">
            <img src="./assets/logo.png" alt="logo" class="logo-image" />
          </a>
        </div>
        <!-- 导航 -->
        <el-menu
          :default-active="activeIndex"
          @select="navClickHandler"
          mode="horizontal"
        >
          <el-menu-item index="home">
            首页
          </el-menu-item>
          <el-menu-item index="jobList">
            所有职位
          </el-menu-item>
        </el-menu>
        <!-- 用户 -->
        <div class="user" @click="clickUserHandler">
          {{ commonState.token ? "应聘进度" : "登录" }}
        </div>
      </div>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <div class="author-container">
        <a href="#" class="author-text">Coded by <strong>Xinyao Qiu</strong></a>
      </div>
    </el-footer>
    <login-dialog v-model="loginDialogVisible" />
    <progress-dialog v-if="commonState.token" v-model="progressDialogVisible" :time="Date.now()" />
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import loginDialog from "./components/LoginDialog.vue";
import progressDialog from "./components/progressDialog.vue";
import store from "./store";

export default defineComponent({
  components: {
    progressDialog,
    loginDialog,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const commonState = store.state;
    const activeIndex = ref("home");
    const loginDialogVisible = ref<boolean>(false);
    const progressDialogVisible = ref<boolean>(false);

    const navClickHandler = (index: string) => {
      router.push({ name: index });
    };

    const clickUserHandler = () => {
      if (commonState.token) {
        progressDialogVisible.value = true;
      } else {
        loginDialogVisible.value = true;
      }
    };

    watch(
      () => route.name,
      (routeName) => {
        if (typeof routeName === "string")
          activeIndex.value = routeName === "jobDetail" ? "jobList" : routeName;
      }
    );

    return {
      activeIndex,
      navClickHandler,
      clickUserHandler,
      loginDialogVisible,
      progressDialogVisible,
      commonState,
    };
  },
});
</script>

<style lang="scss">
.app-header {
  border-bottom: 1px solid #e6e6e6;

  &__container {
    width: 100vw;
    max-width: 75rem;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
}

.el-header {
  padding: 0 !important;
}

.logo {
  &-container {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 2rem;
    padding-right: 4rem;
  }

  &-link {
    display: flex;
  }

  &-image {
    height: 3rem;
    min-width: 3rem;
  }
}

.user {
  cursor: pointer;
  color: #909399;
  font-size: 1rem;
}

.el-menu {
  flex: 1;
}

.el-main {
  padding: 0 !important;
}

.author {
  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &-text {
    color: #bbb;
    font-size: 1rem;
    font-family: Georgia, "Times New Roman", Times, serif;
    text-decoration: none;

    strong {
      font-size: 1.1rem;
    }
  }
}
</style>
