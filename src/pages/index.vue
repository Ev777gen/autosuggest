<template>
  <SuggestInput @update:state="(evt: any) => console.log(evt)" />
</template>

<script setup lang="ts">
import SuggestInput from "../components/suggest/SuggestInput.vue";
</script>