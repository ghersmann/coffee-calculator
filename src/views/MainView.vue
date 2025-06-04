<template>
    <header>
      <h1>Hi Coffee!</h1>
    </header>
    <main>
      <RecipeList />
      <CoffeeCalculator />
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