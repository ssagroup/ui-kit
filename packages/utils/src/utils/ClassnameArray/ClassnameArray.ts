/**
 * A `string[]` with chainable helpers for building a class list.
 *
 * ### It mutates, and it is a real Array
 * `toggle` and `clear` change the instance in place and return `this`, so calls
 * chain but the original is modified — do not share one instance across
 * renders. Because it extends `Array`, `join(' ')` produces the final
 * `className`, and every array method still works.
 *
 * Start from `new ClassnameArray()` and toggle onto it, or seed one with
 * `ClassnameArray.from([...])`. Avoid `new ClassnameArray(n)` with a single
 * number — the inherited `Array` constructor reads that as a length, giving you
 * `n` empty slots.
 *
 * @example
 * const classNames = new ClassnameArray();
 * classNames
 *   .toggle('day--selected', isSelected)
 *   .toggle('day--disabled', isDisabled);
 *
 * <td className={classNames.join(' ')} />
 *
 * @example
 * // Seeded with a base class
 * ClassnameArray.from(['button']).toggle('button--active', isActive);
 */
export class ClassnameArray extends Array<string> {
  toggle(className: string, condition: boolean) {
    const index = this.indexOf(className);
    if (condition) {
      if (index === -1) {
        this.push(className);
      }
    } else {
      if (index > -1) {
        this.splice(index, 1);
      }
    }
    return this;
  }

  clear() {
    this.length = 0;
    return this;
  }
}
