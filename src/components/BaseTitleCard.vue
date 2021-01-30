<template>
  <div class="container">
    <div class="title">
      <h3 class="title-text">{{ title }}</h3>
      <div class="title-underline"></div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseTitleCard",
  props: {
    title: String,
  },
});
</script>

<style lang="scss">
.container {
  padding: 4rem 2rem;

  .title {
    position: relative;
    margin-bottom: 4rem;

    &-text {
      text-align: center;
      font-size: 2rem;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.8);
    }

    &-underline {
      position: absolute;
      left: 50%;
      bottom: -20px;
      margin-left: -40px;
      width: 80px;
      height: 2px;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>
