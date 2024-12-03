<script setup lang="ts"></script>

<template>
  <section class="h-full grid place-items-center">
    <img src="/pokemon-ball.svg" alt="pokemon ball" class="loader size-8 lg:size-10 mt-[-150px]" />
  </section>
</template>

<style>
.loader {
  animation: spinner linear infinite;
  animation-duration: 0.5s;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
