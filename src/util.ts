/**
 * Deeply compares two values for equality.
 *
 * This function:
 * - Uses strict equality (`===`) for primitives.
 * - Recursively checks equality for objects and arrays.
 * - Respects custom `equals(other)` methods if present.
 * - Compares arrays element-wise (order-sensitive).
 * - Ensures objects have the same keys and values.
 *
 * @param {any} a - The first value to compare.
 * @param {any} b - The second value to compare.
 * @returns {boolean} `true` if the values are deeply equal, otherwise `false`.
 *
 * @example
 * console.log(equals(42, 42)); // true
 * console.log(equals("hello", "hello")); // true
 * console.log(equals([1, 2, 3], [1, 2, 3])); // true
 * console.log(equals({ a: 1 }, { a: 1 })); // true
 * console.log(equals({ a: 1 }, { a: 2 })); // false
 *
 * @example
 * class CustomObject {
 *   constructor(private value: string) {}
 *   equals(other: any): boolean {
 *     return other instanceof CustomObject && this.value === other.value;
 *   }
 * }
 *
 * const obj1 = new CustomObject("hello");
 * const obj2 = new CustomObject("hello");
 * console.log(equals(obj1, obj2)); // true
 */

export const equals = (a: any, b: any): boolean => {
  if (a === b) return true;

  if (typeof a !== "object" || typeof b !== "object" || a === null || b === null) {
    return false;
  }

  if ("equals" in a && typeof a.equals === "function") {
    return a.equals(b);
  }
  if ("equals" in b && typeof b.equals === "function") {
    return b.equals(a);
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((item, index) => equals(item, b[index]));
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => keysB.includes(key) && equals(a[key], b[key]));
};
