<template>
  <div class="suggest__dropdown dropdown">
    <ul
      class="dropdown__list"
      :id="dropdownId"
      role="listbox"
      :aria-label="label"
    >
      <li
        v-for="({ item, id }, index) in suggestions"
        :key="item.alias + index"
        :id="id"
        class="dropdown__item"
        :class="{ 'highlighted': highlightedIndex === index }"
        role="option"
        @click="selectItem(item)"
        @mouseenter="onItemHover(index)"
      >
        <SuggestInputDropdownItem
          :item="item"
        />
      </li>
      <li
        v-if="!suggestions.length"
        class="dropdown__item_empty"
      >
        По вашему запросу ничего не найдено
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import type { SuggestDropdownItem, SuggestItem } from '../../types/suggest';
import SuggestInputDropdownItem from "./SuggestInputDropdownItem.vue";

defineProps<{
  suggestions: SuggestDropdownItem[]
  highlightedIndex: number
  dropdownId: string
  label: string
}>();

const emit = defineEmits<{
  (e: 'select', item: SuggestItem): void
  (e: 'item:hover', index: number): void
  (e: 'scroll:down'): void
}>();

function onItemHover(index: number): void {
  emit('item:hover', index);
}

function selectItem(item: SuggestItem): void {
  emit('select', item);
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;

  &__list {
    position: absolute;
    width: 100%;
    max-height: 248px;
    margin: 0;
    padding: 0;
    border: 1px solid #ddd;
    border-top: none;
    background: #fff;
    list-style: none;
    overflow-y: auto;
    z-index: 999;
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 8px;
    cursor: pointer;

    &.highlighted {
      background: #EEEEEE;
    }

    &_empty {
      padding: 10px;
      font-size: 12px;
      color: #686868;
    }
  }
}
</style>
