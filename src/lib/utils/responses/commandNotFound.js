import notFoundResponses from "lib/predefinedResponses/notFoundResponses";
import generateRandomInteger from "lib/utils/generateRandomInteger";

/**
 * commandNotFound
 *
 * @returns {String} Returns a random response from the pool of responses defined in notFoundResponses
 */
export default function commandNotFound() {
  const upperBound = notFoundResponses.length - 1;
  const lowerBound = 0;
  const responseIndex = generateRandomInteger(lowerBound, upperBound);
  return notFoundResponses[responseIndex];
}
