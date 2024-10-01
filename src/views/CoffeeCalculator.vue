<template>
  <h1>Coffee Calculator</h1>
  <form>
    <ul>
      <li class="list-item">
        <label for="output-ml">Coffee Output (ml): </label>
        <input
          type="number"
          name="output-ml"
          id="output-ml"
          :placeholder="state.coffeeData.output"
          v-model.number="state.coffeeData.output"
        />
      </li>
      <li class="list-item">
        <label for="beans-g">Input Beans (g): </label>
        <input
          type="number"
          name="beans-g"
          id="beans-g"
          :placeholder="state.coffeeData.beans"
          v-model.number="state.coffeeData.beans"
        />
      </li>
      <li class="list-item">
        <label for="ratio">Ratio: 1 / </label>
        <input
          type="number"
          name="ratio"
          id="ratio"
          :placeholder="state.coffeeData.ratio"
          v-model.number="state.coffeeData.ratio"
        />
      </li>
    </ul>
    <button @click.prevent="calculateCoffeeData">Calculate</button>
    <button @click.prevent="state.clearData">Clear</button>
  </form>
  <button @click="state.loadCoffeeData">Load Data</button>
  <button @click="state.saveCoffeeData">Save Data</button>
</template>

<script>
import { coffeeStore } from '../stores/coffee-store';

export default {
  data() {
    return {
      state: coffeeStore(),
    };
  },
  
  methods: {
    isEmpty(value) {
      return value === 0 || value === null || value === undefined || value === '';
    },

    calculateCoffeeData() {
      const { output, beans, ratio } = this.state.coffeeData;
      // Check which value is empty and calculate it based on the others
      if (this.isEmpty(output) && !this.isEmpty(beans) && !this.isEmpty(ratio)) {
        this.state.coffeeData.output = Number((beans * ratio).toFixed(0));
      } else if (this.isEmpty(beans) && !this.isEmpty(output) && !this.isEmpty(ratio)) {
        this.state.coffeeData.beans = Number((output / ratio).toFixed(1));
      } else if (this.isEmpty(ratio) && !this.isEmpty(output) && !this.isEmpty(beans)) {
        this.state.coffeeData.ratio = Number((output / beans).toFixed(1));
      }
    },

  },
};
</script>

<style scoped>
.list-item {
  display: block;
  margin-top: 2rem;
}

button {
  margin-top: 2rem;
}
</style>
