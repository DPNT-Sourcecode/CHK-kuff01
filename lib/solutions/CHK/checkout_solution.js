"use strict";

// Map of item prices.
const prices = {
  A: 50,
  B: 30,
  C: 20,
  D: 15,
};

// Map of discounts.
const discounts = {
  A: {
    quantity: 3,
    price: 130,
  },
  B: {
    quantity: 2,
    price: 45,
  },
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
      if (discounts[item]) {
        const discountedQuantity = Math.floor(
          quantity / discounts[item].quantity,
        );
        total += discounts[item].price * discountedQuantity;
        total +=
          prices[item] *
          (quantity - discountedQuantity * discounts[item].quantity);
      } else {
        total += prices[item] * quantity;
      }
    }

    return total;
  }
}

module.exports = CheckoutSolution;







