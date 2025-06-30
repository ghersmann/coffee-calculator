<template>
  <div class="calculator-main">
    <button @click="toggleNewItem" class="new-recipe-btn">
      {{ newItemVisible ? 'Close' : 'New Recipe' }}
    </button>

    <form v-if="newItemVisible" @submit.prevent>
      <ul>
        <li
          v-for="field in fields"
          :key="field.key"
          class="list-item"
        >
          <label :for="field.key">{{ field.label }}:</label>
          <input
            :type="field.type"
            :id="field.key"
            :name="field.key"
            :placeholder="field.placeholder"
            v-model="newRecipe[field.key]"
          />
        </li>

        <li><button @click.prevent="calculateCoffeeRatio">Calculate Ratio</button></li>
        <li><button @click.prevent="clearData">Clear fields</button></li>
        <li><button @click.prevent="saveRecipe">Save Recipe</button></li>
      </ul>
    </form>
  </div>
</template>

<script>
import { coffeeStore } from '@/stores/coffee-store.js';

export default {
  data() {
    return {
      state: coffeeStore(),
      newItemVisible: false,

      newRecipe: {
        name: '',
        type: '',
        output: '',
        beans: '',
        ratio: '',
        grinder: '',
        grindsetting: '',
        watertemp: ''
      },

      fields: [
        { key: 'name', label: 'Recipe', type: 'text', placeholder: 'e.g. Naughty Unicorn' },
        { key: 'type', label: 'Type', type: 'text', placeholder: 'filter or espresso' },
        { key: 'output', label: 'Coffee Output (ml)', type: 'number', placeholder: 'e.g. 800' },
        { key: 'beans', label: 'Input Beans (g)', type: 'number', placeholder: 'e.g. 48' },
        { key: 'ratio', label: 'Ratio (1/x)', type: 'number', placeholder: 'e.g. 2.0' },
        { key: 'grinder', label: 'Grinder', type: 'text', placeholder: 'e.g. Fellow Ode II' },
        { key: 'grindsetting', label: 'Grind Setting', type: 'text', placeholder: 'e.g. 2.8' },
        { key: 'watertemp', label: 'Water Temp (°C)', type: 'number', placeholder: 'e.g. 98' },
      ]
    };
  },

  methods: {
    toggleNewItem() {
      this.newItemVisible = !this.newItemVisible;
    },

    isEmpty(value) {
      return value === 0 || value === null || value === undefined || value === '';
    },

    calculateCoffeeRatio() {
      const { output, beans, ratio } = this.newRecipe;

      if (this.isEmpty(output) && !this.isEmpty(beans) && !this.isEmpty(ratio)) {
        this.newRecipe.output = Number((beans * ratio).toFixed(0));
      } else if (this.isEmpty(beans) && !this.isEmpty(output) && !this.isEmpty(ratio)) {
        this.newRecipe.beans = Number((output / ratio).toFixed(1));
      } else if (this.isEmpty(ratio) && !this.isEmpty(output) && !this.isEmpty(beans)) {
        this.newRecipe.ratio = Number((output / beans).toFixed(1));
      }
    },

    async saveRecipe() {
if (this.newRecipe.name !== '') {
  try {
    const response = await fetch('/api/saveRecipe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.newRecipe)
    });

    const result = await response.json();

    if (result.success) {
      console.log('Recipe saved with ID:', result.insertedId);
    } else {
      console.error('Save failed:', result.message);
    }
  } catch (error) {
    console.error('Save error:', error);
  }
  this.newRecipe = {
        name: '',
        type: '',
        output: '',
        beans: '',
        ratio: '',
        grinder: '',
        grindsetting: '',
        watertemp: ''
      }
} else {
  return alert('Please name your recipe. Thank you.')
}
},

clearData() {
    console.log('Clear Data')
     this.newRecipe = {
        name: '',
        type: '',
        output: '',
        beans: '',
        ratio: '',
        grinder: '',
        grindsetting: '',
        watertemp: ''
      }
  },
  }
}
</script>

<style scoped>
li {
  margin-bottom: 2rem;
}

.calculator-main {
  display: block;
}

.new-recipe-btn {
  margin-top: 4rem;
  margin-bottom: 2rem;
}
</style>
