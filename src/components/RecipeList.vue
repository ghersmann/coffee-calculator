<template>
  <ul class="recipe-list">
    <li v-for="(item, index) in state.coffeeData" :key="index" class="coffee-recipe">
      <div class="title-type">
      <p>Recipe: {{ item.name || 'Unnamed Recipe' }}</p><br>
      <p>Type: {{ item.type || 'N/A' }} </p><br>
      <button class="detail-btn" @click="showRecipeDetail(item._id)">
      {{ recipeDetail === item._id ? 'Hide Details' : 'Recipe Details' }}
      </button>
      </div>
      
      <div v-if="recipeDetail === item._id" class="recipe-details">
      <p>Output (g): {{ item.output || '—' }} </p><br>
      <p>Coffee (g): {{ item.beans || '—' }} </p><br>
      <p>Ratio: 1/{{ item.ratio || '—' }} </p><br>
      <p>Grinder: {{ item.grinder || '—' }} </p><br>
      <p>Grind Setting: {{ item.grindsetting || '—' }} </p><br>
      <p>Water Temp: {{ item.watertemp || '—' }} </p><br>
      </div>
    </li>
  </ul>
</template>


<script>
import { coffeeStore } from '@/stores/coffee-store.js'

export default {
      name: 'RecipeList',

  data() {
    return {
      state: coffeeStore(),
      recipeDetail: ''
    }
  },

async created() {
    await this.state.loadCoffeeData()
},

methods: {
  showRecipeDetail(recipeId) {
    console.log('showRecipeDtail', recipeId)
    this.recipeDetail = this.recipeDetail === recipeId ? '' : recipeId;
    console.log('this.recipeDetail', this.recipeDetail)
  }
}
}
</script>

<style scoped>
h2, p {
  text-align: right;
}

p {

}

.recipe-list {
  display: block;
  width: 400px;
  background: yellow;
}
</style>