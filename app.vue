<template>
  <div>
    <h1>UA:</h1>
    <div>
      <output>{{ $ua }}</output>
    </div>
    <div>
      <output>{{ $count }}</output>
    </div>
  </div>
</template>

<script setup>
const { $ua, $count } = useNuxtApp();
</script>
