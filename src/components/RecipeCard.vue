<template>
  <li class="coffee-recipe">
    <div class="title-type">
      <p>Recipe: <br>
        <span v-if="!editMode" :class="{ 'clamp-text': !showDetails }">
          {{ localRecipe.name || 'Unnamed Recipe' }}
        </span>
        <textarea class="txtarea-edit" v-else v-model="localRecipe.name"></textarea>
      </p><br>

      <p>Type: 
        <span v-if="!editMode">{{ localRecipe.type || 'N/A' }}</span>
        <input type="text" v-else v-model="localRecipe.type" />
      </p><br>
    </div>

    <div class="content-wrapper">
      <div v-if="showDetails" class="recipe-details">
        <template v-if="!editMode">
          <p>Output (g): {{ localRecipe.output || '—' }}</p><br>
          <p>Coffee (g): {{ localRecipe.beans || '—' }}</p><br>
          <p>Ratio: 1/{{ localRecipe.ratio || '—' }}</p><br>
          <p>Grinder: {{ localRecipe.grinder || '—' }}</p><br>
          <p>Grind Setting: {{ localRecipe.grindsetting || '—' }}</p><br>
          <p>Water Temp: {{ localRecipe.watertemp || '—' }}</p><br>
        </template>

        <template v-else>
          <p>Output (g): <input type="number" v-model="localRecipe.output" /></p><br>
          <p>Coffee (g): <input type="number" v-model="localRecipe.beans" /></p><br>
          <p>Ratio: 1/<input type="number" v-model="localRecipe.ratio" /></p><br>
          <p>Grinder: <input type="text" v-model="localRecipe.grinder" /></p><br>
          <p>Grind Setting: <input type="number" v-model="localRecipe.grindsetting" /></p><br>
          <p>Water Temp: <input type="number" v-model="localRecipe.watertemp" /></p><br>
        </template>

        <div class="button-row">
          <button v-if="!editMode" @click="editMode = true">Edit</button>
          <template v-else>
            <button @click="saveEdits">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </template>
          <button @click="deleteCoffeeRecipe(item._id)">Delete</button>
        </div>
      </div>
    </div>

<button class="detail-btn" @click="toggleDetails">
  {{ showDetails ? 'Hide Details' : 'Recipe Details' }}
</button>
  </li>
</template>

<script>
export default {
  name: 'RecipeCard',
  props: {
    item: Object
  },
  data() {
    return {
      showDetails: false,
      editMode: false,
      localRecipe: { ...this.item }
    }
  },
  methods: {
    async saveEdits() {
      try {
        const response = await fetch('/api/updateRecipe', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.localRecipe)
        });

        const result = await response.json();

        if (result.success) {
          this.$emit('updated', this.localRecipe);
          this.editMode = false;
        } else {
          alert('Failed to update: ' + result.message);
        }
      } catch (error) {
        console.error('Update error:', error);
        alert('Error saving recipe.');
      }
    },

    toggleDetails() {
      if (this.showDetails && this.editMode) {
        return this.cancelEdit();
      }
      this.showDetails = !this.showDetails;
    },

    cancelEdit() {
      const confirmClose = confirm('Cancel editing without saving?');
      if (!confirmClose) {
        return;
      } else {
        this.localRecipe = { ...this.item };
        this.editMode = false;
      }
    },

    async deleteCoffeeRecipe(recipeId) {
      const confirmDelete = confirm('Delete this recipe?');
      if (!confirmDelete) return;

      try {
        const response = await fetch(`/api/deleteRecipe?id=${recipeId}`, {
          method: 'DELETE'
        });

        const result = await response.json();

        if (result.success) {
          this.$emit('deleted', recipeId);
        } else {
          alert('Delete failed: ' + result.message);
        }
      } catch (err) {
        console.error('Delete failed:', err);
        alert('An error occurred.');
      }
    }
  }
}
</script>


<style scoped>
.coffee-recipe {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 145px;
  max-width: 310px;
  padding-right: 1rem;
  margin-right: 2rem;
  height: auto;
  border-right: 1px solid #000;
  flex-shrink: 0;
}

.content-wrapper {
  flex-grow: 1;
}

.detail-btn {
  display: block;
}

button {
  margin-bottom: 2rem;
}

.clamp-text {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.txtarea-edit {
  width: 12.5rem;
  padding: 1rem;
  border: 0;
  border-radius: 0.5rem;
}

.button-row {
  margin-top: 2rem;
}

input[type="text"],
input[type="number"] {
  background-color: white;
  border: 0;
  border-radius: 0.5rem;
  height: 2.7rem;
  width: 12.5rem;
  padding: 1rem;
}
</style>
