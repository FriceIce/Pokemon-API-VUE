<script setup lang="ts">
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router'
import { store } from './store'

// fetchList will fetch the favorites list and check for value.
store.fetchList()
</script>

<template>
  <div class="flex flex-col h-dvh">
    <Header />
    <!-- RouterView acts as a placeholder where components connected to Vue routes are rendered-->
    <RouterView class="flex-1" />
  </div>
</template>

<style scoped></style>
