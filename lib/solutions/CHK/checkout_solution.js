"use strict";

// Map of item prices.
const prices = {
  A: 50,
  B: 30,
  C: 20,
  D: 15,
};

class CheckoutSolution {
  // skus is expected to be a string
  checkout(skus) {
    // Keep a map of quantities of items.
    const quantities = {};

    let total = 0;
    // Iterate over each item in skus list.
    for (const item of skus) {
      // Get price of item.
      const price = prices[item.toUpperCase()];
      if (!price) return -1; // Invalid item in the skus string.

      if (quantities[item.toUpperCase()]) quantities[item.toUpperCase()]++;
      else quantities[item.toUpperCase()] = 1;
    }
    
    // Retrieve discounted total.
    for (const [item, quantity] of Object.entries(quantities)) {
    	
    }

    return total;
  }
}

module.exports = CheckoutSolution;



