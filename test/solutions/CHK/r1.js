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

  it("should return 160, when EEBEEB, both Bs should be free", function () {
    assert.equal(new CheckoutSolution().checkout("EEBEEB"), 160);
  });

  it("should return 125, when EEBBB, one B should be free and other 2 discounted", function () {
    assert.equal(new CheckoutSolution().checkout("EEBBB"), 125);
  });

  it("should return 20, when FFF, third F should be free", function () {
    assert.equal(new CheckoutSolution().checkout("FFF"), 20);
  });

  it("should return 20, when FF", function () {
    assert.equal(new CheckoutSolution().checkout("FF"), 20);
  });

  it("should retrun 30, when FFFF", function () {
    assert.equal(new CheckoutSolution().checkout("FFFF"), 30);
  });

  it("should return 40, when FFFFFF", function () {
    assert.equal(new CheckoutSolution().checkout("FFFFFF"), 40);
  });
});



