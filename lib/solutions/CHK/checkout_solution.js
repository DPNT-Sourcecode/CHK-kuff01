"use strict";

// Map of item prices.
const prices = {
  A: 50,
  B: 30,
  C: 20,
  D: 15,
  E: 40,
  F: 10,
  G: 20,
  H: 10,
  I: 35,
  J: 60,
  K: 70,
  L: 90,
  M: 15,
  N: 40,
  O: 10,
  P: 50,
  Q: 30,
  R: 50,
  S: 20,
  T: 20,
  U: 40,
  V: 50,
  W: 20,
  X: 17,
  Y: 20,
  Z: 21,
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
  H: [
    { quantity: 10, price: 80 },
    { quantity: 5, price: 45 },
  ],
  K: {
    quantity: 2,
    price: 120,
  },
  P: {
    quantity: 5,
    price: 200,
  },
  Q: {
    quantity: 3,
    price: 80,
  },
  V: [
    { quantity: 3, price: 130 },
    { quantity: 2, price: 90 },
  ],
};

// Map of discounts that give the customer a free item.
const freeItemDiscounts = {
  E: {
    quantity: 2,
    freeItem: "B",
    freeQuantity: 1,
  },
  F: {
    quantity: 3,
    freeItem: "F",
    freeQuantity: 1,
  },
  N: {
    quantity: 3,
    freeItem: "M",
    freeQuantity: 1,
  },
  R: {
    quantity: 3,
    freeItem: "Q",
    freeQuantity: 1,
  },
  U: {
    quantity: 4,
    freeItem: "U",
    freeQuantity: 1,
  },
};

// Object representing the new group discount offer.
const groupDiscount = {
  items: ["S", "T", "X", "Y", "Z"],
  qantity: 3,
  price: 45,
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

    // Apply group discount offer first.

    // Create reduced view of cart that contains only applicable items from the group discount.
    let applicable = [];
    for (const item of groupDiscount.items) {
      if (quantities[item])
        for (let i = 0; i < quantities[item]; i++)
          applicable.push({ item, price: prices[item] });
    }

    // Since we always want to favour the customer, we should discount the items that add up to the most first.
    // e.g. If our cart is ZTXYZZ, we should discount the ZZZ as Z is the most expensive item in that list.
    applicable.sort((a, b) => b.price - a.price);
    
    

    // Handle free item discounts.
    for (const [item, offer] of Object.entries(freeItemDiscounts)) {
      if (quantities[item]) {
        // Get number of possible applications of the discount.
        const quantityFreeItems =
          Math.floor(quantities[item] / offer.quantity) * offer.freeQuantity;

        // Check if the item that is free is in the checkout cart.
        if (quantities[offer.freeItem]) {
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




