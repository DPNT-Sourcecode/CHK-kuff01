"use strict";

// Map of item prices.
const prices = {
  A: 50,
  B: 30,
  C: 20,
  D: 15,
};

// Map of standard discounts.
const discounts = {
  A: [
    // Order from largest to lowest quantity, as this is best for the customer.
    { quantity: 5, price: 200 },
    { quantity: 3, price: 130 },
  ],
  B: {
    quantity: 2,
    price: 45,
  },
};

// 
const freeItemDiscounts = {
  E: {
    quantity: 2,
    freeItem: "B",
    freeQuantity: 1,
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
      const price = prices[item];
      if (!price) return -1; // Invalid item in the skus string.

      quantities[item] = (quantities[item] || 0) + 1;
    }

    // Retrieve discounted total.
    for (const [item, quantity] of Object.entries(quantities)) {
      if (discounts[item]) {
        const discountedQuantityMultiplier = Math.floor(
          quantity / discounts[item].quantity,
        );
        total += discounts[item].price * discountedQuantityMultiplier;
        total +=
          prices[item] *
          (quantity - discountedQuantityMultiplier * discounts[item].quantity);
      } else {
        total += prices[item] * quantity;
      }
    }

    return total;
  }
}

module.exports = CheckoutSolution;

