<template>
   <v-carousel
    height="840"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(slide, i) in imgCarousels" :key="i">
      <div>
        <img :src="slide" alt="">
      </div>
    </v-carousel-item>
  </v-carousel>
</template>

<script setup>
const imgCarousels = [
    "https://theme.hstatic.net/200000417685/1001040197/14/slide_1_img.jpg?v=723",
    "https://theme.hstatic.net/200000417685/1001040197/14/slide_2_img.jpg?v=723",
    "https://theme.hstatic.net/200000417685/1001040197/14/slide_3_img.jpg?v=723",
    "https://theme.hstatic.net/200000417685/1001040197/14/slide_4_img.jpg?v=723"
]
</script>

<style scoped>

</style>