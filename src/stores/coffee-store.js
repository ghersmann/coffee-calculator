import { defineStore } from 'pinia'

export const coffeeStore = defineStore('registration', {
  state: () => {
    return {
      coffeeData: [],
    }
  },
  
  actions: {
    async loadCoffeeData() {
      this.loading = true;
      this.error = null;

      try {
        const res = await fetch('/api/getCoffee');
        const json = await res.json();

        if (json.success) {
          this.coffeeData = json.data;
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
}
});
