<template>
  <el-container>
    <global-header :activeNavIndex="activeNavIndex" @clickNav="navClickHandler"/>
    <el-main>
      <router-view />
    </el-main>
    <el-footer>
      <div class="author-container">
        <a href="#" class="author-text">Coded by <strong>Xinyao Qiu</strong></a>
      </div>
    </el-footer>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import globalHeader from "./components/GlobalHeader.vue";
import store from "./common/store";

export default defineComponent({
  components: {
    globalHeader,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const commonState = store.state;
    const activeNavIndex = ref("home");
    const isLogin = ref<boolean>(false);
    const loginDialogVisible = ref<boolean>(false);
    const progressDialogVisible = ref<boolean>(false);

    const navClickHandler = (index: string) => {
      router.push({ name: index });
    };

    const clickLogOrSignHander = (login: boolean) => {
      isLogin.value = login;
      loginDialogVisible.value = true;
    };

    watch(
      () => route.name,
      (routeName) => {
        if (typeof routeName === "string")
          activeNavIndex.value = routeName === "jobDetail" ? "jobList" : routeName;
      }
    );

    return {
      activeNavIndex,
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
