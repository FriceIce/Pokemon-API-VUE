<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header
    class="bg-red-500 flex justify-between items-center h-[90px] mb-10 px-5 md:px-10 lg:px-20"
  >
    <img src="/logo.svg" class="size-32 md:size-48" />
    <nav class="flex gap-2">
      <RouterLink
        to="/"
        class="text-sm md:text-lg lg:text-xl font-semibold text-white px-0 py-0 md:px-4 md:py-1 rounded-xl lg:hover:bg-gray-700 lg:hover:shadow transition-all"
      >
        Search
      </RouterLink>

      <RouterLink
        to="/favorites"
        class="text-sm md:text-lg lg:text-xl font-semibold text-white px-0 md:-0 md:px-4 md:py-1 rounded-xl lg:hover:bg-gray-700 lg:hover:shadow transition-all"
      >
        Favorites
      </RouterLink>
    </nav>
  </header>
</template>
