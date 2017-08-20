import { expect } from "chai";
import { generateRandomInteger } from "lib/utils";

/* eslint-disable no-undef, no-alert, no-console */

describe("Generate Random Number Integer", () => {
  it("Mocha plus chai should be working as is", () => {
    const number = 2;
    expect(number).to.equal(2);
  });

  it("generateRandomNumberInteger should NEVER generate a number outside the limits of upper and lower bounds", () => {
    const upper = 100;
    const lower = 0;
    for (let i = 0; i <= 1000; i += 1) {
      const generatedNumber = generateRandomInteger(lower, upper);
      expect(generatedNumber).to.not.be.above(upper);
      expect(generatedNumber).to.not.be.below(lower);
    }
  });
});
