<template>
  <div class="search">
    <el-input v-model="input" :placeholder="placeholder" />
    <el-button type="primary" @click="btnClickHandler">{{
      buttonText
    }}</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "BaseSearch",
  props: {
    placeholder: {
      type: String,
      require: true,
    },
    buttonText: {
      type: String,
      require: true,
    },
  },
  setup(props, ctx) {
    const input = ref("");

    const btnClickHandler = () => {
      ctx.emit('search', input.value);
    };

    return {
      input,
      btnClickHandler,
    };
  },
});
</script>

<style lang="scss">
.search {
  display: flex;
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
</style>
