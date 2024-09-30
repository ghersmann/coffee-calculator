<template>

<form>
    <label for="output-ml"><p>Coffee Output (ml): </p></label>
    <input type="number" name="output-ml" id="output-ml" :placeholder="state.coffeeData.output" v-model="state.coffeeData.output">
<label for="beans-g"><p>Input Beans (g): </p></label>
    <input type="number" name="beans-g" id="beans-g" :placeholder="state.coffeeData.beans" v-model="state.coffeeData.beans">
<label for="ratio"><p>Ratio: 1 / </p>
<input type="number" name="ratio" id="ratio" :placeholder="state.coffeeData.ratio" v-model="state.coffeeData.ratio">
</label>
    
<button @click.prevent="coffeeRatio">Caclulate</button>
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
  methods: {
    coffeeRatio() {
        this.state.coffeeData.ratio = Math.fround(this.state.coffeeData.output / this.state.coffeeData.beans).toFixed(1)
    }
  },
  onMounted() {
    this.coffeeRatio()
  }
  }
</script>