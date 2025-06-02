<template>
    <header>
  <h1>Coffee Calculator</h1>
    </header>
    <main>
    <CoffeeCalculator />
    <RecipeList />
    </main>
</template>

<script>
import CoffeeCalculator from '@/components/CoffeeCalculator.vue';
import RecipeList from '@/components/RecipeList.vue';

export default {
  name: 'MainView',
  components: {
    CoffeeCalculator,
    RecipeList,
  }
}
</script>

<style scoped>
main {
    display: flex;
    width: 100%;
}
</style>