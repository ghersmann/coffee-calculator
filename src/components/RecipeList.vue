<template>
  <ul class="recipe-list">
    <RecipeCard
      v-for="(item, index) in state.coffeeData"
      :key="item._id"
      :item="item"
      @deleted="removeFromList"
      @edit="startEdit"
    />
  </ul>
  <form v-if="editVisible" @submit.prevent="submitEdit">
  <h3>Edit Recipe</h3>
  <input v-model="editingRecipe.name" placeholder="Recipe name" />
  <input v-model="editingRecipe.type" placeholder="Type" />
  <input v-model.number="editingRecipe.output" placeholder="Output (g)" />
  <input v-model.number="editingRecipe.beans" placeholder="Beans (g)" />
  <input v-model.number="editingRecipe.ratio" placeholder="Ratio" />
  <input v-model="editingRecipe.grinder" placeholder="Grinder" />
  <input v-model="editingRecipe.grindsetting" placeholder="Grind Setting" />
  <input v-model.number="editingRecipe.watertemp" placeholder="Water Temp (°C)" />
  <button type="submit">Save Changes</button>
  <button @click="cancelEdit">Cancel</button>
</form>
</template>

<script>
import { coffeeStore } from '@/stores/coffee-store.js'
import RecipeCard from './RecipeCard.vue'

export default {
  name: 'RecipeList',
  components: { RecipeCard },
  data() {
    return {
      state: coffeeStore(),
      editingRecipe: null,
      editVisible: false
    }
  },
  methods: {
  removeFromList(deletedId) {
    const index = this.state.coffeeData.findIndex(item => item._id === deletedId);
    if (index !== -1) {
      this.state.coffeeData.splice(index, 1);
    }
  },

  startEdit(recipe) {
    this.editingRecipe = { ...recipe }; 
    this.editVisible = true;
  },

  async submitEdit() {
  try {
    const response = await fetch('/api/updateRecipe', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.editingRecipe)
    });

    const result = await response.json();

    if (result.success) {
      const index = this.state.coffeeData.findIndex(r => r._id === this.editingRecipe._id);
      if (index !== -1) {
        this.state.coffeeData.splice(index, 1, { ...this.editingRecipe });
      }
    
      this.editingRecipe = null;
      this.editVisible = false;
    } else {
      alert('Update failed: ' + result.message);
    }
  } catch (err) {
    console.error('Edit failed:', err);
    alert('An error occurred while editing.');
    }
  },

  cancelEdit() {
    this.editingRecipe = null;
    this.editVisible = false;
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
