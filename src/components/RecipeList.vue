<template>
  <ul class="recipe-list">
    <RecipeCard
      v-for="(item, index) in state.coffeeData"
      :key="item._id"
      :item="item"
    />
  </ul>
</template>

<script>
import { coffeeStore } from '@/stores/coffee-store.js'
import RecipeCard from './RecipeCard.vue'

export default {
  name: 'RecipeList',
  components: { RecipeCard },
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
  width: 100%;
  display: flex;
  overflow-x: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
  align-items: flex-start;
}
</style>
