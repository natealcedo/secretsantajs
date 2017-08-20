import { expect } from "chai";
import notFoundResponses from "lib/predefinedResponses/notFoundResponses";
import commandNotFound from "lib/utils/responses/commandNotFound";

/* eslint-disable no-undef, no-alert, no-console */

describe("Not found responses test suite", () => {
  it("The random generated response should be included in the predefined notFoundResponses", () => {
    for (let i = 0; i <= 1000; i += 1) {
      const response = commandNotFound();
      expect(notFoundResponses.includes(response)).to.be.true;
    }
  });
});
