<template>
  <router-view />
</template>

<script>
import { coffeeStore } from './stores/coffee-store.js'
export default {
  data() {
    return {
      state: coffeeStore()
    }
  },
  }
</script>
