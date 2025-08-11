<template>
  <div class="can-wrap">
    <header>
      <h1>Hi Coffee!</h1>
    </header>
    <main>
      <RecipeList />
      <NewRecipe />
    </main>
    </div>
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
