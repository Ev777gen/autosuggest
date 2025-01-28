<template>
  <div class="suggest__tag tag">
    <span>@</span>
    <span class="tag__text">{{ tag.alias }}</span>
    <button
      class="tag__remove"
      aria-label="Удалить"
      @click="removeTag"
    >
      &times;
    </button>
  </div>
</template>


<script setup lang="ts">
import type { SuggestItem } from '../../types/suggest';

defineProps<{
  tag: SuggestItem
}>();

const emit = defineEmits<{
  (e: 'remove'): void
}>();

function removeTag() {
  emit('remove');
}
</script>

<style lang="scss" scoped>
.tag {
  display: flex;
  align-items: center;
  border-radius: 2px;
  padding: 0px 1px 4px 4px;
  font-size: 14px;
  
  color: #fff;
  background-color: #8BA9BC;
  line-height: 24px;

  &__text {
    font-weight: 600;
  }

  &__remove {
    border: none;
    vertical-align: bottom;
    font-size: 14px;
    color: #fff;
    background: none;
    cursor: pointer;
  }
}
</style>
