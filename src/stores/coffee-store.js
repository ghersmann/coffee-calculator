import { defineStore } from 'pinia'

export const coffeeStore = defineStore('registration', {
  state: () => {
    return {
      apiUrl: import.meta.env.VITE_API_URL,
      //Ratios to calculate
      coffeeData: {
        outputMl: 0,
        beans: 0,
        ratio: 0,
      }
    }
  },
  actions: {
    //Load latest coffee calculation
    async loadCoffeeData() {
      const response = await fetch(this.apiUrl + 'coffee')
      const apiCoffeeData = await response.json()
      return this.coffeeData = apiCoffeeData
    },
    //Update coffee calculation
  }
})
