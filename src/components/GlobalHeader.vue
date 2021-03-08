<template>
  <el-container>
    <el-header class="app-header">
      <div class="app-header__container">
        <!-- Logo -->
        <div class="logo-container">
          <a href="#" class="logo-link">
            <img src="../assets/logo.png" alt="logo" class="logo-image" />
          </a>
        </div>
        <!-- 导航 -->
        <el-menu
          :default-active="activeNavIndex"
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
        <div class="user">
          <el-dropdown v-if="commonState.token">
            <span>
              我的<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="progressDialogVisible = true"
                  >应聘进度</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>

          <template v-else>
            <el-link
              type="info"
              :underline="false"
              @click.prevent="clickLogOrSignHander(true)"
              >登录</el-link
            >｜
            <el-link
              type="info"
              :underline="false"
              @click.prevent="clickLogOrSignHander(false)"
              >注册</el-link
            >
          </template>
        </div>
      </div>
    </el-header>
    <login-dialog v-model="loginDialogVisible" :is-login="isLogin" />
    <progress-dialog v-if="commonState.token" v-model="progressDialogVisible" />
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import loginDialog from "./LoginDialog.vue";
import progressDialog from "./progressDialog.vue";
import store from "../common/store";

export default defineComponent({
  components: {
    progressDialog,
    loginDialog,
  },
  props: [
    'activeNavIndex',
    'clickNav',
  ],
  setup(_, ctx) {
    const commonState = store.state;
    const isLogin = ref<boolean>(false);
    const loginDialogVisible = ref<boolean>(false);
    const progressDialogVisible = ref<boolean>(false);

    const navClickHandler = (index: string) => {
      ctx.emit('clickNav', index)
    };

    const clickLogOrSignHander = (login: boolean) => {
      isLogin.value = login;
      loginDialogVisible.value = true;
    };

    return {
      navClickHandler,
      clickLogOrSignHander,
      isLogin,
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
  display: flex;
  cursor: pointer;
  color: #909399;
  font-size: 1rem;

  p {
    margin: 0;
  }
}

.el-menu {
  flex: 1;
}
</style>
