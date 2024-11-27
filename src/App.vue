<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <Header />

  <!-- RouterView acts as a placeholder where components connected to Vue routes are rendered-->
  <RouterView />
</template>

<style scoped></style>
