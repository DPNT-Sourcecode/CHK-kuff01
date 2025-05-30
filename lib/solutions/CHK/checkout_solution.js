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
  quantity: 3,
  price: 45,
};

class CheckoutSolution {
  // Represents the checkout cart. Item -> Quantity mapping.
  cart = {};

  // skus is expected to be a string
  checkout(skus) {
    // Build Item -> Quantity mapping from skus string.
    for (const item of skus) {
      // Get price of item.
      const price = prices[item];
      if (!price) return -1; // Invalid item in the skus string.

      this.cart[item] = (this.cart[item] || 0) + 1;
    }

    return this.total;
  }

  /**
   * Getter for the total of the checkout cart.
   */
  get total() {
    // Discount application order is defined by this array.
    return [
      this.applyGroupDiscount(),
      this.applyFreeItemDiscounts(),
      this.applyStandardDiscounts(),
    ].reduce((acc, val) => acc + val, 0); // Reducer is used to calculate the sum.
  }

  /**
   * Applies the group discount.
   * @returns Sub-total after application of the group discount.
   */
  applyGroupDiscount() {
    let total = 0;
    // Create reduced view of cart that contains only applicable items from the group discount.
    let applicable = [];
    for (const item of groupDiscount.items)
      if (this.cart[item])
        for (let i = 0; i < this.cart[item]; i++)
          applicable.push({ item, price: prices[item] });

    // Since we always want to favour the customer, we should discount the items that add up to the most first.
    // e.g. If our cart is ZTXYZZ, we should discount the ZZZ as Z is the most expensive item in that list.
    applicable.sort((a, b) => b.price - a.price);

    // Get the number of times we can apply the group discount.
    const applications = Math.floor(applicable.length / groupDiscount.quantity);
    // Apply it if we can.
    if (applications > 0) {
      total += applications * groupDiscount.price;

      // Remove the discounted items from the cart.
      for (let i = 0; i < applications * groupDiscount.quantity; i++)
        this.cart[applicable[i].item]--;
    }

    return total;
  }

  /**
   * Applies free item discounts.
   * @returns 0, since free items are just removed from the cart entirely.
   */
  applyFreeItemDiscounts() {
    // Handle free item discounts.
    for (const [item, offer] of Object.entries(freeItemDiscounts)) {
      if (this.cart[item]) {
        // Get number of possible applications of the discount.
        const quantityFreeItems =
          Math.floor(this.cart[item] / offer.quantity) * offer.freeQuantity;

        // Check if the item that is free is in the checkout cart.
        if (this.cart[offer.freeItem]) {
          // Apply the discount by reducing the quantity of the free item. Make sure to not go into negative quantity.
          this.cart[offer.freeItem] = Math.max(
            0,
            this.cart[offer.freeItem] - quantityFreeItems,
          );
        }
      }
    }

    return 0;
  }

  /**
   * Applies standard discounts.
   * @returns Sub-total after standard discounts have been applied.
   */
  applyStandardDiscounts() {
    let total = 0;
    // Apply standard discounts.
    for (const [item, quantity] of Object.entries(this.cart)) {
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






