<template>
  <h1>Coffee Calculator</h1>
<form><ul>
  <li class="list-item">
    <label for="output-ml">Coffee Output (ml): </label>
    <input type="number" name="output-ml" id="output-ml" :placeholder="state.coffeeData.output" v-model="state.coffeeData.output">
  </li>
  <li class="list-item">
    <label for="beans-g">Input Beans (g): </label>
    <input type="number" name="beans-g" id="beans-g" :placeholder="state.coffeeData.beans" v-model="state.coffeeData.beans">
  </li>
  <li class="list-item">
    <label for="ratio">Ratio: 1 / </label> <input type="number" name="ratio" id="ratio" :placeholder="state.coffeeData.ratio" v-model="state.coffeeData.ratio">
    
  </li>
  </ul>
  <button @click.prevent="state.coffeeRatio">Calculate</button>
  </form>
</template>

<script>
import { coffeeStore } from '../stores/coffee-store';

export default {
  data() {
    return {
      state: coffeeStore(),
    }
  },
  }
</script>

<style scoped>
.list-item {
  display:block;
  margin-top: 2rem;
}

button {
  margin-top: 2rem;
}
</style>