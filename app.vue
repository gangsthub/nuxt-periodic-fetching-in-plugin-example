<template>
  <div>
    UA: <output>{{ $ua }}</output>
  </div>
</template>

<script setup>
const { $ua } = useNuxtApp();
</script>
