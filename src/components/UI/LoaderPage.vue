<script>
export default {
  name: "LoaderPage"
}
</script>

<template>
  <div class="overlay-loader">
    <v-progress-circular
        indeterminate
        size="64"
        width="6"
        style="color: #FD6E39"
    />
  </div>
</template>

<style scoped>
.overlay-loader {
  position: fixed;      /* поверх всего */
  top: 0;
  left: 0;
  width: 100vw;         /* во всю ширину */
  height: 100vh;        /* во всю высоту */
  background: rgba(255, 255, 255, 0.6); /* полупрозрачный фон */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;        /* поверх всех элементов */
}
</style>