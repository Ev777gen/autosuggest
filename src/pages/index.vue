<template>
  <div class="page">
    <main class="page__content">
      <SuggestInput
        @update:state="(selectedSuggestions: SuggestItem[]) => { console.log(selectedSuggestions) }"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import SuggestInput from "../components/suggest/SuggestInput.vue";
import type { SuggestItem } from "../types/suggest";
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