var mocha = require("mocha");
var describe = mocha.describe;
var it = mocha.it;
var assert = require("assert");
const CheckoutSolution = require("../../../lib/solutions/CHK/checkout_solution");

describe("CHK challenge: getting total from skus string", function () {
  it("should return 115, when 1 of each item is in the skus string", function () {
    assert.equal(new CheckoutSolution().checkout("ABCD"), 115);
  });
});
