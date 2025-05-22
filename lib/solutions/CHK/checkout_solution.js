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

// Map of discounts that give the customer a free item.
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
    // Running total of items in skus string.
    let total = 0;

    // Iterate over each item in skus list.
    for (const item of skus) {
      // Get price of item.
      const price = prices[item];
      if (!price) return -1; // Invalid item in the skus string.

      quantities[item] = (quantities[item] || 0) + 1;
    }

    // Handle free item discounts first.
    for (const [item, offer] of Object.entries(freeItemDiscounts)) {
      if (quantities[item]) {
        // Get number of possible applications of the discount.
        const quantityFreeItems =
          Math.floor(quantities[item] / offer.quantity) * offer.freeQuantity;

        // Check if the item that is free is in the checkout cart.
        if (quantites[offer.freeItem]) {
          // Apply the discount by reducing the quantity of the free item. Make sure to not go into negative quantity.
          quantities[offer.freeItem] = Math.max(
            0,
            quantities[offer.freeItem] - quantityFreeItems,
          );
        }
      }
    }

    // Apply standard discounts.
    for (const [item, quantity] of Object.entries(quantities)) {
      if (discounts[item]) {
        // Check if there are several discounts available.
        if (Array.isArray(discounts[item])) {
          // Apply all possible discounts in order from largest quantity to lowest.
          let remaining = quantity;
          for (const discount of discounts[item]) {
            const discountedQuantityMultiplier = Math.floor(
              remaining / discount.quantity,
            );
            total += discount.price * discountedQuantityMultiplier;
            remaining -= discountedQuantityMultiplier * discount.quantity;
          }
          
          // Add leftovers at full price.
			if (remaining > 0) total += prices[item] * remaining;
        } else {
          const discountedQuantityMultiplier = Math.floor(
            quantity / discounts[item].quantity,
          );
          total += discounts[item].price * discountedQuantityMultiplier;
          total +=
            prices[item] *
            (quantity -
              discountedQuantityMultiplier * discounts[item].quantity);
        }
      } else {
        total += prices[item] * quantity;
      }
    }

    return total;
  }
}

module.exports = CheckoutSolution;




