<template>
  <h2>Recipes</h2>
  <ul class="recipe-list">
    <li v-for="(item, index) in state.coffeeData" :key="index" class="coffee-recipe">
      <p>Recipe: {{ item.name || 'Unnamed Recipe' }}</p><br>
      <p>Type: {{ item.type || 'N/A' }} </p><br>
      <p>Output (g): {{ item.output || '—' }} </p><br>
      <p>Coffee (g): {{ item.beans || '—' }} </p><br>
      <p>Ratio: 1/{{ item.ratio || '—' }} </p><br>
      <p>Grinder: {{ item.grinder || '—' }} </p><br>
      <p>Grind Setting: {{ item.grindsetting || '—' }} </p><br>
      <p>Water Temp: {{ item.watertemp || '—' }} </p><br>
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
h2, p {
  text-align: right;
}

.recipe-list {
  display: block;
  width: 400px;
  background-color: almond;
}
</style>