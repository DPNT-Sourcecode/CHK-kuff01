var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("assert");
const CheckoutSolution = require("../../../lib/solutions/CHK/checkout_solution");

describe("CHK challenge: getting total from skus string", function () {
  it("should return 115, when 1 of each item is in the skus string", function () {
    assert.equal(new CheckoutSolution().checkout("ABCD"), 115);
  });

  it("should return -1, when invalid product is in sku", function () {
    assert.equal(new CheckoutSolution().checkout("Z"), -1);
  });

  it("should return 130, when 3 A's", function () {
    assert.equal(new CheckoutSolution().checkout("AAA"), 130);
  });

  it("should return 175, when 3A's and 2B's", function () {
    assert.equal(new CheckoutSolution().checkout("ABAAB"), 175);
  });

  it("should return 300, when 7A's", function () {
    assert.equal(new CheckoutSolution().checkout("AAAAAAA"), 300);
  });

  it("should return 330, when 8A's 1x 5A discount & 1x 3A discount", function () {
    assert.equal(new CheckoutSolution().checkout("AAAAAAAA"), 330);
  });

  it("should return 80, when EEB, freeItemDiscount", function () {
    assert.equal(new CheckoutSolution().checkout("EEB"), 80);
  });
  
  it("should ")
});

