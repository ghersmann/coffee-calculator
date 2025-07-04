<template>
  <li class="coffee-recipe">
    <div class="title-type">
      <p>
        Recipe: <br>
            <span
                :class="{ 'clamp-text': !showDetails }"
            >{{ item.name || 'Unnamed Recipe' }}</span>
      </p><br>
      <p>Type: <br>{{ item.type || 'N/A' }}</p><br>
    </div>

    <div class="content-wrapper">
      <div v-if="showDetails" class="recipe-details">
        <p>Output (g): {{ item.output || '—' }}</p><br>
        <p>Coffee (g): {{ item.beans || '—' }}</p><br>
        <p>Ratio: 1/{{ item.ratio || '—' }}</p><br>
        <p>Grinder: <br>
            {{ item.grinder || '—' }}</p><br>
        <p>Grind Setting: {{ item.grindsetting || '—' }}</p><br>
        <p>Water Temp: {{ item.watertemp || '—' }}</p><br>
      </div>
    </div>

    <button class="detail-btn" @click="showDetails = !showDetails">
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
      showDetails: false
    }
  }
}
</script>

<style scoped>
.coffee-recipe {
  display: flex;
  flex-direction: column;
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

.clamp-text {
  display: -webkit-box;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
