<template>
  <div class="suggest">
    <label :for="inputId" class="suggest__label label">
      <span v-if="!isOptional" class="label__asterisk">* </span>
      <span class="label__text">{{ label }}</span>
    </label>
    <div class="suggest__input-wrapper" v-click-outside="closeDropdown">
      <div v-if="selectedTags.length" class="suggest__tags">
        <SuggestInputTag
          v-for="(tag, index) in selectedTags"
          :key="tag.alias"
          :tag="tag"
          @remove="removeTag(index)"
          class="suggest__tag"
        />
      </div>

      <input
        v-if="isSearchAllowed"
        v-model="query"
        type="text"
        :id="inputId"
        :placeholder="placeholder"
        @input="getSuggestions"
        @keydown="onKeyDown"
        class="suggest__input"
        role="combobox"
        :aria-expanded="hasSuggestions ? 'true' : 'false'"
        :aria-owns="dropdownId"
        :aria-controls="dropdownId"
        :aria-activedescendant="activeOptionId"
      />
    </div>
    <SuggestInputDropdown 
      v-if="hasSuggestions"
      :suggestions="suggestionsDS"
      :highlighted-index="highlightedIndex"
      :dropdown-id="dropdownId"
      :label="label"
      class="suggest__dropdown"
      @select="selectSuggestion"
      @item:hover="highlightOption"
    />

    <footer class="suggest__info">
      <div v-if="isLoading" class="suggest__loading">Загрузка...</div>
      <div v-if="error" class="suggest__error">{{ error }}</div>
    </footer>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import { SuggestController } from '../../ts/SuggestController';
import { debounce } from '../../utils/debounce';
import type { SuggestDropdownItem, SuggestItem } from '../../types/suggest';
import SuggestInputTag from './SuggestInputTag.vue';
import SuggestInputDropdown from './SuggestInputDropdown.vue';

const props = withDefaults(defineProps<{
  label?: string
  placeholder?: string
  isOptional?: boolean
  maxSelections?: number
}>(), {
  label: 'Пользователь или компания',
  placeholder: 'Поиск...',
  isOptional: false,
  maxSelections: 1,
});

const emit = defineEmits<{
  (e: 'update:state', payload: SuggestItem[]): void
}>();

const suggestController = new SuggestController();

const query = ref<string>('');
const suggestions = ref<SuggestItem[] | null>(null);
const selectedTags = ref<SuggestItem[]>([]);
const isLoading = ref<boolean>(false);
const error = ref<string>('');
const highlightedIndex = ref<number>(-1);
const INPUT_ID_PREFIX = 'suggest-input';
const DROPDOWN_ID_PREFIX = 'suggestions-dropdown';
const OPTION_ID_PREFIX = 'dropdown-item';
const inputId: string = generateId(INPUT_ID_PREFIX);
const dropdownId: string = generateId(DROPDOWN_ID_PREFIX);

const hasSuggestions = computed<boolean>(() => {
  return Boolean(suggestions.value);
});

const isSearchAllowed = computed<boolean>(() => {
  return selectedTags.value.length < props.maxSelections;
});

const suggestionsDS = computed<SuggestDropdownItem[]>(() => {
  return suggestions.value?.map((item, index) => {
    return {
      id: generateOptionId(index),
      item,
    };
  }) || [];
});

const activeOptionId = computed<string>(() => {
  return highlightedIndex.value >= 0
    ? generateOptionId(highlightedIndex.value)
    : '';
});

const REQUEST_DELAY = 300;
const getSuggestions = debounce(getSuggestionsCallback, REQUEST_DELAY);

const MIN_CHARACTERS_ENTERED = 3
async function getSuggestionsCallback(): Promise<void> {
  if (query.value.length < MIN_CHARACTERS_ENTERED)
    return;

  isLoading.value = true;
  error.value = '';
  try {
    const data = await suggestController.getSuggestions(query.value);
    suggestions.value = data ?? [];
  } 
  catch (err: any) {
    error.value = err.message || 'Неизвестная ошибка';
  } 
  finally {
    isLoading.value = false;
  }
}

function selectSuggestion(item: SuggestItem): void {
  if (selectedTags.value.length < props.maxSelections) {
    selectedTags.value.push(item);
    query.value = '';
    resetSuggestions();
    notifyParent();
  }
}

function removeTag(index: number): void {
  selectedTags.value.splice(index, 1);
  notifyParent();
}

function notifyParent() {
  emit('update:state', selectedTags.value);
}

function generateId(prefix: string): string {
  return `${prefix}_${Math.round(Math.random() * 100_000)}`;
}

function generateOptionId(index: number): string {
  return `${OPTION_ID_PREFIX}_${index}`;
}

function onKeyDown(e: KeyboardEvent): void {
  if (!suggestions.value)
    return

  switch (e.key) {
    case 'ArrowDown':
      if (!suggestions.value.length) 
        return;
      
      highlightOption((highlightedIndex.value + 1) % suggestions.value.length);
      break;

    case 'ArrowUp':
      if (!suggestions.value.length) 
        return;
      
      highlightOption((highlightedIndex.value - 1 + suggestions.value.length) % suggestions.value.length);
      break;

    case 'Enter':
      if (highlightedIndex.value >= 0)
        selectSuggestion(suggestions.value[highlightedIndex.value]);
      
      break;

    case 'Escape':
      closeDropdown();
      break;
  
    default:
      break;
  }
}

function highlightOption(index: number): void {
  highlightedIndex.value = index;
}

function closeDropdown(): void {
  if (!suggestions.value)
    return;

  resetSuggestions();
  resetHighlight();
}

function resetHighlight(): void {
  highlightedIndex.value = -1;
}

function resetSuggestions(): void {
  suggestions.value = null;
}
</script>

<style lang="scss" scoped>
$greyColor: #494949;

.suggest {
  display: flex;
  flex-direction: column;

  & .label {
    margin-bottom: 0.5rem;
    font-size: 14px;
    font-weight: 600;
    color: $greyColor;

    &__asterisk {
      color: #FF877F;
    }
  }

  &__input-wrapper {
    display: flex;
    gap: 3px;
    flex-wrap: wrap;
    align-items: center;
    border: 2px solid #E8EDEE;
    padding: 4px;
    border-radius: 4px;
    background: #fff;
    min-height: 1.5rem;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  &__input {
    flex: 1;
    min-width: 60px;
    border: none;
    outline: none;
  }

  &__dropdown {
    width: calc(100% - 2px);
  }

  &__info {
    margin: 5px 2px;
    font-size: 12px;
    color: $greyColor;
  }

  &__error {
    color: rgb(255, 70, 70);
  }
}
</style>
