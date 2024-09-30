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
      console.log('Full API response:', apiCoffeeData);

      if (apiCoffeeData.result) {
        const parsedCoffeeData = JSON.parse(apiCoffeeData.result);
        console.log('Parsed coffee data:', parsedCoffeeData);
        this.coffeeData = parsedCoffeeData;
        return parsedCoffeeData;
      } else {
        console.warn('Unexpected response format:', apiCoffeeData);
      }

    } catch (error) {
      console.error('Error occurred while loading coffee data:', error);
    }
  },

  //Calculate Coffee Ratio
  async coffeeRatio() {
    if (this.coffeeData.output && this.coffeeData.beans) {
      this.coffeeData.ratio = Math.fround(this.coffeeData.output / this.coffeeData.beans).toFixed(1);
    } else {
      console.warn('Output or Beans input is invalid');
    }
  },

//Update coffee calculation
  }
})
