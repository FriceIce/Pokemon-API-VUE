<script setup lang="ts">
import Header from '@/components/Header.vue'
import { RouterView } from 'vue-router'
import { store } from './store'

// fetchList will fetch the favorites list and check for value.
store.fetchList()
</script>

<template>
  <Header />

  <!-- RouterView acts as a placeholder where components connected to Vue routes are rendered-->
  <RouterView />
</template>

<style scoped></style>
