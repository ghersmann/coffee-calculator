<template>
  <h1>RecipeList</h1>
  <ul class="recipe-list">
      <li v-for="(item, index) in state.coffeeData" :key="index" class="coffee-recipe">
       <p>Recipe: {{ item.name }}</p><br>
        <p>Output: {{ item.output }} </p><br>
        <p>Coffee (g): {{ item.beans }} </p><br>
        <p>Ratio: {{ item.ratio }} </p><br>
      </li>
  </ul>
</template>

<script>
import { coffeeStore } from '@/stores/coffee-store.js'

export default {
      name: 'RecipeList',

  data() {
    return {
      state: coffeeStore()
    }
  },

async created() {
    await this.state.loadCoffeeData()
}
}
</script>

<style scoped>
.recipe-list {
  width: 50%;
  background-color: almond;
}
</style>