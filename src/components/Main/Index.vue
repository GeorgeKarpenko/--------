<script setup lang="ts">
</script>

<template>
  <nav>
    <router-link class="button" to="/play">Играть</router-link>
    <router-link class="button" to="/settings">Настройки</router-link>
  </nav>
</template>


<style scoped>
nav {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  margin: auto;
  padding: 30px;
}
.button {
  padding: 30px 0;
  font-size: 20px;
}
.button:hover {
  background-color: #4CAF50;
  color: white;
}
</style>