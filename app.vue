<template>
  <div class="bg-repeat bg-cover w-full h-full font-sans" style="background-image: url(https://asset.gecdesigns.com/img/background-templates/abstract-navy-red-background-design-sr17012401-1705501852665-cover.webp)">
  <div class="flex items-center justify-center h-full">
    <div style="background-color: beige;" class="max-w-[800px] relative z-20 shadow-lg after:content-[''] after:z-[-1] after:h-full after:bg-slate-100 after:border after:border-slate-200 p-6 rounded">
      <!-- Start Screen -->
      <Start v-if="!isChatting" />

      <!-- Chat Screen -->
      <Chat v-else/>
    </div>
  </div>
</div>

</template>
<script setup lang="ts">

const isChatting = useIsChatting();
</script>

<style>
html,
body,
#__nuxt {
  width: 100%;
  height: 100%;
}
</style>