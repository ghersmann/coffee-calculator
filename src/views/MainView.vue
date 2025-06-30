<template>
    <header>
      <h1>Hi Coffee!</h1>
    </header>
    <main>
      <RecipeList />
      <NewRecipe />
    </main>
</template>

<script>
import NewRecipe from '@/components/NewRecipe.vue';
import RecipeList from '@/components/RecipeList.vue';

export default {
  name: 'MainView',
  components: {
    NewRecipe,
    RecipeList,
  }
}
</script>