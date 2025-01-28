<template>
  <SuggestInput @update:state="(evt) => console.log(evt)" />
</template>

<script setup lang="ts">
import SuggestInput from "~/components/suggest/SuggestInput.vue";
</script>