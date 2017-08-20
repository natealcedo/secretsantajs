/**
 * @author Nathaniel D Alcedo Jr <nathaniel.alcedo@oromico.com>
 */

/**
 * generateRandomFunction
 *
 * @private
 * @param {Number} lowerBound Lower bound of random number generator.
 * @param {Number} upperBound Upper bound of number generator.
 * @returns {Number} Random integer number inclusive between lowerBound and upperBound.
 */
export default function generateRandomFunction(lowerBound, upperBound) {
  const min = Math.ceil(lowerBound);
  const max = Math.floor(upperBound);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
