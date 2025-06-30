import { defineStore } from 'pinia'

export const coffeeStore = defineStore('registration', {
  state: () => {
    return {
      coffeeData: {},
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
    }
  },
  
  actions: {
    async loadCoffeeData() {
      console.log('Load Coffee Data')
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch('/api/getCoffee');
        const json = await res.json();

        if (json.success) {
          this.coffeeData = json.data;
          console.log('Load success: ', this.coffeeData)
        } else {
          this.error = 'Failed to load data.';
        }
      } catch (err) {
        console.error(err);
        this.error = 'Something went wrong.';
      } finally {
        this.loading = false;
      }
    },

async saveRecipe() {
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
},
}
)
