<template>
  <div class="title-card__container">
    <div class="title-card__header">
      <h3 class="title-card__text">{{ title }}</h3>
      <div class="title-card__underline"></div>
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
.title-card {
  &__container {
    padding: 4rem 2rem;
  }

  &__header {
    position: relative;
    margin-bottom: 4rem;
  }

  &__text {
    text-align: center;
    font-size: 2rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.8);
  }

  &__underline {
    position: absolute;
    left: 50%;
    bottom: -20px;
    margin-left: -40px;
    width: 80px;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.05);
  }
}
</style>
