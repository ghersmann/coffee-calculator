import { defineStore } from 'pinia'

export const coffeeStore = defineStore('registration', {
  state: () => {
    return {
      //Ratios to calculate
      coffeeData: {
        output: 0,
        beans: 0,
        ratio: 0,
      }
    }
  },
  
  actions: {
    //Load latest coffee calculation
    async loadCoffeeData() {
      console.log('Load Coffee Data')
      try {
        const response = await fetch(`${import.meta.env.VITE_KV_REST_API_URL}`, {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_KV_REST_API_TOKEN}`,
              'Content-Type': 'application/json',
            },
        body: '["JSON.GET", "coffee"]',
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const apiCoffeeData = await response.json();

      if (apiCoffeeData.result) {
        const parsedCoffeeData = JSON.parse(apiCoffeeData.result);
        this.coffeeData = parsedCoffeeData;
        return parsedCoffeeData;
      } else {
        console.warn('Unexpected response format:', apiCoffeeData);
      }

    } catch (error) {
      console.error('Error occurred while loading coffee data:', error);
    }
  },

  saveCoffeeData() {
    console.log('Save Coffee Data')
  },

  clearData() {
    console.log('Clear Data')
    this.coffeeData = {
      output: 0,
      beans: 0,
      ratio: 0,
    }
  },

//Update coffee calculation
  },}
)
