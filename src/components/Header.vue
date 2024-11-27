<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="flex justify-between items-center h-[90px] border mb-10 px-5 md:px-10 lg:px-20">
    <h1 class="text-xl lg:text-3xl font-semibold text-yellow-400">Pokemon API</h1>
    <nav class="flex gap-2">
      <RouterLink
        to="/"
        class="text-sm md:text-lg lg:text-xl font-semibold text-orange-400 px-0 py-0 md:px-4 md:py-1 rounded-xl lg:hover:bg-neutral-100 lg:hover:shadow transition-all"
      >
        Search
      </RouterLink>

      <RouterLink
        to="/favorites"
        class="text-sm md:text-lg lg:text-xl font-semibold text-orange-400 px-0 md:-0 md:px-4 md:py-1 rounded-xl lg:hover:bg-neutral-100 lg:hover:shadow transition-all"
      >
        Favorites
      </RouterLink>
    </nav>
  </header>
</template>
