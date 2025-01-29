<template>
  <div class="dropdown__item item">
    <img
      v-if="avatarSrc"
      :src="avatarSrc"
      :alt="altText"
      class="item__avatar"
    />
    <div
      v-else
      v-html="placeholderAvatarSVG"
      role="img"
      :aria-label="altText"
      class="item__avatar" 
    />
    
    <div>
      <div class="item__name">{{ name }}</div>
      <div class="item__alias">{{ alias }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { SUGGEST_ITEM_TYPES, type SuggestItem } from '../../types/suggest';
import avatarCompanySVG from '/img/icons/avatar-company.svg?raw';
import avatarUserSVG from '/img/icons/avatar-user.svg?raw';

const props = withDefaults(defineProps<{
  item: SuggestItem
  placeholderAvatarSrc?: string
  altText?: string
}>(), {
  altText: 'avatar',
});

const avatarSrc = computed<string | undefined>(() => {
  return props.item.avatar || props.placeholderAvatarSrc;
});

const placeholderAvatarSVG = computed<string>(() => {
  return props.item.type === SUGGEST_ITEM_TYPES.company 
    ? avatarCompanySVG
    : avatarUserSVG;
});

const name = computed<string>(() => {
  return props.item.name || props.item.alias;
});

const alias = computed<string>(() => {
  return props.item.type === SUGGEST_ITEM_TYPES.user
    ? `@${props.item.alias}`
    : 'Компания';
});
</script>

<style lang="scss" scoped>
$avatarSize: 30px;
$fontSize: 14px;
$grayColor: #8D8D8D; // TODO: input theme colors globally

.item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  padding: 0px 10px;
  font-size: $fontSize;
  line-height: $fontSize;

  &__avatar {
    height: $avatarSize;
    aspect-ratio: 1;
    border-radius: 4px;
    color: $grayColor;
  }

  &__alias {
    color: $grayColor;
  }
}
</style>