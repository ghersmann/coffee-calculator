import { defineStore } from 'pinia'

export const coffeeStore = defineStore('registration', {
  state: () => {
    return {
      coffeeData: {}
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

  /* async saveCoffeeData() {
    console.log('Save Coffee Data')
      try {
        const response = await fetch(`${import.meta.env.VITE_KV_REST_API_URL}set/coffee`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_KV_REST_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
        body: JSON.stringify(this.coffeeData),
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Saving coffee data failed:', error);
    }
  },

  clearData() {
    console.log('Clear Data')
    this.coffeeData = {
      output: 0,
      beans: 0,
      ratio: 0,
    }
  }, */
},
}
)
