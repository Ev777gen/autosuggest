<template>
  <div class="page">
    <main class="page__content">
      <SuggestInput
        @update:state="(evt: SuggestNotification) => console.log(evt)"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import SuggestInput from "../components/suggest/SuggestInput.vue";
import type { SuggestNotification } from "../types/suggest";
</script>

<style lang="scss" scoped>
.page {
  &__content {
    max-width: 900px;
    margin: 0 auto;
    padding: 15px;
  }
}
</style>